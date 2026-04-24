import api from "../services/axios";

const invoiceAPI = {
  // GET /invoices (admin, staff, doctor, user - filtered by role)
  getInvoices: async () => {
    try {
      const response = await api.get("/invoices");
      return response.data.data;
    } catch (err) {
      console.error('Error fetching invoices:', err, err.response?.data);
      throw err;
    }
  },

  // POST /invoices (doctor only)
  createInvoice: async (invoiceData) => {
    const response = await api.post("/invoices", {
      patient: invoiceData.patient,
      medicalHistory: invoiceData.medicalHistory,
      services: invoiceData.services,
      totalAmount: invoiceData.totalAmount,
    });
    return response.data.data;
  },

  // PATCH /invoices/:id/pay (admin, staff only)
  markInvoiceAsPaid: async (invoiceId) => {
    const response = await api.patch(`/invoices/${invoiceId}/pay`);
    console.log("response", response.data.data);
    return response.data.data;
  },

  // GET /invoices/patient/:patientId (admin, staff, doctor, user - if owner)
  getPatientInvoices: async (patientId) => {
    const response = await api.get(`/invoices/patient/${patientId}`);
    return response.data.data;
  },

  // GET /invoices/:id (admin, staff, doctor, user - if owner)
  getInvoiceById: async (invoiceId) => {
    const response = await api.get(`/invoices/${invoiceId}`);
    return response.data.data;
  },
};

export default invoiceAPI;
