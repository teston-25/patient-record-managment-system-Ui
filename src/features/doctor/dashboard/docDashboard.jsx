import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorDashboardStats } from "./docDashboardSlice";
import Spinner from "../../../components/common/Spinner";
import MedicalHistoryModal from "../../admin/patients/MedicalHistoryModal";
import { Link } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function DocDashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.docDashboard);

  // Add state for modal
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    dispatch(fetchDoctorDashboardStats());
  }, [dispatch]);

  const cards = [
    {
      label: "Total Appointments",
      value: stats.totalAppointments,
      color: "bg-blue-500",
      icon: CalendarIcon,
    },
    {
      label: "Today's Appointments",
      value: stats.todaysAppointments,
      color: "bg-green-500",
      icon: CalendarIcon,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Doctor Dashboard
      </h2>
      {loading ? (
        <div className="py-8">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-red-600 font-semibold text-lg">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {cards.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Recent Appointments
            </h3>
            <div className="divide-y divide-gray-100">
              {stats.recentAppointments.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  No recent appointments
                </div>
              ) : (
                stats.recentAppointments.map((appointment, idx) => (
                  <div
                    key={idx}
                    className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {appointment.patient?.firstName}{" "}
                        {appointment.patient?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.date
                          ? new Date(appointment.date).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${appointment.status === "pending" ? "bg-blue-100 text-blue-800" : ""}
                        ${appointment.status === "confirmed" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${appointment.status === "completed" ? "bg-green-100 text-green-800" : ""}
                        ${appointment.status === "cancelled" ? "bg-red-100 text-red-800" : ""}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                      <button
                        className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        onClick={() => {
                          setSelectedPatientId(
                            appointment.patient?._id || appointment.patient,
                          );
                          setShowHistoryModal(true);
                        }}
                      >
                        View Medical History
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {showHistoryModal && (
            <MedicalHistoryModal
              patientId={selectedPatientId}
              onClose={() => setShowHistoryModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
