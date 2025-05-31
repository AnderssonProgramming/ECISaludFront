import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navigation.css';
// Import the logo directly from the source
import logo from '../../logo.svg';

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">          
          <img 
            src={logo} 
            width="30" 
            height="30" 
            className="d-inline-block align-top me-2" 
            alt="ECI Salud Logo"
          />
          ECI Salud Vital
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/appointment-history">Historial de Citas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
