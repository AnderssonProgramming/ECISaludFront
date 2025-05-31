/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Form, Badge, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getAppointmentsByEmail, getAppointmentsByEmailAndStatus, cancelAppointment } from '../../services/api';
import './AppointmentHistory.css';

const AppointmentHistory = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(location.state?.message || null);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchAppointments = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      let data;
      if (statusFilter) {
        data = await getAppointmentsByEmailAndStatus(email, statusFilter);
      } else {
        data = await getAppointmentsByEmail(email);
      }
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las citas');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchAppointments();
    }
  }, [email, statusFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAppointments();
  };

  const handleCancelAppointment = async (id) => {
    try {
      await cancelAppointment(id);
      setSuccess('Cita cancelada exitosamente');
      // Update the appointments list
      fetchAppointments();
    } catch (err) {
      setError('Error al cancelar la cita');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge bg="success">Confirmada</Badge>;
      case 'CANCELLED':
        return <Badge bg="danger">Cancelada</Badge>;
      case 'REJECTED':
        return <Badge bg="warning">Rechazada</Badge>;
      default:
        return <Badge bg="secondary">Pendiente</Badge>;
    }
  };

  return (
    <Container className="appointment-history-container mt-5">
      <h2 className="text-center mb-4">Historial de Citas</h2>
      
      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-end">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese su correo para ver sus citas"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filtrar por Estado</Form.Label>
                  <Form.Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="CONFIRMED">Confirmadas</option>
                    <option value="CANCELLED">Canceladas</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button variant="primary" type="submit" className="w-100">
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      
      {loading ? (
        <div className="text-center mt-5">Cargando citas...</div>
      ) : appointments.length > 0 ? (
        <Row xs={1} md={2} className="g-4">
          {appointments.map((appointment) => (
            <Col key={appointment.id}>
              <Card className="appointment-card">
                <Card.Body>
                  <Card.Title>Cita #{appointment.id.substring(0, 8)}</Card.Title>
                  <Card.Text>
                    <strong>Especialidad:</strong> {appointment.specialty}
                  </Card.Text>
                  <Card.Text>
                    <strong>Paciente:</strong> {appointment.patientName}
                  </Card.Text>
                  <Card.Text>
                    <strong>Fecha:</strong> {new Date(appointment.date).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Estado:</strong> {getStatusBadge(appointment.status)}
                  </Card.Text>
                  
                  {appointment.status === 'CONFIRMED' && (
                    <Button 
                      variant="outline-danger" 
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="w-100"
                    >
                      Cancelar Cita
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : email ? (
        <Alert variant="info">No se encontraron citas para este correo electrónico.</Alert>
      ) : (
        <Alert variant="info">Ingrese su correo electrónico para ver su historial de citas.</Alert>
      )}
    </Container>
  );
};

export default AppointmentHistory;
