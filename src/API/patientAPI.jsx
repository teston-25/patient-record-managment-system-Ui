import api from "../services/axios";

const patientAPI = {
  // GET /patient (admin, staff)
  getAllPatients: async () => {
    const response = await api.get("/patient");
    return response.data;
  },

  // POST /patient (admin, staff)
  addPatient: async (patientData) => {
    const response = await api.post("/patient", patientData);
    return response.data.data.patient;
  },

  // GET /patient/:id (admin, staff, doctor, user)
  singlePatient: async (id) => {
    const response = await api.get(`/patient/${id}`);
    console.log(response.data);
    return response.data;
  },

  // PATCH /patient/:id (admin, staff)
  updatePatient: async (id, updatedData) => {
    const response = await api.patch(`/patient/${id}`, updatedData);
    return response.data.data.patient;
  },

  // DELETE /patient/:id (admin, staff)
  deletePatient: async (id) => {
    const response = await api.delete(`/patient/${id}`);
    return response.data;
  },

  // GET /patient/patients/search?q=term  (admin, staff)
  searchPatient: async (searchedPatient) => {
    const response = await api.get(`/patient/search?q=${searchedPatient}`);
    return response.data;
  },
};

export default patientAPI;
