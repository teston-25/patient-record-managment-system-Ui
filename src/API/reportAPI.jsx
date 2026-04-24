import api from "../services/axios";

const reportsAPI = {
  // GET /reports/summary (admin, doctor, staff)
  getSummaryReport: async () => {
    const response = await api.get("/reports/summary");
    // console.log("[reportsAPI] getSummaryReport response:", response);
    return response.data;
  },

  getAppointmentsByDateRange: async (fromDate, toDate) => {
    const response = await api.get(
      `/reports/appointments-by-date?from=${fromDate}&to=${toDate}`,
    );
    return response.data.data;
  },

  // GET /reports/diagnoses (admin, doctor, staff)
  getFrequentDiagnoses: async () => {
    const response = await api.get("/reports/frequent-diagnoses");
    return response.data.data;
  },
};

export default reportsAPI;
