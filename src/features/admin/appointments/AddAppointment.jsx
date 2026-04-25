import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppointmentForm from "./AppointmentForm";
import { addAppointment, fetchAppointments } from "./appointmentSlice";
import toast from "react-hot-toast";

const AddAppointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const appointmentData = {
        patient: {
          email: data.patient.email || "",
          ...(data.patient.phone && { phone: Number(data.patient.phone) }),
        },
        date: new Date(`${data.date}T${data.time}:00`).toISOString(),
        assignedTo: data.doctor,
        reason: data.reason,
        status: data.status,
      };
      const result = await dispatch(addAppointment(appointmentData)).unwrap();
      // Handle backend response structure
      const newAppointment =
        result?.data?.appointment || result?.appointment || result;
      if (newAppointment?._id) {
        toast.success("Appointment booked successfully!");
        // Refetch appointments to get full patient info
        dispatch(fetchAppointments());
        navigate(-1);
      } else {
        throw new Error("No ID returned from server");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Create New Appointment
        </h2>
      </div>
      <AppointmentForm
        onSubmit={handleSubmit}
        loading={loading}
        fetchDoctorsOnMount={true}
        isAddMode={true}
      />
    </div>
  );
};

export default AddAppointment;
