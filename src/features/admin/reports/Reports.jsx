import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSummaryReport,
  fetchAppointmentsByDateRange,
  fetchFrequentDiagnoses,
} from "./reportSlice";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function getMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    from: start.toISOString().slice(0, 10),
    to: end.toISOString().slice(0, 10),
  };
}

function Reports() {
  const dispatch = useDispatch();
  const reportsState = useSelector((state) => state.reports);
  const { summary, appointments, diagnoses, loading, error } =
    reportsState || {};
  const [dateRange, setDateRange] = useState(getMonthRange());

  // Get current user role
  const userRole = useSelector((state) => state.auth.user?.role || "");

  useEffect(() => {
    dispatch(fetchSummaryReport());
    dispatch(fetchFrequentDiagnoses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAppointmentsByDateRange({ from: dateRange.from, to: dateRange.to }),
    );
  }, [dispatch, dateRange]);

  const handleDateChange = (e) => {
    setDateRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Prepare chart data
  const chartData = {
    labels: diagnoses?.map((d) => d.diagnosis || d._id) || [],
    datasets: [
      {
        label: "Frequency",
        data: diagnoses?.map((d) => d.count) || [],
        backgroundColor: "#6366f1",
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  // Chart options for horizontal, no animation
  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    animation: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 13 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#334155", font: { size: 13 } },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Reports Dashboard
        {userRole && (
          <span className="ml-2 text-base text-blue-500 font-normal">
            ({userRole.charAt(0).toUpperCase() + userRole.slice(1)})
          </span>
        )}
      </h2>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between min-w-0">
              <div>
                <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                  Total Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.totalAppointments ?? "-"}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between min-w-0">
              <div>
                <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-green-500" />
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.totalPatients ?? "-"}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between min-w-0">
              <div>
                <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <ClipboardDocumentListIcon className="w-5 h-5 text-purple-500" />
                  Diagnoses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnoses?.length ?? "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Appointments Section */}
          {summary?.recentAppointments &&
            summary.recentAppointments.length > 0 && (
              <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Recent Appointments
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {summary.recentAppointments.map((appt) => (
                    <div
                      key={appt._id}
                      className="border border-gray-100 rounded-xl p-3 flex flex-col bg-gray-50"
                    >
                      <span className="font-medium text-gray-800 truncate">
                        {appt.patient.firstName} {appt.patient.lastName}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {appt.reason}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(appt.date).toLocaleDateString()} (
                        {appt.status})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Date Range Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
            <label className="text-gray-700 font-medium">From:</label>
            <input
              type="date"
              name="from"
              value={dateRange.from}
              onChange={handleDateChange}
              className="border rounded px-2 py-1"
            />
            <label className="text-gray-700 font-medium">To:</label>
            <input
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
              className="border rounded px-2 py-1"
            />
          </div>

          {/* Appointments Table - Desktop */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6 border border-gray-200">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">
                Appointments ({appointments?.length || 0})
              </h3>
            </div>
            {appointments && appointments.length > 0 ? (
              <>
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <div className="max-h-[35vh] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Doctor
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reason
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appt, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              {new Date(appt.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              {appt.patient
                                ? appt.patient.fullName ||
                                  (appt.patient.firstName || "N/A") +
                                    " " +
                                    (appt.patient.lastName || "") ||
                                  appt.patient.email ||
                                  "N/A"
                                : "N/A"}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              {appt.assignedTo?.fullName || "-"}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap truncate max-w-[120px]">
                              {appt.reason || "-"}
                            </td>
                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  appt.status === "pending"
                                    ? "bg-blue-100 text-blue-800"
                                    : appt.status === "confirmed"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : appt.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {appt.status || "-"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Mobile Cards */}
                <div className="sm:hidden divide-y divide-gray-200 max-h-[54vh] overflow-y-auto">
                  {appointments.map((appt, idx) => (
                    <div key={idx} className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {appt.patient
                              ? appt.patient.fullName ||
                                (appt.patient.firstName || "N/A") +
                                  " " +
                                  (appt.patient.lastName || "") ||
                                appt.patient.email ||
                                "N/A"
                              : "N/A"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appt.doctor?.fullName || "-"}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appt.status === "pending"
                              ? "bg-blue-100 text-blue-800"
                              : appt.status === "confirmed"
                                ? "bg-yellow-100 text-yellow-800"
                                : appt.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appt.status || "-"}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {appt.reason || "-"}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        {new Date(appt.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-6 sm:p-8 text-center">
                <p className="text-gray-500">
                  No appointments found for this range.
                </p>
              </div>
            )}
          </div>

          {/* Frequent Diagnosis List */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Frequent Diagnoses
            </h3>
            {diagnoses && diagnoses.length > 0 ? (
              <div className="w-full min-h-[200px] h-[40vw] max-h-[350px] md:h-[320px]">
                <Bar data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="text-gray-400">No diagnosis data available.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
