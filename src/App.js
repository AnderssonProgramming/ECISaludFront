import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home.jsx';
import SpecialtyDetail from './components/SpecialtyDetail/SpecialtyDetail';
import Appointment from './components/Appointment/Appointment';
import AppointmentHistory from './components/AppointmentHistory/AppointmentHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Container className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/specialty/:id" element={<SpecialtyDetail />} />
            <Route path="/schedule-appointment/:id" element={<Appointment />} />
            <Route path="/appointment-history" element={<AppointmentHistory />} />
          </Routes>
        </Container>
        <footer className="footer mt-auto py-3 bg-light">
          <Container className="text-center">
            <span className="text-muted">© 2025 ECI Salud Vital - Todos los derechos reservados</span>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
