import axios from "axios";

const API_BASE = "http://localhost:5000";
const API_URL = `${API_BASE}/api/companies`;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Fetch companies with full filtering & sorting support
export const getCompanies = async (params = {}) => {
  // params can include:
  // { search, industry, location, size, sortBy, minRating, maxRating, page, limit }
  try {
    const response = await api.get("/api/companies", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export default api;
