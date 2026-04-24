import BackButton from "../../../components/common/BackButton";

const UserFormFields = ({ formData, setFormData, readOnly = false }) => {
  const handleChange = (e) => {
    if (!readOnly) {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <BackButton className="mb-4" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            readOnly
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed p-2 border"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email || ""}
            readOnly
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed p-2 border"
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role *
          </label>
          <select
            id="role"
            name="role"
            value={formData.role || ""}
            onChange={readOnly ? undefined : handleChange}
            disabled={readOnly ? true : false}
            required
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="doctor">Doctor</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Active Status */}
        <div className="space-y-2 flex items-center">
          <input
            id="active"
            type="checkbox"
            name="active"
            checked={formData.active || false}
            onChange={readOnly ? undefined : handleChange}
            disabled={readOnly ? true : false}
            className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          />
          <label
            htmlFor="active"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Active
          </label>
        </div>

        {/* Created At (Read-only) */}
        {formData.createdAt && (
          <div className="space-y-2">
            <label
              htmlFor="createdAt"
              className="block text-sm font-medium text-gray-700"
            >
              Created At
            </label>
            <input
              id="createdAt"
              type="text"
              name="createdAt"
              value={new Date(formData.createdAt).toLocaleString()}
              readOnly
              className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100 cursor-not-allowed p-2 border"
            />
          </div>
        )}

        {/* Updated At (Read-only) */}
        {formData.updatedAt && (
          <div className="space-y-2">
            <label
              htmlFor="updatedAt"
              className="block text-sm font-medium text-gray-700"
            >
              Updated At
            </label>
            <input
              id="updatedAt"
              type="text"
              name="updatedAt"
              value={new Date(formData.updatedAt).toLocaleString()}
              readOnly
              className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100 cursor-not-allowed p-2 border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFormFields;
