/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { getSpecialtyById } from '../../services/api';
import './SpecialtyDetail.css';

const SpecialtyDetail = () => {
  const { id } = useParams();
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        const data = await getSpecialtyById(id);
        setSpecialty(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching specialty details:', err);
        setError('No se pudo cargar la información de la especialidad');
        setLoading(false);
      }
    };

    fetchSpecialty();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Cargando información de la especialidad...</div>;

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-primary">Volver a Inicio</Link>
        </div>
      </Container>
    );
  }

  if (!specialty) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Especialidad no encontrada</Alert>
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-primary">Volver a Inicio</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="specialty-detail-container mt-5">
      <Row>
        <Col md={6}>
          <img 
            src={specialty.imageUrl || `/images/${specialty.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
            alt={specialty.name} 
            className="specialty-detail-image img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <Card className="specialty-detail-card">
            <Card.Body>
              <Card.Title className="mb-4">
                <h2>{specialty.name}</h2>
              </Card.Title>
              
              <Card.Text>
                <strong>Descripción:</strong>
                <p className="mt-2">{specialty.description}</p>
              </Card.Text>
              
              <Card.Text>
                <strong>Doctor:</strong>
                <p className="mt-2">{specialty.doctor}</p>
              </Card.Text>
              
              <Card.Text>
                <strong>Ubicación:</strong>
                <p className="mt-2">{specialty.location}</p>
              </Card.Text>
              
              <div className="d-grid gap-2 mt-4">
                <Link 
                  to={`/schedule-appointment/${specialty.id}`} 
                  className="btn btn-primary btn-lg"
                >
                  Programar Cita
                </Link>
                <Link to="/" className="btn btn-outline-secondary">
                  Volver a Inicio
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SpecialtyDetail;