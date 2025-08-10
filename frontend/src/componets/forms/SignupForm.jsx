import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { addUser } from "../../services/UserService";

const SignupForm = ({ onSuccess, onCancel }) => {
  const token = localStorage.getItem("token"); // Check if logged in
  const isLoggedIn = !!token;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: isLoggedIn ? "user" : "user", // default role
  });
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.address || !formData.password || !formData.role) {
      setError("All fields are required");
      return;
    }

    try {
      await addUser(formData);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">
        {isLoggedIn ? "Add User" : "Sign Up"}
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Enter name"
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Enter email"
      />
      <Input
        label="Address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        placeholder="Enter address"
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        placeholder="Enter password"
      />

      {/* Role Dropdown */}
      {isLoggedIn && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="user">User</option>

            <>
              <option value="store_owner">Store Owner</option>
              <option value="admin">Admin</option>
            </>

        </select>
      </div>
      )}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit">{isLoggedIn ? "Add User" : "Sign Up"}</Button>
      </div>
    </form>
  );
};

export default SignupForm;
