import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DoctorNavbar from "../components/layout/doctor/DoctorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../components/layout/admin/adminSlice";

export default function DoctorLayout() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.admin.sidebarOpen);
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar role="doctor" />
      </div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar role="doctor" />
      </div>
      {sidebarOpen && (
        <div
          onClick={() => dispatch(setSidebarOpen(false))}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}
      <div className="flex flex-col flex-1">
        <DoctorNavbar />
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
