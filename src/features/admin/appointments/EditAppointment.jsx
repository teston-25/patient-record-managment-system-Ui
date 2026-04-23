import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppointmentForm from "./AppointmentForm";
import {
  updateAppointment,
  fetchAppointmentById,
  clearAppointmentError,
  fetchAppointments,
} from "./appointmentSlice";
import toast from "react-hot-toast";
import { selectCurrentAppointment } from "../../../components/common/selectors";
import LoadingSpinner from "../../../components/common/Spinner";

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentAppointmentFromList = useSelector((state) =>
    selectCurrentAppointment(state, id),
  );
  const currentAppointment =
    useSelector((state) => state.appointments.currentAppointment) ||
    currentAppointmentFromList;

  const { loading, error, status } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "admin";

  useEffect(() => {
    dispatch(clearAppointmentError());
    dispatch(fetchAppointmentById(id));
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        ...currentAppointment,
        patient: {
          ...currentAppointment.patient,
          email: data.patient.email || undefined,
          phone: data.patient.phone || undefined,
        },
        assignedTo: data.doctor,
        date: new Date(`${data.date}T${data.time}`).toISOString(),
        reason: data.reason,
        // Only allow doctors to update status
        ...(userRole === "doctor" && { status: data.status }),
      };

      // Remove undefined values
      const cleanData = JSON.parse(JSON.stringify(appointmentData));

      const result = await dispatch(
        updateAppointment({ id, updateData: cleanData }),
      ).unwrap();

      // Handle backend response structure
      const updatedAppointment =
        result?.data?.appointment || result?.appointment || result;
      if (updatedAppointment?._id) {
        toast.success("Appointment updated successfully!");
        dispatch(fetchAppointments());
        navigate(-1);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.message ||
          error.response?.data?.message ||
          "Failed to update appointment",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading === "pending" && !currentAppointment) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
        <span className="ml-2">Loading appointment data...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  // Not found state
  if (!currentAppointment && status === "succeeded") {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600 mb-4">Appointment not found</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Appointment</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      {currentAppointment && (
        <AppointmentForm
          appointment={currentAppointment}
          onSubmit={handleSubmit}
          isViewMode={false}
          loading={isSubmitting}
          fetchDoctorsOnMount={true}
        />
      )}
    </div>
  );
};

export default EditAppointment;
