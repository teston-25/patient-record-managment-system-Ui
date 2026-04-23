import { Routes, Route } from "react-router-dom";

import AdminLayout from "../pages/AdminLayout";
import StaffLayout from "../pages/StaffLayout";
import Dashboard from "../features/admin/dashboard/Dashboard";
import StaffDashboard from "../features/staff/dashboard/staffDashboard";
import Patients from "../features/admin/patients/Patients";
import Appointments from "../features/admin/appointments/Appointments";
import Users from "../features/admin/users/Users";
import Reports from "../features/admin/reports/Reports";
import Settings from "../features/admin/setting/Settings";
import Logs from "../features/admin/log/Logs";
import Landing from "../pages/Landing";
import Login from "../features/auth/login/Login";
import Signup from "../features/auth/signup/Signup";
import ForgotPass from "../features/auth/login/ForgotPass";
import ResetPass from "../features/auth/login/ResetPass";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import Profile from "../pages/Profile";
import AddPatientForm from "../features/admin/patients/AddPatientForm";
import EditPatientForm from "../features/admin/patients/EditPatientForm";
import ViewPatientProfile from "../features/admin/patients/ViewPatientProfile";
import AddAppointment from "../features/admin/appointments/AddAppointment";
import ViewAppointment from "../features/admin/appointments/ViewAppointment";
import EditAppointment from "../features/admin/appointments/EditAppointment";
import AddUser from "../features/admin/users/AddUser";
import ViewUser from "../features/admin/users/ViewUser";
import InvoiceList from "../features/staff/invoice/InvoiceList.jsx";
import DocDashboard from "../features/doctor/dashboard/docDashboard";
import DoctorLayout from "../pages/DoctorLayout";
import PatientLayout from "../pages/PatientLayout";
import PatientDashboard from "../features/patient/dashboard/PatientDashboard";
import DoctorAppointmentView from "../features/doctor/appointments/DoctorAppointmentView";
import DoctorAppointmentsList from "../features/doctor/appointments/DoctorAppointmentsList";
import PatientAppointments from "../features/patient/appointments/PatientAppointments";
import PatientInvoices from "../features/patient/invoice/PatientInvoices";

export default function AppRoutes() {
  return (
    <Routes>
      {/* { Public Routes /} */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password/:token" element={<ResetPass />} />
      <Route path="" element={<NotFound />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={["admin"]} />}
      >
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/add" element={<AddPatientForm />} />
          <Route path="patients/edit/:id" element={<EditPatientForm />} />
          <Route path="patients/:id" element={<ViewPatientProfile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="appointments/view/:id" element={<ViewAppointment />} />
          <Route path="appointments/edit/:id" element={<EditAppointment />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/view/:id" element={<ViewUser />} />
          <Route path="invoice" element={<InvoiceList />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logs" element={<Logs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      {/* Staff Routes */}
      <Route
        path="/staff"
        element={<ProtectedRoute allowedRoles={["staff"]} />}
      >
        <Route element={<StaffLayout />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/add" element={<AddPatientForm />} />
          <Route path="patients/edit/:id" element={<EditPatientForm />} />
          <Route path="patients/:id" element={<ViewPatientProfile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="appointments/view/:id" element={<ViewAppointment />} />
          <Route path="appointments/edit/:id" element={<EditAppointment />} />
          <Route path="invoice" element={<InvoiceList />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Profile Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["staff", "user", "doctor"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={<ProtectedRoute allowedRoles={["doctor"]} />}
      >
        <Route element={<DoctorLayout />}>
          <Route path="dashboard" element={<DocDashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route
            path="appointments/view/:id"
            element={<DoctorAppointmentView />}
          />
          <Route path="appointments" element={<DoctorAppointmentsList />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={<ProtectedRoute allowedRoles={["user"]} />}
      >
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="invoices" element={<PatientInvoices />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
