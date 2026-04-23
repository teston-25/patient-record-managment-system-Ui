import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import PatientNavbar from "../components/layout/patient/PatientNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../features/patient/dashboard/patientDashboardSlice";

const PatientLayout = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(
    (state) => state.patientAppointments.sidebarOpen,
  );
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar role="user" />
      </div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 260 }}
      >
        <Sidebar role="user" />
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-white bg-opacity-60 backdrop-blur-sm md:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <PatientNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
