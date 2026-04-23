import api from "../services/axios";

const auditLogAPI = {
  getAuditLogs: async (page, limit) => {
    try {
      const response = await api.get(`/audit-logs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      throw error;
    }
  },
};
export default auditLogAPI;
