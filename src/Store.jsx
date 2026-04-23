import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./components/layout/admin/adminSlice";
import DashboardReducer from "./features/admin/dashboard/dashboardSlice";
import PatientsReducer from "./features/admin/patients/patientSlice";
import AppointmentsReducer from "./features/admin/appointments/appointmentSlice";
import UsersReducer from "./features/admin/users/userSlice";
import reportsReducer from "./features/admin/reports/reportSlice";
import settingsReducer from "./features/admin/setting/settingSlice";
import logsReducer from "./features/admin/log/logSlice";
import staffReducer from "./features/staff/staffSlice";
import staffDashboardReducer from "./features/staff/dashboard/staffDashboardSlice";
import invoiceReducer from "./features/staff/invoice/invoiceSlice";
import docDashboardReducer from "./features/doctor/dashboard/docDashboardSlice";
import historyReducer from "./features/admin/patients/historySlice";
import doctorAppointmentsReducer from "./features/doctor/appointments/docAppointmentSlice";
import doctorInvoiceReducer from "./features/doctor/invoice/invoiceSlice";
import patientAppointmentsReducer from "./features/patient/dashboard/patientDashboardSlice";
import patientInvoiceReducer from "./features/patient/invoice/patientInvoiceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: DashboardReducer,
    patients: PatientsReducer,
    appointments: AppointmentsReducer,
    users: UsersReducer,
    reports: reportsReducer,
    settings: settingsReducer,
    logs: logsReducer,
    staff: staffReducer,
    staffDashboard: staffDashboardReducer,
    docDashboard: docDashboardReducer,
    invoices: invoiceReducer,
    history: historyReducer,
    doctorAppointments: doctorAppointmentsReducer,
    doctorInvoices: doctorInvoiceReducer,
    patientAppointments: patientAppointmentsReducer,
    patientInvoices: patientInvoiceReducer,
  },
});

export default store;
