import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen as setAdminSidebarOpen } from "../layout/admin/adminSlice";
import { setSidebarOpen as setStaffSidebarOpen } from "../../features/staff/staffSlice";
import { setSidebarOpen as setPatientSidebarOpen } from "../../features/patient/dashboard/patientDashboardSlice";
import { logout } from "../layout/admin/adminSlice";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";

const navConfig = {
  admin: {
    title: "PRMS Admin",
    items: [
      {
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      { name: "Patients", to: "/admin/patients", icon: <Users size={18} /> },
      {
        name: "Appointments",
        to: "/admin/appointments",
        icon: <CalendarDays size={18} />,
      },
      { name: "Users", to: "/admin/users", icon: <Users size={18} /> },
      { name: "Invoices", to: "/admin/invoice", icon: <FileText size={18} /> },
      { name: "Reports", to: "/admin/reports", icon: <FileText size={18} /> },
      { name: "Settings", to: "/admin/settings", icon: <Settings size={18} /> },
      {
        name: "Access Logs",
        to: "/admin/logs",
        icon: <ClipboardList size={18} />,
      },
    ],
  },
  staff: {
    title: "PRMS Staff",
    items: [
      {
        name: "Dashboard",
        to: "/staff/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      { name: "Patients", to: "/staff/patients", icon: <Users size={18} /> },
      {
        name: "Appointments",
        to: "/staff/appointments",
        icon: <CalendarDays size={18} />,
      },
      { name: "Invoices", to: "/staff/invoice", icon: <FileText size={18} /> },
      { name: "Reports", to: "/staff/reports", icon: <FileText size={18} /> },
      { name: "Settings", to: "/staff/settings", icon: <Settings size={18} /> },
    ],
  },
  doctor: {
    title: "PRMS Doctor",
    items: [
      {
        name: "Dashboard",
        to: "/doctor/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      {
        name: "Appointments",
        to: "/doctor/appointments",
        icon: <CalendarDays size={18} />,
      },
      { name: "Reports", to: "/doctor/reports", icon: <FileText size={18} /> },
      {
        name: "Settings",
        to: "/doctor/settings",
        icon: <Settings size={18} />,
      },
    ],
  },
  user: {
    title: "PRMS Patient",
    items: [
      {
        name: "Dashboard",
        to: "/patient/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      {
        name: "Appointments",
        to: "/patient/appointments",
        icon: <CalendarDays size={18} />,
      },
      {
        name: "Invoices",
        to: "/patient/invoices",
        icon: <FileText size={18} />,
      },
      {
        name: "Settings",
        to: "/patient/settings",
        icon: <Settings size={18} />,
      },
    ],
  },
};

export default function Sidebar({ role = "admin" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector((state) =>
    role === "staff" ? state.staff.sidebarOpen : state.admin.sidebarOpen,
  );
  const { title, items } = navConfig[role] || navConfig.admin;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/");
  };

  // Helper to close sidebar on link click for mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      if (role === "staff") {
        dispatch(setStaffSidebarOpen(false));
      } else if (role === "user") {
        dispatch(setPatientSidebarOpen(false));
      } else {
        dispatch(setAdminSidebarOpen(false));
      }
    }
  };

  return (
    <aside className="w-64 h-full bg-gradient-to-br from-teal-100 via-teal-300 to-teal-500 shadow-xl flex flex-col">
      <div className="px-6 py-5 text-2xl font-bold text-slate-800 border-b border-teal-300/50 bg-teal-50 rounded-br-3xl">
        {title}
      </div>
      <nav className="flex-1 mt-4 space-y-1 px-3">
        {items.map(({ name, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={handleLinkClick}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                isActive
                  ? "bg-white text-[#007c80] shadow-sm"
                  : "text-slate-800 hover:bg-white/30 hover:text-[#007c80]",
              ].join(" ")
            }
          >
            {icon}
            {name}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-teal-300/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-sm font-semibold text-red-700 px-4 py-3 hover:bg-red-100 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
