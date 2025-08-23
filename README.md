# 🏥 Patient Record Management System (PRMS) - Frontend

<div align="center">

**A modern, secure, and comprehensive React-based healthcare management interface for dental clinics**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<!-- Add screenshot here: Main dashboard showing role-based navigation and key metrics -->

[🚀 Live Demo](https://prms-frontend.netlify.app) • [📖 Documentation](https://github.com/your-org/patient-record-management-system-ui/wiki) • [🐛 Report Bug](https://github.com/your-org/patient-record-management-system-ui/issues) • [✨ Request Feature](https://github.com/your-org/patient-record-management-system-ui/issues)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔐 Role-Based Access Control](#-role-based-access-control)
- [🔌 API Integration](#-api-integration)
- [🏗️ Development](#️-development)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [❓ FAQ](#-faq)
- [📄 License](#-license)

---

## 🌟 Overview

The Patient Record Management System (PRMS) Frontend is a comprehensive React-based healthcare management interface designed specifically for dental clinics. It provides secure, role-based access to patient records, appointment scheduling, user management, and analytics through an intuitive, responsive web interface.

<!-- Add screenshot here: Login page showing clean, professional healthcare UI design -->

### 🎯 Key Objectives

- **Security First**: HIPAA-compliant design patterns with robust authentication
- **Role-Based Access**: Tailored interfaces for Admins, Staff, Doctors, and Patients
- **Modern Architecture**: Built with React 19, Redux Toolkit, and Vite
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Scalable Structure**: Feature-based architecture for easy maintenance and expansion

---

## ✨ Key Features

### 🔐 Authentication & Security
- **JWT-based Authentication**: Secure token-based session management [2](#2-1) 
- **Role-Based Routing**: Automatic redirection based on user roles [3](#2-2) 
- **Form Validation**: Client-side validation with comprehensive error handling [4](#2-3) 
- **Persistent Sessions**: localStorage integration for seamless user experience

<!-- Add screenshot here: Role-based dashboard showing different interfaces for different user types -->

### 👥 User Management
- **Multi-Role Support**: Admin, Staff, Doctor, and Patient interfaces
- **User CRUD Operations**: Complete user lifecycle management
- **Profile Management**: Individual and administrative profile updates
- **Access Control**: Granular permissions based on user roles

### 🏥 Patient Management
- **Comprehensive Records**: Complete patient information management [5](#2-4) 
- **Search & Filter**: Advanced patient search capabilities [6](#2-5) 
- **Medical History**: Detailed medical history tracking
- **Export Functionality**: Excel export for patient data [7](#2-6) 

<!-- Add screenshot here: Patient management interface showing search, filters, and data table -->

### 📅 Appointment Management
- **Scheduling System**: Comprehensive appointment booking and management
- **Status Tracking**: Real-time appointment status updates
- **Calendar Integration**: Visual calendar interface for scheduling
- **Conflict Resolution**: Automatic scheduling conflict detection

### 📊 Analytics & Reporting
- **Real-time Dashboards**: Live operational metrics and KPIs
- **Custom Reports**: Tailored reporting for different user roles
- **Data Visualization**: Interactive charts and graphs using Chart.js
- **Export Options**: Multiple export formats for reports

### 🔍 Audit & Compliance
- **Activity Logging**: Comprehensive audit trail for all system actions [8](#2-7) 
- **HIPAA Compliance**: Security patterns aligned with healthcare regulations
- **Access Monitoring**: Real-time monitoring of user access and activities

<!-- Add screenshot here: Audit logs interface showing system activity tracking -->

---

## 🛠️ Technology Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.1.0 | Frontend framework with latest features |
| **Redux Toolkit** | ^2.8.2 | Predictable state management |
| **React Router** | ^7.6.0 | Client-side routing and navigation |
| **Vite** | ^6.3.5 | Fast build tool and development server |
| **Tailwind CSS** | ^4.1.7 | Utility-first CSS framework |

### Supporting Libraries
| Library | Version | Purpose |
|---------|---------|---------|
| **Axios** | ^1.9.0 | HTTP client for API communication |
| **Chart.js** | ^4.5.0 | Data visualization and charts |
| **React Hook Form** | ^7.60.0 | Performant form management |
| **React Hot Toast** | ^2.5.2 | Toast notifications |
| **React Icons** | ^5.5.0 | Icon library |
| **XLSX** | ^0.18.5 | Excel file operations | [9](#2-8) 

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/patient-record-management-system-ui.git
   cd patient-record-management-system-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_API_BASE_URL=https://prms-backend-rrdo.onrender.com
   VITE_API_TIMEOUT=10000
   
   # Application Configuration
   VITE_APP_NAME=PRMS Frontend
   VITE_APP_VERSION=1.0.0
   
   # Development Configuration
   VITE_DEV_MODE=true
   VITE_LOG_LEVEL=debug
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:5173`

<!-- Add screenshot here: Development server running with hot reload demonstration -->

### Quick Start Guide

1. **Access the Application**: Navigate to `http://localhost:5173`
2. **Login**: Use the provided demo credentials or create a new account
3. **Explore Roles**: Test different user roles to see role-based interfaces
4. **API Connection**: Ensure the backend API is running and accessible

---

## 📁 Project Structure

```
src/
├── 🔐 features/              # Feature-based modules
│   ├── 👑 admin/            # Administrator features
│   │   ├── dashboard/       # Admin dashboard components
│   │   ├── patients/        # Patient management
│   │   ├── users/          # User management
│   │   └── logs/           # Audit logs
│   ├── 👥 staff/            # Staff member features
│   ├── 👨‍⚕️ doctor/           # Doctor-specific features
│   ├── 🏥 patient/          # Patient portal features
│   └── 🔐 auth/             # Authentication components
├── 🛣️ routes/               # Routing configuration
├── 📄 pages/                # Layout components
├── 🧩 components/           # Shared/reusable components
│   ├── common/             # Common UI components
│   ├── forms/              # Form components
│   └── charts/             # Chart components
├── 🔌 API/                  # API client modules
├── 🏪 Store.jsx             # Redux store configuration
├── 🎨 index.css             # Global styles
└── 📱 main.jsx              # Application entry point
```

### Architecture Principles

- **Feature-Based Organization**: Related components grouped by business feature
- **Separation of Concerns**: Clear separation between UI, state, and API logic
- **Reusable Components**: Shared components for consistent UI patterns
- **Type Safety**: Comprehensive prop validation and error boundaries

---

## 🔐 Role-Based Access Control

The application implements a comprehensive role-based access control system with four distinct user types:

### 👑 Administrator (`/admin`)
**Full System Access**
- 📊 **Dashboard**: Complete analytics and system overview
- 🏥 **Patient Management**: Full CRUD operations on patient records
- 📅 **Appointment Scheduling**: System-wide appointment management
- 👥 **User Management**: Create, update, and manage all user accounts
- 📈 **Reports & Analytics**: Access to all system reports and metrics
- ⚙️ **System Settings**: Configuration and system administration
- 📋 **Audit Logs**: Complete access to system activity logs

<!-- Add screenshot here: Admin dashboard showing comprehensive system overview -->

### 👥 Staff (`/staff`)
**Operational Access**
- 📊 **Limited Dashboard**: Operational metrics relevant to daily tasks
- 🏥 **Patient Management**: Patient record management and updates
- 📅 **Appointment Handling**: Schedule and manage appointments
- 💰 **Invoice Management**: Handle billing and payment processing
- 📊 **Basic Reporting**: Access to operational reports

### 👨‍⚕️ Doctor (`/doctor`)
**Clinical Focus**
- 🩺 **Clinical Dashboard**: Patient-focused metrics and schedules
- 📋 **Patient Records**: Access to patient medical information
- 📅 **Appointment Management**: View and manage patient appointments
- 📄 **Medical Reports**: Generate and access medical reports

### 🏥 Patient (`/patient`)
**Personal Access**
- 🏠 **Personal Dashboard**: Individual health summary and appointments
- 📅 **Appointment Booking**: Schedule appointments with available doctors
- ⚙️ **Profile Settings**: Manage personal information and preferences [3](#2-2) 

---

## 🔌 API Integration

### Backend Connection

The frontend connects to the PRMS backend API hosted at `https://prms-backend-rrdo.onrender.com/`. [10](#2-9) 

### Development Proxy

During development, API requests are proxied through Vite's development server:

```javascript
// vite.config.js
server: {
  proxy: {
    "/api": "https://prms-backend-rrdo.onrender.com/",
    // "/api": "http://localhost:5000", // Local development option
  },
}
```

### API Client Architecture

- **Axios Configuration**: Centralized HTTP client with interceptors
- **Error Handling**: Comprehensive error handling and user feedback
- **Request/Response Transformation**: Consistent data formatting
- **Authentication Headers**: Automatic JWT token inclusion

### Available Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | User authentication |
| `/api/auth/signup` | POST | User registration |
| `/api/patients` | GET/POST/PUT/DELETE | Patient management |
| `/api/appointments` | GET/POST/PUT/DELETE | Appointment management |
| `/api/users` | GET/POST/PUT/DELETE | User management |
| `/api/logs` | GET | Audit logs |

---

## 🏗️ Development

### Available Scripts [11](#2-10) 

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start development server with HMR |
| `build` | `vite build` | Build production bundle |
| `lint` | `eslint .` | Run code linting |
| `preview` | `vite preview` | Preview production build |

### Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Code Quality**
   ```bash
   npm run lint
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

### State Management

The application uses Redux Toolkit for predictable state management:

- **Authentication State**: User session and role management
- **Patient Management**: Patient data and operations
- **Appointment Scheduling**: Appointment state and calendar data
- **User Administration**: User management and permissions
- **UI State**: Loading states, modals, and notifications

### Code Style Guidelines

- **ESLint Configuration**: Enforced code quality standards

Wiki pages you might want to explore:
- [Authentication System (teston-25/patient-recored-managment-system-Ui)](/wiki/teston-25/patient-recored-managment-system-Ui#5)
- [Development Setup and Configuration (teston-25/patient-recored-managment-system-Ui)](/wiki/teston-25/patient-recored-managment-system-Ui#7)
