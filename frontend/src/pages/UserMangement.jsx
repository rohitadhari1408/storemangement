import React, { useEffect, useState } from "react";
import DataTable from "../componets/table/tableComponet";
import { getAllUsers, addUser } from "../services/UserService";
import Modal from "../componets/ui/Modal"; // Adjust path if needed
import SignupForm from "../componets/forms/SignupForm";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  // Table Columns
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "role", header: "Role" }, // Added Role column
  ];

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open Add User Modal
  const handleAddUser = () => {
    setNewUser({ name: "", email: "", address: "", password: "", role: "" });
    setError("");
    setIsAddModalOpen(true);
  };

  return (
    <>
      <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
        {/* Header and Add User Button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold font-poppins text-gray-800">
            User Management
          </h1>
          <button
            onClick={handleAddUser}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            + Add User
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
          <DataTable
            data={users}
            columns={columns}
            isLoading={loading}
            isSearch={true}
            searchPlaceholder="Search users..."
          />
        </div>

        {/* Add User Modal */}
        <Modal
          open={isAddModalOpen}
          handler={() => setIsAddModalOpen(false)}
          title="Add New User"
        >
          <SignupForm
            onSuccess={() => {
              setIsAddModalOpen(false);
              fetchUsers();
            }}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>
      </div>
    </>
  );
};

export default UserManagement;
