🏥 Patient Record Management System (PRMS) - Frontend
React
Redux
Vite
Tailwind

A comprehensive React-based healthcare management interface providing role-based access to patient records, appointment scheduling, user management, and reporting capabilities for dental clinics.

🌟 Overview
The PRMS frontend serves four distinct user roles with tailored interfaces: administrators, staff members, doctors, and patients. Built with modern React architecture using Redux for state management and React Router for navigation.

🛠️ Technology Stack package.json:12-33
Technology	Version	Purpose	Badge
React	^19.1.0	Core frontend framework	React
Redux Toolkit	^2.8.2	Centralized state management	Redux
React Router	^7.6.0	Client-side routing	Router
Tailwind CSS	^4.1.7	Utility-first styling	Tailwind
Vite	^6.3.5	Build tool and dev server	Vite
Axios	^1.9.0	HTTP client for API communication	Axios
Chart.js	^4.5.0	Data visualization	Chart.js
React Hook Form	^7.60.0	Form management	Forms
📋 Prerequisites
Node.js(latest LTS version recommended)
npmoryarnpackage manager
Access to PRMS backend API
🚀 Installation & Setup
1. Clone the repository
git clone <repository-url>  
cd patient-recored-managment-system-Ui
2. Install dependencies
npm install
3. Configure backend connection
The application is configured to connect to the backend at:

https://prms-backend-rrdo.onrender.com/  
4. Start development server
npm run dev
📜 Available Scripts package.json:6-11
Script	Command	Purpose	Status
dev	vite	Start development server with HMR	Dev
build	vite build	Build production bundle	Build
lint	eslint .	Run code linting	Lint
preview	vite preview	Preview production build	Preview
📁 Project Structure
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
The application implements comprehensive role-based routing: Patients.jsx:20-21

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
Comprehensive user administration with role-based permissions, search/filter capabilities, and CRUD operations. PatientFormFields.jsx:3-9

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
The frontend communicates with the PRMS backend through Axios HTTP client with proxy configuration for seamless development experience. Patients.jsx:31-54

🤝 Contributing
🏗️ Follow the established feature-based architecture
🏪 Use Redux Toolkit for state management
🎨 Implement responsive design with Tailwind CSS
🔐 Maintain role-based access control patterns
✅ Run linting before commits: npm run lint
🚀 Production Deployment
Build the application:

npm run build
Deploy the dist folder to your hosting service

Ensure backend API endpoints are accessible

Configure environment variables as needed

📝 Notes
Security First: This healthcare management system prioritizes security through role-based access control and maintains HIPAA compliance considerations in its design patterns.

Maintainable Architecture: The modular architecture ensures maintainable code while Redux-based state management provides reliable data flow throughout the application.

Made with ❤️ for Healthcare Management

Healthcare
Management
System
