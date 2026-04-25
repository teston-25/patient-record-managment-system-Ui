import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../users/userSlice";
import { selectDoctorsWithState } from "../../../components/common/selectors";

const AppointmentForm = ({
  appointment,
  onSubmit,
  isViewMode = false,
  isStatusOnly = false,
  loading = false,
  fetchDoctorsOnMount = true,
  isAddMode = false, // new prop
  role = "admin",
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: appointment || {
      patient: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      date: "",
      time: "",
      doctor: "",
      reason: "Routine Checkup",
      status: "pending",
    },
  });

  const email = watch("patient.email");
  const phone = watch("patient.phone");

  const {
    doctors,
    loading: doctorsLoading,
    error: doctorsError,
  } = useSelector(selectDoctorsWithState);

  useEffect(() => {
    if (fetchDoctorsOnMount && doctors.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, fetchDoctorsOnMount, doctors.length]);

  useEffect(() => {
    if (appointment) {
      reset({
        ...appointment,
        date: appointment.date?.split("T")[0] || "",
        time: appointment.date?.split("T")[1]?.substring(0, 5) || "",
        doctor: appointment.assignedTo?._id || "",
      });
    }
  }, [appointment, reset]);

  const reasonOptions = [
    "Routine Checkup",
    "Dental Cleaning",
    "Tooth Extraction",
    "Root Canal",
    "Dental Implant",
    "Orthodontic Consultation",
    "Routine Checkups & Cleanings",
    "Tooth Fillings & Restorations",
    "Teeth Whitening & Cosmetic Dentistry",
  ];

  const validateContactInfo = () => {
    return email || phone ? true : "Either email or phone number is required";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Patient Information */}
      {role !== "doctor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isAddMode && !isStatusOnly && !isViewMode && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("patient.firstName", { required: true })}
                  className={`w-full p-2 border rounded-lg ${
                    errors?.patient?.firstName ? "border-red-500" : ""
                  } ${isViewMode || isStatusOnly ? "bg-gray-100" : ""}`}
                  readOnly={isViewMode || isStatusOnly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("patient.lastName", { required: true })}
                  className={`w-full p-2 border rounded-lg ${
                    errors?.patient?.lastName ? "border-red-500" : ""
                  } ${isViewMode || isStatusOnly ? "bg-gray-100" : ""}`}
                  readOnly={isViewMode || isStatusOnly}
                />
              </div>
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("patient.email", {
              validate: (value) =>
                value || watch("patient.phone")
                  ? true
                  : "Email or phone required",
            })}
            className={`w-full p-2 border rounded-lg ${
              errors?.patient?.email ? "border-red-500" : ""
            } ${isViewMode || isStatusOnly ? "bg-gray-100" : ""}`}
            readOnly={isViewMode || isStatusOnly}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <PhoneIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              {...register("patient.phone", {
                validate: (value) =>
                  value || watch("patient.email")
                    ? true
                    : "Phone or email required",
              })}
              className={`pl-10 w-full p-2 border rounded-lg ${
                errors?.patient?.phone ? "border-red-500" : ""
              } ${isViewMode || isStatusOnly ? "bg-gray-100" : ""}`}
              readOnly={isViewMode || isStatusOnly}
            />
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          {isViewMode || isStatusOnly ? (
            <div className="p-2 border rounded-lg bg-gray-100">
              {watch("date")
                ? new Date(watch("date")).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Not specified"}
            </div>
          ) : (
            <div className="relative">
              <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                {...register("date", { required: true })}
                className={`pl-10 w-full p-2 border rounded-lg ${
                  errors?.date ? "border-red-500" : ""
                }`}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          {isViewMode || isStatusOnly ? (
            <div className="p-2 border rounded-lg bg-gray-100">
              {watch("time")
                ? new Date(`2000-01-01T${watch("time")}`).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )
                : "Not specified"}
            </div>
          ) : (
            <div className="relative">
              <ClockIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                name="time"
                min="02:00"
                max="11:00"
                {...register("time", { required: true })}
                className={`pl-10 w-full p-2 border rounded-lg ${
                  errors?.time ? "border-red-500" : ""
                }`}
              />
              <small className="text-gray-500">
                Working hours: 2:00 AM to 11:00 AM (Ethiopia time)
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Doctor and Reason */}
      {role !== "doctor" && !isStatusOnly && !isViewMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor
            </label>
            {isViewMode ? (
              <div className="p-2 border rounded-lg bg-gray-100">
                {appointment?.assignedTo?.fullName
                  ? `Dr. ${appointment.assignedTo.fullName}`
                  : "Not assigned"}
              </div>
            ) : (
              <>
                <select
                  {...register("doctor", { required: true })}
                  className={`w-full p-2 border rounded-lg ${
                    errors?.doctor ? "border-red-500" : ""
                  }`}
                  disabled={doctorsLoading}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.fullName}
                    </option>
                  ))}
                </select>
                {doctorsError && (
                  <p className="text-red-500 text-sm mt-1">{doctorsError}</p>
                )}
              </>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <select
              {...register("reason", { required: true })}
              className={`w-full p-2 border rounded-lg ${
                errors?.reason ? "border-red-500" : ""
              } ${isViewMode || isStatusOnly ? "bg-gray-100" : ""}`}
              disabled={isViewMode || isStatusOnly}
            >
              {reasonOptions.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason
          </label>
          <div className="p-2 border rounded-lg bg-gray-100">
            {watch("reason") || appointment?.reason || "Not specified"}
          </div>
        </div>
      )}

      {/* Status Field (always visible for doctor, editable only in status mode) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            {...register("status", { required: true })}
            className={`w-full p-2 border rounded-lg ${
              errors?.status ? "border-red-500" : ""
            } ${isViewMode ? "bg-gray-100" : ""}`}
            disabled={
              isViewMode ||
              (!isStatusOnly &&
                (role === "doctor" || role === "admin" || role === "staff"))
            }
          >
            <option value="pending">Scheduled</option>
            <option value="confirmed">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      {!isViewMode && (
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      )}
    </form>
  );
};

export default AppointmentForm;
