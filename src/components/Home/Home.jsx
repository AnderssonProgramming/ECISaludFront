import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSpecialties } from '../../services/api';
import './Home.css';

const Home = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties();
        setSpecialties(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las especialidades');
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando especialidades...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container className="home-container mt-5">
      <h1 className="text-center mb-5">ECI Salud Vital - Especialidades</h1>
      
      <Row xs={1} md={2} className="g-4">
        {specialties.map((specialty) => (
          <Col key={specialty.id}>
            <Card className="specialty-card h-100">
              <Card.Img 
                variant="top" 
                src={specialty.imageUrl || `/images/${specialty.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                alt={specialty.name}
                className="specialty-image"
              />
              <Card.Body>
                <Card.Title>{specialty.name}</Card.Title>
                <Link to={`/specialty/${specialty.id}`} className="btn btn-primary mt-2">
                  Ver detalles
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
