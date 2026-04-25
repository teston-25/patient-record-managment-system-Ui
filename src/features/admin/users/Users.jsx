import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { fetchUsers, deleteUser, updateUser } from "./userSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Menu } from "@headlessui/react";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [prevUsersLength, setPrevUsersLength] = useState(0);
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editUserId, setEditUserId] = useState(null);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    if (users.length === 0 && prevUsersLength === 0) {
      dispatch(fetchUsers());
      return;
    }

    if (users.length < prevUsersLength) {
      dispatch(fetchUsers());
    }

    setPrevUsersLength(users.length);
  }, [dispatch, users.length, prevUsersLength]);

  const safeUsers = Array.isArray(users) ? users : [];
  const filteredUsers = safeUsers.filter((user) => {
    const fullName = `${user?.fullName || ""}`.toLowerCase();
    const email = user?.email?.toLowerCase() || "";

    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());

    // Role filter
    const matchesRole =
      roleFilter === "All Roles" ||
      user?.role?.toLowerCase() === roleFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Active" && user?.active === true) ||
      (statusFilter === "Inactive" && user?.active === false);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = (id) => {
    toast.error(`Deletion for ${id} disabled in this public demo.`);
    return;
    // if (window.confirm("Are you sure you want to delete this user?")) {
    //   dispatch(deleteUser(id))
    //     .unwrap()
    //     .then(() => {
    //       toast.success("User has been removed!");
    //     })
    //     .catch((error) => {
    //       toast.error("Failed to delete user");
    //       console.error("Failed to delete user:", error);
    //     });
    // }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-1">
          Manage system users and permissions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="md:hidden flex items-center gap-2 bg-gray-100 p-2 rounded-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
          <span>Filters</span>
        </button>

        <div className={`${showFilters ? "block" : "hidden"} md:flex gap-4`}>
          <select
            className="border rounded-lg px-4 py-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All Roles">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
            <option value="Doctor">Doctor</option>
            <option value="User">User</option>
          </select>
          <select
            className="border rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <Link
          to="/admin/users/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="hidden sm:inline md:inline">Add User</span>
        </Link>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="hidden md:block">
          <div className="min-h-[450px] max-h-[420px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {editUserId === user._id ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="border rounded px-2 py-1 bg-white"
                        >
                          <option value="admin">Admin</option>
                          <option value="staff">Staff</option>
                          <option value="doctor">Doctor</option>
                          <option value="user">User</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editUserId === user._id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="border rounded px-2 py-1 bg-white"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      {editUserId === user._id ? (
                        <>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={async () => {
                              try {
                                const result = await dispatch(
                                  updateUser({
                                    id: user._id,
                                    updatedData: {
                                      role: editRole,
                                      active: editStatus === "active",
                                    },
                                  }),
                                );
                                if (updateUser.fulfilled.match(result)) {
                                  toast.success("User updated successfully!");
                                  setEditUserId(null);
                                } else {
                                  toast.error(
                                    result.error?.message ||
                                      "Failed to update user.",
                                  );
                                }
                              } catch (err) {
                                toast.error(
                                  err.message || "Failed to update user.",
                                );
                              }
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 ml-2"
                            onClick={() => setEditUserId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                          onClick={() => {
                            setEditUserId(user._id);
                            setEditRole(user.role);
                            setEditStatus(user.active ? "active" : "inactive");
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button className="flex items-center p-2 rounded-full hover:bg-gray-100">
                          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-full top-0 z-10 mt-0 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/admin/users/view/${user._id}`}
                                  onClick={() => setSelectedUser(user)}
                                  className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                                >
                                  View
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item disabled={true}>
                              {({ active, disabled }) => (
                                <button
                                  onClick={() => handleDelete(user._id)}
                                  disabled={disabled}
                                  title="Deletion is disabled for public testing"
                                  className={`block w-full text-left px-4 py-2 text-sm ${
                                    disabled
                                      ? "text-gray-400 cursor-not-allowed bg-gray-50"
                                      : active
                                        ? "bg-gray-100 text-red-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  Delete (Disabled)
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user._id} className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-between mt-3 items-center">
                <span className="text-sm capitalize">{user.role}</span>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex items-center p-2 rounded-full hover:bg-gray-100">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-full top-0 z-10 mt-0 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/admin/users/view/${user._id}`}
                            onClick={() => setSelectedUser(user)}
                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                          >
                            View
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setEditUserId(user._id);
                              setEditRole(user.role);
                              setEditStatus(
                                user.active ? "active" : "inactive",
                              );
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm text-yellow-600 ${active ? "bg-gray-100" : ""}`}
                          >
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item disabled={true}>
                        {({ active, disabled }) => (
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={disabled}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              disabled
                                ? "text-gray-400 cursor-not-allowed"
                                : active
                                  ? "bg-gray-100 text-red-600"
                                  : "text-red-600"
                            }`}
                          >
                            Delete (Disabled)
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
              {/* Inline edit form for mobile */}
              {editUserId === user._id && (
                <div className="mt-3 bg-gray-50 p-3 rounded-lg border">
                  <div className="mb-2">
                    <label className="block text-xs font-medium mb-1">
                      Role
                    </label>
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="border rounded px-2 py-1 bg-white w-full"
                    >
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      <option value="doctor">Doctor</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs font-medium mb-1">
                      Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="border rounded px-2 py-1 bg-white w-full"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 w-full"
                      onClick={async () => {
                        try {
                          const result = await dispatch(
                            updateUser({
                              id: user._id,
                              updatedData: {
                                role: editRole,
                                active: editStatus === "active",
                              },
                            }),
                          );
                          if (updateUser.fulfilled.match(result)) {
                            toast.success("User updated successfully!");
                            setEditUserId(null);
                          } else {
                            toast.error(
                              result.error?.message || "Failed to update user.",
                            );
                          }
                        } catch (err) {
                          toast.error(err.message || "Failed to update user.");
                        }
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 w-full"
                      onClick={() => setEditUserId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No users found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
