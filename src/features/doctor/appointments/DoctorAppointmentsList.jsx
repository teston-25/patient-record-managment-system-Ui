import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "./docAppointmentSlice";
import MedicalHistoryModal from "../../admin/patients/MedicalHistoryModal";
import toast from "react-hot-toast";
import appointmentAPI from "../../../API/appointmentAPI";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Spinner from "../../../components/common/Spinner";

const statusOptions = [
  { value: "pending", label: "Scheduled" },
  { value: "confirmed", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function isToday(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

const DoctorAppointmentsList = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.doctorAppointments,
  );
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  // Split appointments into today's and others
  const todaysAppointments = appointments.filter((a) => isToday(a.date));
  const otherAppointments = appointments.filter((a) => !isToday(a.date));
  const displayedAppointments = showAll
    ? [...todaysAppointments, ...otherAppointments]
    : todaysAppointments;

  // Add stats for dashboard-like cards
  const totalAppointments = appointments.length;
  const todaysAppointmentsCount = todaysAppointments.length;

  const handleStatusChange = async (appointmentId, newStatus) => {
    setStatusUpdating((prev) => ({ ...prev, [appointmentId]: true }));
    try {
      const response = await appointmentAPI.updateAppointmentStatus(
        appointmentId,
        newStatus,
      );
      toast.success(
        `Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      );
      // Update local state
      dispatch(fetchDoctorAppointments());
      console.log("Status update response:", response);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update status",
      );
    } finally {
      setStatusUpdating((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  const getAllowedStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return [
          { value: "pending", label: "Scheduled" },
          { value: "confirmed", label: "In Progress" },
          { value: "completed", label: "Completed" },
          { value: "cancelled", label: "Cancelled" },
        ];
      case "confirmed":
        return [
          { value: "confirmed", label: "In Progress" },
          { value: "completed", label: "Completed" },
          { value: "cancelled", label: "Cancelled" },
        ];
      case "completed":
      case "cancelled":
        return [statusOptions.find((opt) => opt.value === currentStatus)];
      default:
        return statusOptions;
    }
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-2 sm:p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        My Appointments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Today's Appointments
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {todaysAppointmentsCount}
            </p>
          </div>
          <div className="bg-green-500 p-3 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              All My Appointments
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {totalAppointments}
            </p>
          </div>
          <div className="bg-blue-500 p-3 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap mb-4">
        <button
          className={`px-4 py-2 rounded-lg border transition-colors ${!showAll ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
          onClick={() => setShowAll(false)}
        >
          Today's Appointments
        </button>
        <button
          className={`px-4 py-2 rounded-lg border transition-colors ${showAll ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
          onClick={() => setShowAll(true)}
        >
          All My Appointments
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <tr>
              {" "}
              <td colSpan={4} className="py-8">
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                displayedAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {appointment.patient?.firstName}{" "}
                      {appointment.patient?.lastName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {appointment.date
                        ? new Date(appointment.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment._id, e.target.value)
                        }
                        className={`border rounded px-2 py-1 focus:outline-none
                        ${appointment.status === "pending" ? "bg-blue-100 text-blue-800" : ""}
                        ${appointment.status === "confirmed" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${appointment.status === "completed" ? "bg-green-100 text-green-800" : ""}
                        ${appointment.status === "cancelled" ? "bg-red-100 text-red-800" : ""}`}
                        disabled={
                          statusUpdating[appointment._id] ||
                          appointment.status === "completed" ||
                          appointment.status === "cancelled"
                        }
                      >
                        {getAllowedStatusOptions(appointment.status).map(
                          (opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ),
                        )}
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        onClick={() => {
                          setSelectedPatientId(
                            appointment.patient?._id || appointment.patient,
                          );
                          setShowHistoryModal(true);
                        }}
                      >
                        View Medical History
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
      {showHistoryModal && (
        <MedicalHistoryModal
          patientId={selectedPatientId}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorAppointmentsList;
