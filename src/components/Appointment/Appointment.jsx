import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { getSpecialtyById, createAppointment } from '../../services/api';
import './Appointment.css';

const Appointment = () => {
  const { id: specialtyId } = useParams();
  const navigate = useNavigate();
  
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    email: '',
    date: '',
    specialtyId: specialtyId
  });

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        const data = await getSpecialtyById(specialtyId);
        setSpecialty(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching specialty details:', err);
        setError('No se pudo cargar la información de la especialidad');
        setLoading(false);
      }
    };

    fetchSpecialty();
  }, [specialtyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.patientName.trim()) {
      setFormError('El nombre del paciente es requerido');
      return false;
    }
    
    if (!formData.patientId.trim()) {
      setFormError('La cédula del paciente es requerida');
      return false;
    }
    
    if (!formData.email.trim()) {
      setFormError('El correo electrónico es requerido');
      return false;
    }
    
    if (!formData.date) {
      setFormError('La fecha de la cita es requerida');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Por favor, ingrese un correo electrónico válido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Convert date string to LocalDate format (YYYY-MM-DD)
      const appointment = {
        ...formData,
        specialtyId
      };
      
      const response = await createAppointment(appointment);
      
      // Navigate to appointment history with success message
      navigate('/appointment-history', { 
        state: { 
          message: 'Cita programada con éxito',
          email: formData.email
        } 
      });
    } catch (err) {
      console.error('Error creating appointment:', err);
      setFormError('Error al programar la cita. Por favor, inténtelo de nuevo.');
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando información...</div>;

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-3">
          <Button variant="primary" onClick={() => navigate('/')}>
            Volver a Inicio
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="appointment-container mt-5">
      <h2 className="text-center mb-4">Programar Cita Médica</h2>
      
      {formError && (
        <Alert variant="danger" onClose={() => setFormError(null)} dismissible>
          {formError}
        </Alert>
      )}
      
      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Información del Paciente</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Cédula</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de la Cita</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                    required
                  />
                </Form.Group>
                
                <div className="d-grid gap-2 mt-4">
                  <Button variant="primary" type="submit">
                    Confirmar Cita
                  </Button>
                  <Button variant="secondary" onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          {specialty && (
            <Card>
              <Card.Body>
                <Card.Title>Resumen de la Cita</Card.Title>
                <Card.Text>
                  <strong>Especialidad:</strong> {specialty.name}
                </Card.Text>
                <Card.Text>
                  <strong>Doctor:</strong> {specialty.doctor}
                </Card.Text>
                <Card.Text>
                  <strong>Ubicación:</strong> {specialty.location}
                </Card.Text>
                <Card.Text>
                  <strong>Fecha:</strong> {formData.date ? new Date(formData.date).toLocaleDateString() : 'No seleccionada'}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Appointment;