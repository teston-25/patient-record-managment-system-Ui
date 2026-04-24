import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHistory,
  createHistory,
  editHistory,
  removeHistory,
  clearHistoryState,
} from "./historySlice";
import toast from "react-hot-toast";
import DoctorInvoiceForm from "../../doctor/invoice/DoctorInvoiceForm";

const initialForm = {
  diagnosis: "",
  treatment: "",
  medications: "",
  date: "",
  reason: "",
};

// Accepts either patient (object) or patientId (string)
const MedicalHistoryModal = ({ patient, patientId, onClose }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.history);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceContext, setInvoiceContext] = useState({
    patient: null,
    medicalHistory: null,
  });

  // Determine patientId to use
  const effectivePatientId = patient?._id || patientId;

  useEffect(() => {
    if (effectivePatientId) {
      dispatch(fetchHistory(effectivePatientId));
    }
    return () => {
      dispatch(clearHistoryState());
    };
  }, [dispatch, effectivePatientId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicationsChange = (e) => {
    setForm((prev) => ({ ...prev, medications: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      medications: form.medications
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
    };
    if (editId) {
      dispatch(editHistory({ historyId: editId, data })).then((res) => {
        if (!res.error) {
          toast.success("Medical history updated successfully");
          setShowForm(false);
          setEditId(null);
          setForm(initialForm);
        } else {
          toast.error(res.error.message || "Failed to update entry");
        }
      });
    } else {
      dispatch(createHistory({ patientId: effectivePatientId, data })).then(
        (res) => {
          if (!res.error) {
            toast.success("Medical history added successfully");
            setShowForm(false);
            setForm(initialForm);
          } else {
            toast.error(res.error.message || "Failed to add entry");
          }
        },
      );
    }
  };

  const handleEdit = (entry) => {
    setEditId(entry._id);
    setForm({
      diagnosis: entry.diagnosis || "",
      treatment: entry.treatment || "",
      medications: (entry.medications || []).join(", "),
      date: entry.date ? entry.date.slice(0, 10) : "",
      reason: entry.reason || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this medical history entry?",
    );

    if (!isConfirmed) return;

    setDeleteId(id);

    dispatch(removeHistory({ historyId: id })).then((res) => {
      setDeleteId(null);

      if (!res.error) {
        toast.success("Medical history deleted successfully");
      } else {
        toast.error(res.error.message || "Failed to delete entry");
      }
    });
  };

  const handleAddNew = () => {
    setEditId(null);
    setForm(initialForm);
    setShowForm(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-0 border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-in-left">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Medical History
              </h2>
              {patient?.firstName || patient?.lastName ? (
                <p className="text-gray-500 text-sm">
                  Patient:{" "}
                  <span className="font-semibold text-gray-700">
                    {patient.firstName} {patient.lastName}
                  </span>
                </p>
              ) : null}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold px-3 py-1 rounded"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 bg-white rounded-b-2xl">
            {loading && <div className="text-center py-4">Loading...</div>}

            {/* List of history entries */}
            {!loading && !showForm && (
              <>
                <button
                  onClick={handleAddNew}
                  className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Add New Entry
                </button>
                {list.length === 0 ? (
                  <div className="text-gray-400 text-center">
                    No medical history found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {list.map((entry) => (
                      <div
                        key={entry._id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-gray-100 rounded-xl p-4 bg-gray-50"
                      >
                        <div>
                          <div className="font-semibold text-lg text-gray-800">
                            {entry.diagnosis}
                          </div>
                          <div className="text-sm text-gray-600">
                            {entry.treatment}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Medications:{" "}
                            {entry.medications?.join(", ") || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            Date:{" "}
                            {entry.date
                              ? new Date(entry.date).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg text-sm w-full xs:w-auto"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(entry._id)}
                            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm border border-red-200 w-full xs:w-auto"
                            disabled={deleteId === entry._id}
                          >
                            {deleteId === entry._id ? "Deleting..." : "Delete"}
                          </button>
                          <button
                            onClick={() => {
                              setInvoiceContext({
                                patient: effectivePatientId,
                                medicalHistory: entry._id,
                              });
                              setShowInvoiceForm(true);
                            }}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm w-full xs:w-auto"
                          >
                            Generate Invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Add/Edit Form */}
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-4 border border-gray-100"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  {editId ? "Edit Entry" : "Add Medical History"}
                </h3>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={form.diagnosis}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2 border-gray-300"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Treatment
                  </label>
                  <input
                    type="text"
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2 border-gray-300"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Medications (comma separated)
                  </label>
                  <input
                    type="text"
                    name="medications"
                    value={form.medications}
                    onChange={handleMedicationsChange}
                    className="w-full border rounded p-2 border-gray-300"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2 border-gray-300"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : editId ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                    onClick={() => {
                      setShowForm(false);
                      setEditId(null);
                      setForm(initialForm);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Invoice Form Modal */}
      {showInvoiceForm && (
        <DoctorInvoiceForm
          patientId={invoiceContext.patient}
          medicalHistoryId={invoiceContext.medicalHistory}
          onClose={() => setShowInvoiceForm(false)}
        />
      )}
    </div>
  );
};

export default MedicalHistoryModal;
