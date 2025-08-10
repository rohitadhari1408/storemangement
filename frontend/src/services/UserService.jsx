import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get all users
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // returns array of users
};

// Add new user
export const addUser = async (userData) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(`${API_URL}/auth/register`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // returns created user object
};
