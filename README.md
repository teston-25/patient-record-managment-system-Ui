Patient Record Management System (PRMS) - Frontend
A comprehensive React-based healthcare management interface providing role-based access to patient records, appointment scheduling, user management, and reporting capabilities for dental clinics. 

Overview
The PRMS frontend serves four distinct user roles with tailored interfaces: administrators, staff members, doctors, and patients. Built with modern React architecture using Redux for state management and React Router for navigation. 

Technology Stack
Technology  Version  Purpose
React  ^19.1.0  Core frontend framework
Redux Toolkit  ^2.8.2  Centralized state management
React Router  ^7.6.0  Client-side routing
Tailwind CSS  ^4.1.7  Utility-first styling
Vite  ^6.3.5  Build tool and dev server
Axios  ^1.9.0  HTTP client for API communication
Chart.js  ^4.5.0  Data visualization
React Hook Form  ^7.60.0  Form management
Prerequisites
Node.js (latest LTS version recommended)
npm or yarn package manager
Access to PRMS backend API
Installation & Setup
Clone the repository

git clone <repository-url>  
cd patient-recored-managment-system-Ui
Install dependencies

npm install
Configure backend connection
The application is configured to connect to the backend at https://prms-backend-rrdo.onrender.com/ 

Start development server

npm run dev
Available Scripts
Script  Command  Purpose
dev  vite  Start development server with HMR
build  vite build  Build production bundle
lint  eslint .  Run code linting
preview  vite preview  Preview production build
Project Structure
src/  
├── features/           # Feature-based modules  
│   ├── admin/         # Administrator features  
│   ├── staff/         # Staff member features    
│   ├── doctor/        # Doctor-specific features  
│   ├── patient/       # Patient portal features  
│   └── auth/          # Authentication components  
├── routes/            # Routing configuration  
├── pages/             # Layout components  
├── components/        # Shared components  
├── API/              # API client modules  
└── Store.jsx         # Redux store configuration  

Role-Based Access Control
The application implements comprehensive role-based routing:

Admin Routes (/admin)
Dashboard with analytics 
Patient management
Appointment scheduling
User management 
Reports and analytics
System settings
Access logs
Staff Routes (/staff)
Limited dashboard access
Patient management
Appointment handling
Invoice management
Basic reporting
Doctor Routes (/doctor)
Clinical dashboard
Patient records access
Appointment management
Medical reports
Patient Routes (/patient)
Personal dashboard
Appointment booking
Profile settings
Key Features
Dashboard Analytics
Real-time operational metrics including active users, total patients, appointments, and system users with trend indicators. 

User Management
Comprehensive user administration with role-based permissions, search/filter capabilities, and CRUD operations. 

Profile Management
User profile editing with role and status display, supporting both individual and administrative updates. 

Responsive Design
Mobile-optimized layouts with Tailwind CSS breakpoints for optimal viewing across devices. 

Development Configuration
Vite Configuration
React plugin with Fast Refresh
Tailwind CSS integration
Development proxy for backend API
Optimized dependencies for better performance 
State Management
Redux Toolkit with feature-specific slices:

Authentication state
Patient management
Appointment scheduling
User administration
Reports and analytics
API Integration
The frontend communicates with the PRMS backend through Axios HTTP client with proxy configuration for seamless development experience. 
Contributing
Follow the established feature-based architecture
Use Redux Toolkit for state management
Implement responsive design with Tailwind CSS
Maintain role-based access control patterns
Run linting before commits: npm run lint
Production Deployment
Build the application: npm run build
Deploy the dist folder to your hosting service
Ensure backend API endpoints are accessible
Configure environment variables as needed
Notes
This healthcare management system prioritizes security through role-based access control and maintains HIPAA compliance considerations in its design patterns. The modular architecture ensures maintainable code while Redux-based state management provides reliable data flow throughout the application.
