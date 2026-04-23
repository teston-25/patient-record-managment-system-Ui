import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, resetUserState } from "./userSlice";
import UserFormFields from "../../components/user/UserFormFields";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import SuccessMessage from "../../components/common/SuccessMessage";
import BackButton from "../../components/common/BackButton";
import { signup } from "../../auth/authSlice";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.users);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: "user",
    active: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(signup(userData));

      if (addNewUser.fulfilled.match(resultAction)) {
        setTimeout(() => {
          dispatch(resetUserState());
          navigate("/users");
        }, 1500);
      }
    } catch (err) {
      // Error will be handled by the Redux state
      console.error(err);
    }
  };

  const handleReset = () => {
    setUserData({
      fullName: "",
      email: "",
      role: "user",
      active: true,
    });
  };

  if (loading === "pending") {
    return <Spinner />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
        <BackButton />
      </div>

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message="User created successfully!" />}

      <form onSubmit={handleSubmit}>
        <UserFormFields
          formData={userData}
          setFormData={setUserData}
          readOnly={false}
        />

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading === "pending"}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              loading === "pending" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading === "pending" ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
