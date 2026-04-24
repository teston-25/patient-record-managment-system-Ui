import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices, setFilter, markInvoiceAsPaid } from "./invoiceSlice";
import Spinner from "../../../components/common/Spinner";
import toast from "react-hot-toast";

const FILTERS = [
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "All", value: "all" },
];

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filter, markPaidError } = useSelector(
    (state) => state.invoices,
  );
  const invoices = Array.isArray(list) ? list : list?.data?.data || [];
  const [expanded, setExpanded] = useState(null);
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  // Filtering logic
  const filteredInvoices = invoices.filter((inv) => {
    if (filter === "pending") return inv.status === "pending";
    if (filter === "paid") return inv.status === "paid";
    return true; // all
  });

  const handleToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleMarkAsPaid = async (id) => {
    setMarkingId(id);
    try {
      const resultAction = await dispatch(markInvoiceAsPaid(id));
      if (markInvoiceAsPaid.fulfilled.match(resultAction)) {
        const payload = resultAction.payload;
        const msg = payload?.message || "bill paid successfully!";
        toast.success(msg);
      } else {
        toast.error(resultAction.payload || "Failed to mark as paid");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Invoices
        </h2>
        <button
          onClick={() => dispatch(fetchInvoices())}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
          aria-label="Refresh invoices"
        >
          Refresh
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => dispatch(setFilter(f.value))}
                className={`px-4 py-2 rounded-lg font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  filter === f.value
                    ? "bg-blue-500 text-white border-blue-500 shadow"
                    : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-600 font-medium text-center py-4">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Patient
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Total Amount
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => {
                    const isExpanded = expanded === inv._id;
                    return (
                      <React.Fragment key={inv._id}>
                        <tr className="hover:bg-blue-50 transition-colors">
                          <td className="px-4 py-2 text-gray-800">
                            {typeof inv.patient === "object"
                              ? `${inv.patient.firstName || ""} ${
                                  inv.patient.lastName || ""
                                }`.trim()
                              : inv.patient}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {inv.totalAmount}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                inv.status === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {inv.status.charAt(0).toUpperCase() +
                                inv.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {new Date(inv.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="text-blue-600 hover:underline mr-2"
                              onClick={() => handleToggle(inv._id)}
                            >
                              {isExpanded ? "Hide Details" : "Details"}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan={5} className="bg-blue-50">
                              <div className="p-4">
                                <div className="mb-2">
                                  <span className="font-semibold">
                                    Patient:
                                  </span>{" "}
                                  {typeof inv.patient === "object"
                                    ? `${inv.patient.firstName || ""} ${
                                        inv.patient.lastName || ""
                                      }`.trim()
                                    : inv.patient}
                                  {typeof inv.patient === "object" && (
                                    <>
                                      <div className="text-xs text-gray-600 ml-2">
                                        Email: {inv.patient.email}
                                      </div>
                                      <div className="text-xs text-gray-600 ml-2">
                                        Phone: {inv.patient.phone}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div className="mb-2">
                                  <span className="font-semibold">
                                    Services:
                                  </span>
                                  <ul className="list-disc ml-6">
                                    {Array.isArray(inv.services) &&
                                      inv.services.map((srv) => (
                                        <li key={srv._id}>
                                          {srv.name} - {srv.cost}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                                <div className="mb-2">
                                  <span className="font-semibold">
                                    Total Amount:
                                  </span>{" "}
                                  {inv.totalAmount}
                                </div>
                                <div className="mb-2">
                                  <span className="font-semibold">Status:</span>{" "}
                                  {inv.status}
                                </div>
                                <div className="mb-2">
                                  <span className="font-semibold">
                                    Issued By:
                                  </span>{" "}
                                  {typeof inv.issuedBy === "object" ? (
                                    <>
                                      {inv.issuedBy?.fullName && (
                                        <span>{inv.issuedBy.fullName}</span>
                                      )}
                                      {inv.issuedBy?.email && (
                                        <span className="text-xs text-gray-500 ml-2">
                                          ({inv.issuedBy.email})
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    inv.issuedBy
                                  )}
                                </div>
                                {inv.medicalHistory && (
                                  <div className="mb-2">
                                    <span className="font-semibold">
                                      Diagnosis:
                                    </span>{" "}
                                    {inv.medicalHistory.diagnosis}
                                    <br />
                                    <span className="font-semibold">
                                      Treatment:
                                    </span>{" "}
                                    {inv.medicalHistory.treatment}
                                  </div>
                                )}
                                <div className="mb-2">
                                  <span className="font-semibold">
                                    Created At:
                                  </span>{" "}
                                  {new Date(inv.createdAt).toLocaleString()}
                                </div>
                                <div className="mb-2">
                                  <span className="font-semibold">
                                    Updated At:
                                  </span>{" "}
                                  {new Date(inv.updatedAt).toLocaleString()}
                                </div>
                                {inv.status === "pending" && (
                                  <button
                                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                                    onClick={() => handleMarkAsPaid(inv._id)}
                                    disabled={markingId === inv._id}
                                  >
                                    {markingId === inv._id
                                      ? "Marking..."
                                      : "Mark as Paid"}
                                  </button>
                                )}
                                {markPaidError && (
                                  <div className="text-red-600 mt-2">
                                    {markPaidError}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
