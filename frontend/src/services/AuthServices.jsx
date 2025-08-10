import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const login = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
  return data; // { token, user }
};

export const updatePassword = async (userId, newPassword) => {
    const token = localStorage.getItem("token");
  const { data } = await axios.put(`${API_URL}/auth/update-password`,  { id: userId, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return data; // { message }
};
