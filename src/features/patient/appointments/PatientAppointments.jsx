import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientAppointments } from "../dashboard/patientDashboardSlice";
import Spinner from "../../../components/common/Spinner";
import { getProfile } from "../../../API/profileAPI";
import toast from "react-hot-toast";

export default function PatientAppointments() {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.patientAppointments,
  );
  const [patientId, setPatientId] = useState(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchProfileAndAppointments = async () => {
      try {
        const res = await getProfile();
        const user = res.data.user;
        if (user.patient) {
          setPatientId(user.patient);
          dispatch(fetchPatientAppointments(user.patient));
        }
      } catch (err) {
        toast.error("Failed to fetch profile", err);
      }
    };
    fetchProfileAndAppointments();
  }, [dispatch]);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">My Appointments</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : appointments.length === 0 ? (
        <div className="text-gray-500">No appointments found.</div>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800">
                    {appt.date
                      ? new Date(appt.date).toLocaleDateString()
                      : "No date"}{" "}
                    - {appt.reason}
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: <span className="font-semibold">{appt.status}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(appt._id)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-semibold shadow"
                >
                  {openId === appt._id ? "Hide" : "Details"}
                </button>
              </div>
              {openId === appt._id && (
                <div className="mt-4 space-y-2 text-gray-700 border-t pt-4">
                  <div>
                    <span className="font-semibold">Doctor:</span>{" "}
                    {appt.assignedTo?.fullName || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Reason:</span> {appt.reason}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span> {appt.status}
                  </div>
                  <div>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(appt.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Updated At:</span>{" "}
                    {new Date(appt.updatedAt).toLocaleString()}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
