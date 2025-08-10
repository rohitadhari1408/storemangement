import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { submitRating, updateRating } from "../../services/RatingServices";

const RatingForm = ({ initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    storeId: "",
    rating: "",
  });

  const [error, setError] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        storeId: initialData.storeId || "",
        rating: initialData.rating || "",
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.storeId || !formData.rating) {
      setError("Store and rating are required");
      return;
    }

    try {
      if (initialData && initialData._id) {
        // Update existing rating
        await updateRating(initialData._id, formData.rating);
      } else {
        // Submit new rating
        await submitRating(formData.storeId, formData.rating);
      }

      if (onCancel) onCancel(); // close modal or form after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save rating");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!initialData.storeId && (
        <Input
          label="Store ID"
          value={formData.storeId}
          onChange={(e) => handleChange("storeId", e.target.value)}
          placeholder="Enter store ID"
        />
      )}

      <Input
        label="Rating (1-5)"
        type="number"
        min={1}
        max={5}
        value={formData.rating}
        onChange={(e) => handleChange("rating", e.target.value)}
        placeholder="Enter rating"
      />

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData && initialData._id ? "Update Rating" : "Submit Rating"}
        </Button>
      </div>
    </form>
  );
};

export default RatingForm;
