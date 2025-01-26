Healthcare Management API

Overview

This is a comprehensive backend API designed for managing healthcare systems. It provides robust role-based authentication, appointment scheduling, email notifications, PDF generation for prescriptions, and other essential features required for a modern healthcare platform.

Features

Role-Based Authentication:

Admin: Full access to manage all resources.

Doctor: Manage assigned patients, view schedules, and create prescriptions.

Patient: Book appointments, view prescriptions, and medical history.

Email Integration:

Email verification during user registration.

Sending email templates for appointment confirmations and updates.

PDF Generation:

Generate and download prescriptions in PDF format.

Appointment Management:

Create, update, and delete appointments.

Real-time updates via WebSocket (using Socket.IO).

Public Resource Management:

Static resources served through /public.

Prerequisites

Ensure the following are installed on your system:

Node.js (v16 or higher)

npm or yarn

MongoDB

Installation

Clone the repository:

git clone <repository-url>

Navigate to the project directory:

cd healthcare-management-api

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory and provide the following variables:

PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
COOKIE_SECRET=<your-cookie-secret>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>

Start the development server:

npm run dev

API Endpoints

Authentication

POST /api/v1/auth/register - Register a new user.

POST /api/v1/auth/login - User login.

POST /api/v1/auth/verify-email - Verify email during registration.

Doctors

POST /api/v1/doctors - Create a new doctor (Admin only).

GET /api/v1/doctors - List all doctors.

GET /api/v1/doctors/:id - Get doctor details.

PUT /api/v1/doctors/:id - Update doctor information.

DELETE /api/v1/doctors/:id - Delete a doctor (Admin only).

Patients

POST /api/v1/patients - Create a new patient.

GET /api/v1/patients - List all patients.

GET /api/v1/patients/:id - Get patient details.

PUT /api/v1/patients/:id - Update patient information.

DELETE /api/v1/patients/:id - Delete a patient (Admin only).

Appointments

POST /api/v1/appointments - Book a new appointment.

GET /api/v1/appointments - List all appointments.

GET /api/v1/appointments/:id - Get appointment details.

PUT /api/v1/appointments/:id - Update appointment details.

DELETE /api/v1/appointments/:id - Cancel an appointment.

Prescriptions

POST /api/v1/prescriptions - Create a new prescription.

GET /api/v1/prescriptions/:id - Download prescription as PDF.


Client Events

appointment-update: Triggered when an appointment is updated.

Server Events

appointment-updated: Broadcasted to all connected clients when an appointment is updated.

Folder Structure

healthcare-management-api
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   └── app.ts
├── public
├── .env
├── package.json
└── README.md



License

This project is licensed under the MIT License.
