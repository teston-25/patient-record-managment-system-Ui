import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/layout/admin/Navbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { setSidebarOpen } from "../components/layout/admin/adminSlice";

const AdminLayout = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = (event) => {
      if (location.pathname.startsWith("/admin")) {
        setShowLogoutConfirm(true);
        window.history.pushState(null, "", location.pathname);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <>
      <div className="flex w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar role="admin" />
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
            useSelector((state) => state.admin.sidebarOpen)
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <Sidebar role="admin" />
        </div>
        {useSelector((state) => state.admin.sidebarOpen) && (
          <div
            onClick={() => dispatch(setSidebarOpen(false))}
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-white">
            <Outlet />
          </main>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
