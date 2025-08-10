// 📁 client/components/forms/StoreForm.jsx
import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { createStore } from "../../services/StoreService";
import { getAllUsers } from "../../services/UserService";

const StoreForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const users = await getAllUsers();
        const storeOwners = users.filter((u) => u.role === "store_owner");
        setOwners(storeOwners);
      } catch (err) {
        console.error("Failed to fetch owners:", err);
      }
    };
    fetchOwners();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.address || !formData.ownerId) {
      setError("All fields are required");
      return;
    }

    try {
      await createStore(formData);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Input
        label="Store Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Enter store name"
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Enter store email"
      />
      <Input
        label="Address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        placeholder="Enter store address"
      />

      <div>
        <label className="block text-sm font-medium mb-1">Store Owner</label>
        <select
          value={formData.ownerId}
          onChange={(e) => handleChange("ownerId", e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Owner</option>
          {owners.map((owner) => (
            <option key={owner._id} value={owner._id}>
              {owner.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit">Add Store</Button>
      </div>
    </form>
  );
};

export default StoreForm;
