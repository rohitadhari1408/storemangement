// src/services/RatingService.js
import axios from "axios";
 // your existing auth header helper

// const API_URL = "http://localhost:5000/api"; // adjust if needed
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
// Submit or update a rating for a store
export const submitRating = async (storeId, rating) => {
  const { data } = await axios.post(
    `${API_URL}/ratings/`,
    { storeId, rating },
    getAuthHeaders()
  );
  return data; // returns the saved/updated rating object
};

// Get all ratings (admin or for analysis)
export const getAllRatings = async () => {
  const { data } = await axios.get(`${API_URL}/ratings/`);
  return data; // returns array of ratings
};

// ...existing code...

// Update a rating by ratingId
export const updateRating = async (ratingId, rating) => {
  const { data } = await axios.put(
    `${API_URL}/ratings/${ratingId}`,
    { rating }
  );
  return data; // returns the updated rating object
};

// ...existing code...
