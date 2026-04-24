import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "./userSlice";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "staff",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.firstName || !form.lastName || !form.email || !form.role) {
      setFormError("All fields are required");
      return;
    }
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const userData = {
      fullName,
      email: form.email,
      role: form.role,
      password: "password", // default password
    };
    try {
      const resultAction = await dispatch(addNewUser(userData));
      if (addNewUser.fulfilled.match(resultAction)) {
        toast.success("User created successfully!");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          role: "staff",
        });
        navigate("/admin/users");
      } else {
        toast.error(resultAction.error?.message || "Failed to create user");
      }
    } catch (err) {
      toast.error("Failed to create user: " + (err.message || "Unknown error"));
    }
  };

  if (loading === "pending") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Add New User</h2>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 text-sm bg-gray-480 hover:bg-gray-500 text-blue px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
                placeholder="Enter last name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="doctor">Doctor</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="text"
              name="password"
              value="(auto-generated or set by user)"
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            />
            <small className="text-gray-500">
              Default password is 'password'. The user should change it after
              first login.
            </small>
          </div>
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          {error && <ErrorMessage message={error} />}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            disabled={loading === "pending"}
          >
            {loading === "pending" ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
