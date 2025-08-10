// src/services/storeService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all stores
export const getStores = async () => {
  const { data } = await axios.get(`${API_URL}/stores/`, getAuthHeaders());
  return data; // [{...store}]
};

// Fetch single store by ID
export const getStoreById = async (id) => {
  const { data } = await axios.get(`${API_URL}/stores/${id}`, getAuthHeaders());
  return data; // {...store}
};

// Create a new store
export const createStore = async (storeData) => {
  const { data } = await axios.post(
    `${API_URL}/stores/`,
    storeData,
    getAuthHeaders()
  );
  return data; // { message, store }
};

// Update an existing store
export const updateStore = async (id, storeData) => {
  const { data } = await axios.put(
    `${API_URL}/stores/${id}`,
    storeData,
    getAuthHeaders()
  );
  return data; // { message, store }
};

// Delete a store
export const deleteStore = async (id) => {
  const { data } = await axios.delete(
    `${API_URL}/stores/${id}`,
    getAuthHeaders()
  );
  return data; // { message }
};
