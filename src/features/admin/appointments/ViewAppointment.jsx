import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentById } from "./appointmentSlice";
import {
  selectCurrentAppointment,
  selectAppointmentState,
} from "../../../components/common/selectors";
import AppointmentForm from "./AppointmentForm";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import BackButton from "../../../components/common/BackButton";

const ViewAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state
  const { user, isLoading: authLoading } = useSelector((state) => state.auth);

  // Use the correct selectors
  const appointment = useSelector((state) =>
    selectCurrentAppointment(state, id),
  );
  const { loading, error } = useSelector(selectAppointmentState);

  useEffect(() => {
    if (!appointment && id) {
      dispatch(fetchAppointmentById(id));
    }
  }, [dispatch, id, appointment]);

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Spinner text="Checking authorization..." />
      </div>
    );
  }

  const userRole = user?.role || "admin";

  if (userRole === "doctor") {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <div className="text-red-500 text-lg font-semibold mb-4">
          Not authorized to view appointment details.
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Handle loading states
  if (loading === true || loading === "loading") {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Spinner text="Loading appointment details..." />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <ErrorMessage message={error} />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Handle not found
  if (!appointment) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-red-500 mb-4">Appointment not found</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment Details</h1>
        <BackButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <AppointmentForm appointment={appointment} isViewMode={true} />
      </div>
    </div>
  );
};

export default ViewAppointment;
