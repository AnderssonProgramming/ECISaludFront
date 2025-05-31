# 🏥 ECISalud Frontend - Medical Appointments Management System

<div align="center">
  
  ![ECISalud Logo](src/assets/images/logo.svg)
  
  _Author: **Andersson David Sánchez Méndez** - Group 3_
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![React Bootstrap](https://img.shields.io/badge/React%20Bootstrap-2.7.4-purple.svg)](https://react-bootstrap.github.io/)
  [![React Router](https://img.shields.io/badge/React%20Router-6.11.2-red.svg)](https://reactrouter.com/)
  [![Axios](https://img.shields.io/badge/Axios-1.4.0-green.svg)](https://axios-http.com/)
  [![Azure](https://img.shields.io/badge/Azure-Deployed-blue.svg)](https://azure.microsoft.com/)
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  [![ESLint](https://img.shields.io/badge/ESLint-8.44.0-4B32C3?logo=eslint)](https://eslint.org/)
  
</div>

## 📋 Description

ECISalud Frontend is a modern React application providing a user-friendly interface for the ECISalud medical appointment management system. This application allows patients to explore available medical specialties, schedule appointments, and manage their appointment history. The frontend connects to a Spring Boot backend API deployed on Azure, with enhanced features for a seamless user experience.

## 🔧 Technologies Used

- **React 18**: JavaScript library for building user interfaces
- **React Router DOM 6**: For client-side routing and navigation
- **React Bootstrap**: UI component library for responsive design
- **Axios**: HTTP client for API requests
- **React Hooks**: For state management and side effects
- **CSS Modules**: For component-scoped styling
- **Azure Static Web Apps**: For hosting and deployment

## ✨ Features

### 1. **Home Page** 
- Displays 4 medical specialties in a 2x2 grid layout
- Each specialty card includes an image and name
- Responsive design for all device sizes

### 2. **Specialty Details**
- Expanded view of the selected specialty
- Detailed information including:
  - Specialty description
  - Doctor name and credentials
  - Clinic location
  - Large specialty image
- "Schedule Appointment" button

### 3. **Appointment Scheduling**
- User-friendly form with real-time validation
- Required fields: full name, ID number, email
- Date selection with calendar picker
- Prevents selection of past dates
- Appointment summary display
- Success confirmation after submission

### 4. **Appointment History**
- Lists all appointments for a user (by email)
- Displays appointment details:
  - Appointment ID
  - Specialty name
  - Scheduled date
  - Current status
- Status filtering (Confirmed/Cancelled)
- Ability to cancel active appointments
- Color-coded status indicators (green for confirmed, red for cancelled)

### 5. **Navigation**
- Responsive navigation bar
- Easy access to home and appointment history
- Clinic logo and branding

## 🚀 Setup and Running Instructions

### Prerequisites
- Node.js 14.x or higher
- npm 6.x or higher
- Connection to ECISalud backend API

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ECISaludFront.git
   ```

2. Navigate to the project directory
   ```bash
   cd ECISaludFront
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🌐 API Integration

The frontend connects to the ECISalud backend API deployed on Azure:
```
https://god-fwcafqgvhvbdfthh.canadacentral-01.azurewebsites.net/
```

API endpoints used:
- `GET /api/specialties`: Retrieve all medical specialties
- `GET /api/specialties/{id}`: Get specialty details by ID
- `POST /api/appointments`: Create a new appointment
- `GET /api/appointments/email/{email}`: Get appointments by user email
- `GET /api/appointments/filter?email={email}&status={status}`: Filter appointments
- `PUT /api/appointments/{id}/cancel`: Cancel an appointment

## 📸 Screenshots

### Home Page
![Home Page](placeholder-for-home-screenshot.png)
*Grid display of available medical specialties*

### Specialty Details
![Specialty Details](placeholder-for-specialty-details-screenshot.png)
*Detailed view of a medical specialty with booking option*

### Appointment Form
![Appointment Form](placeholder-for-appointment-form-screenshot.png)
*Form for scheduling a new medical appointment*

### Appointment History
![Appointment History](placeholder-for-appointment-history-screenshot.png)
*List of user appointments with filtering options*

## 📂 Project Structure

```
ECISaludFront/
├── public/
│   ├── index.html
│   ├── logo192.png
│   └── logo512.png
├── src/
│   ├── components/
│   │   ├── AppointmentForm/
│   │   │   └── AppointmentForm.jsx
│   │   ├── AppointmentHistory/
│   │   │   └── AppointmentHistory.jsx
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Navigation/
│   │   │   └── Navigation.jsx
│   │   └── SpecialtyDetail/
│   │       └── SpecialtyDetail.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── logo.svg
└── package.json
```

## 👨‍💻 Development Guidelines

- Follow React best practices
- Use functional components and hooks
- Keep components small and focused
- Validate all user inputs
- Handle API errors gracefully
- Maintain responsive design
- Use semantic HTML elements

## 📈 Future Enhancements

- User authentication and profiles
- Doctor availability calendar
- Push notifications for appointment reminders
- Online payment integration
- Telehealth video consultations
- Multi-language support
