import axios from 'axios';

// Base URL for locally deployed backend
//const API_BASE_URL = 'http://localhost:8081/api';
// Base URL for deployed backend (uncomment if needed)
const API_BASE_URL = 'https://god-fwcafqgvhvbdfthh.canadacentral-01.azurewebsites.net/api';

// API instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Specialties API
export const getSpecialties = async () => {
  try {
    const response = await api.get('/specialties');
    return response.data;
  } catch (error) {
    console.error('Error fetching specialties:', error);
    throw error;
  }
};

export const getSpecialtyById = async (id) => {
  try {
    const response = await api.get(`/specialties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching specialty with id ${id}:`, error);
    throw error;
  }
};

// Appointments API
export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getAppointmentsByEmail = async (email) => {
  try {
    const response = await api.get(`/appointments/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointments for email ${email}:`, error);
    throw error;
  }
};

export const getAppointmentsByEmailAndStatus = async (email, status) => {
  try {
    const response = await api.get(`/appointments/filter?email=${email}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointments for email ${email} with status ${status}:`, error);
    throw error;
  }
};

export const cancelAppointment = async (id) => {
  try {
    const response = await api.put(`/appointments/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling appointment with id ${id}:`, error);
    throw error;
  }
};

export default api;
