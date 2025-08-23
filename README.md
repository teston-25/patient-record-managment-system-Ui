🏥 Patient Record Management System (PRMS) - Frontend
<div align="center">
https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react
https://img.shields.io/badge/Redux-2.8.2-764ABC?style=for-the-badge&logo=redux
https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite
https://img.shields.io/badge/Tailwind-4.1.7-06B6D4?style=for-the-badge&logo=tailwindcss

A comprehensive React-based healthcare management interface providing role-based access to patient records, appointment scheduling, user management, and reporting capabilities for dental clinics.

Features • Installation • Tech Stack • Contributing

</div>
🌟 Overview
The PRMS frontend serves four distinct user roles with tailored interfaces: administrators, staff members, doctors, and patients. Built with modern React architecture using Redux for state management and React Router for navigation.

🛠️ Technology Stack
Technology	Version	Purpose	Badge
React	^19.1.0	Core frontend framework	https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react
Redux Toolkit	^2.8.2	Centralized state management	https://img.shields.io/badge/Redux-2.8.2-764ABC?logo=redux
React Router	^7.6.0	Client-side routing	https://img.shields.io/badge/React_Router-7.6.0-CA4245?logo=react-router
Tailwind CSS	^4.1.7	Utility-first styling	https://img.shields.io/badge/Tailwind-4.1.7-06B6D4?logo=tailwindcss
Vite	^6.3.5	Build tool and dev server	https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite
Axios	^1.9.0	HTTP client for API communication	https://img.shields.io/badge/Axios-1.9.0-5A29E4?logo=axios
Chart.js	^4.5.0	Data visualization	https://img.shields.io/badge/Chart.js-4.5.0-FF6384?logo=chart.js
React Hook Form	^7.60.0	Form management	https://img.shields.io/badge/React_Hook_Form-7.60.0-EC5990?logo=react-hook-form
📋 Prerequisites
Node.js (latest LTS version recommended)

npm or yarn package manager

Access to PRMS backend API

🚀 Installation & Setup
1. Clone the repository
bash
git clone <repository-url>  
cd patient-recored-managment-system-Ui
2. Install dependencies
bash
npm install
3. Configure backend connection
The application is configured to connect to the backend at:

text
https://prms-backend-rrdo.onrender.com/
4. Start development server
bash
npm run dev
📜 Available Scripts
Script	Command	Purpose	Status
dev	vite	Start development server with HMR	https://img.shields.io/badge/Dev-Active-brightgreen
build	vite build	Build production bundle	https://img.shields.io/badge/Build-Ready-blue
lint	eslint .	Run code linting	https://img.shields.io/badge/Lint-Passing-green
preview	vite preview	Preview production build	https://img.shields.io/badge/Preview-Available-yellowgreen
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

✨ Key Features
📊 Dashboard Analytics
Real-time operational metrics including active users, total patients, appointments, and system users with trend indicators.

👥 User Management
Comprehensive user administration with role-based permissions, search/filter capabilities, and CRUD operations.

👤 Profile Management
User profile editing with role and status display, supporting both individual and administrative updates.

📱 Responsive Design
Mobile-optimized layouts with Tailwind CSS breakpoints for optimal viewing across devices.

⚙️ Development Configuration
🔧 Vite Configuration
⚛️ React plugin with Fast Refresh

🎨 Tailwind CSS integration

🔄 Development proxy for backend API

⚡ Optimized dependencies for better performance

🏪 State Management
Redux Toolkit with feature-specific slices:

🔐 Authentication state

🏥 Patient management

📅 Appointment scheduling

👥 User administration

📈 Reports and analytics

🔌 API Integration
The frontend communicates with the PRMS backend through Axios HTTP client with proxy configuration for seamless development experience.

🤝 Contributing
🏗️ Follow the established feature-based architecture

🏪 Use Redux Toolkit for state management

🎨 Implement responsive design with Tailwind CSS

🔐 Maintain role-based access control patterns

✅ Run linting before commits: npm run lint

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
