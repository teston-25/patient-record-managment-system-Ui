import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import StaffNavbar from "../components/layout/staff/StaffNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../features/staff/staffSlice";

export default function StaffLayout() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.staff.sidebarOpen);
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar role="staff" />
      </div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar role="staff" />
      </div>
      {sidebarOpen && (
        <div
          onClick={() => dispatch(setSidebarOpen(false))}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}
      <div className="flex flex-col flex-1">
        <StaffNavbar />
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
