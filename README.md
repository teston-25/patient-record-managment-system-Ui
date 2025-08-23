🏥 Patient Record Management System (PRMS) - Frontend
https://img.shields.io/badge/React-19.1.0-61DAFB.svg
https://img.shields.io/badge/Redux-2.8.2-764ABC.svg
https://img.shields.io/badge/Vite-6.3.5-646CFF.svg
https://img.shields.io/badge/Tailwind-4.1.7-06B6D4.svg
https://img.shields.io/badge/License-ISC-yellow.svg

A comprehensive React-based healthcare management interface providing role-based access to patient records, appointment scheduling, user management, and reporting capabilities for dental clinics.

🌟 Overview
The PRMS frontend serves four distinct user roles with tailored interfaces: administrators, staff members, doctors, and patients. Built with modern React architecture using Redux for state management and React Router for navigation.

🛠️ Technology Stack
Technology	Version	Purpose
React	^19.1.0	Core frontend framework
Redux Toolkit	^2.8.2	Centralized state management
React Router	^7.6.0	Client-side routing
Tailwind CSS	^4.1.7	Utility-first styling
Vite	^6.3.5	Build tool and dev server
Axios	^1.9.0	HTTP client for API communication
Chart.js	^4.5.0	Data visualization
React Hook Form	^7.60.0	Form management
✨ Features
Core Healthcare Management
Patient Management - Complete CRUD operations with demographic tracking

Appointment Scheduling - Status-based appointment workflow management

Medical History - Comprehensive diagnosis and treatment record keeping

User Authentication - JWT-based authentication with role-based access

Security & Compliance
Role-Based Access Control - Four-tier permission system (admin, staff, doctor, patient)

Data Validation - Comprehensive form validation with error handling

Responsive Design - Mobile-optimized interface for all devices

Developer Experience
Modern Tooling - Vite for fast development and builds

State Management - Redux Toolkit for predictable state management

Component Library - Reusable UI components with Tailwind CSS

🚀 Quick Start
Prerequisites
Node.js 18+

npm or yarn package manager

Access to PRMS backend API

Installation
Clone the repository

bash
git clone https://github.com/your-username/patient-record-management-system-ui.git
cd patient-record-management-system-ui
Install dependencies

bash
npm install
Environment Configuration
The application is configured to connect to the backend at:

text
https://prms-backend-rrdo.onrender.com/
Start development server

bash
npm run dev
The application will start on http://localhost:5173 with hot reload enabled.

📜 Available Scripts
Script	Command	Purpose
dev	vite	Start development server with HMR
build	vite build	Build production bundle
lint	eslint .	Run code linting
preview	vite preview	Preview production build
📁 Project Structure
text
src/  
├── 📂 features/           # Feature-based modules  
│   ├── 👑 admin/         # Administrator features  
│   ├── 👥 staff/         # Staff member features    
│   ├── 👨‍⚕️ doctor/        # Doctor-specific features  
│   ├── 🏥 patient/       # Patient portal features  
│   └── 🔐 auth/          # Authentication components  
├── 🛣️ routes/            # Routing configuration  
├── 📄 pages/             # Layout components  
├── 🧩 components/        # Shared components  
├── 🔌 API/              # API client modules  
└── 🏪 Store.jsx         # Redux store configuration  
🔐 Role-Based Access Control
The application implements comprehensive role-based routing:

👑 Admin Routes (/admin)
📊 Dashboard with analytics

🏥 Patient management

📅 Appointment scheduling

👥 User management

📈 Reports and analytics

⚙️ System settings

📋 Access logs

👥 Staff Routes (/staff)
📊 Limited dashboard access

🏥 Patient management

📅 Appointment handling

💰 Invoice management

📊 Basic reporting

👨‍⚕️ Doctor Routes (/doctor)
🩺 Clinical dashboard

📋 Patient records access

📅 Appointment management

📄 Medical reports

🏥 Patient Routes (/patient)
🏠 Personal dashboard

📅 Appointment booking

⚙️ Profile settings

🏗️ Architecture
Technology Stack
Framework: React with modern hooks

State Management: Redux Toolkit with feature slices

Styling: Tailwind CSS with responsive design

Routing: React Router with protected routes

Build Tool: Vite for fast development

State Management
Redux Toolkit with feature-specific slices:

🔐 Authentication state

🏥 Patient management

📅 Appointment scheduling

👥 User administration

📈 Reports and analytics

API Integration
The frontend communicates with the PRMS backend through Axios HTTP client with interceptors for authentication and error handling.

📊 Role-Based Access Matrix
Role	Patient Mgmt	Appointments	Medical History	User Mgmt	Reports
Admin	✅ Full	✅ Full	✅ Full	✅ Full	✅ Full
Staff	✅ Full	✅ Full	✅ CRUD	✅ Limited	✅ View
Doctor	✅ View	✅ Assigned	✅ CRUD	❌ None	✅ View
Patient	✅ Own Profile	✅ Own Only	❌ None	❌ None	❌ None
🧪 Development
Available Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
Development Features
Hot Module Replacement for fast development

ESLint configuration for code quality

Tailwind CSS JIT compiler for optimized styling

Proxy configuration for API development

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow the established feature-based architecture

Use Redux Toolkit for state management

Implement responsive design with Tailwind CSS

Maintain role-based access control patterns

Run linting before commits: npm run lint

🚀 Production Deployment
Build the application:

bash
npm run build
Deploy the dist folder to your hosting service

Ensure backend API endpoints are accessible

Configure environment variables as needed

📝 Notes
Security First: This healthcare management system prioritizes security through role-based access control and maintains HIPAA compliance considerations in its design patterns.

Maintainable Architecture: The modular architecture ensures maintainable code while Redux-based state management provides reliable data flow throughout the application.

<div align="center">
Made with ❤️ for Healthcare Management

Healthcare • Management • System

</div>
