import api from "../services/axios";

// Fetch all medical history entries for a patient
export const getMedicalHistory = (patientId) =>
  api.get(`/history/${patientId}`);

// Add a new medical history entry for a patient
export const addMedicalHistory = (patientId, data) =>
  api.post(`/history/${patientId}`, data);

// Update a specific medical history entry
export const updateMedicalHistory = (historyId, data) =>
  api.patch(`/history/${historyId}`, data);

// Delete a specific medical history entry
export const deleteMedicalHistory = (historyId) =>
  api.delete(`/history/${historyId}`);
