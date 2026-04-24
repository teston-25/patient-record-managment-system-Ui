import { useEffect, useState } from "react";
import { getProfile } from "../../../API/profileAPI";
import appointmentAPI from "../../../API/appointmentAPI";
import Spinner from "../../../components/common/Spinner";
import { CalendarIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function PatientDashboard() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileRes = await getProfile();
        const user = profileRes.data.user;
        setProfile(user);
        if (user.patient) {
          const apptRes = await appointmentAPI.getAppointmentsByPatient(
            user.patient,
          );
          setAppointments(apptRes.data.appointments || []);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        setError("Failed to load data");
        toast.error(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sort appointments by date descending (most recent first)
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const recentAppointments = sortedAppointments.slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 text-lg text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Stat Card at Top */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Total Appointments
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {appointments.length}
            </p>
          </div>
          <div className="bg-purple-500 p-3 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Welcome/Profile Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 rounded-2xl shadow p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            Welcome{profile?.fullName ? `, ${profile.fullName}` : ""}!
          </h1>
          <p className="text-gray-700 mb-4">
            This is your patient dashboard. Here you can view your profile and
            keep track of your appointments.
          </p>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-2">My Profile</h2>
            <div className="space-y-2 text-gray-700">
              <div>
                <span className="font-semibold">Full Name:</span>{" "}
                {profile.fullName}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {profile.email}
              </div>
              <div>
                <span className="font-semibold">Role:</span> {profile.role}
              </div>
              <div>
                <span className="font-semibold">User ID:</span> {profile._id}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Appointments
          </h2>
          {recentAppointments.length === 0 ? (
            <div className="text-gray-500">No recent appointments found.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentAppointments.map((appt) => (
                <li key={appt._id} className="py-2 flex flex-col">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-800">
                      {appt.date
                        ? new Date(appt.date).toLocaleDateString()
                        : "No date"}
                    </div>
                    <span className="text-blue-600 text-sm">{appt.reason}</span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    Status: <span className="font-semibold">{appt.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
