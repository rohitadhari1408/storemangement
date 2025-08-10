import React, { useEffect, useState } from "react";
import DataTable from "../componets/table/tableComponet";
import { getStores, createStore } from "../services/StoreService";
import Modal from "../componets/ui/Modal";
import StoreForm from "../componets/forms/AddStoreForm";

const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

  // Table Columns
  const columns = [
    { accessorKey: "name", header: "Store Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "ownerName", header: "Owner" },
    {
      accessorKey: "averageRating",
      header: "Avg Rating",
      cell: ({ getValue }) => getValue()?.toFixed(1) ?? "0.0",
    },
  ];

  // Fetch stores
  const fetchStores = async () => {
    try {
      setLoading(true);
      const data = await getStores();
      console.log("Fetched stores:", data);
      const formattedData = data.map((store) => ({
        name: store.name,
        email: store.email,
        address: store.address,
        ownerName: store.ownerId?.name || "N/A",
        averageRating: store.averageRating,
      }));
      setStores(formattedData);
    } catch (err) {
      console.error("Error fetching stores:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Handle new store creation
  const handleCreateStore = async (formData) => {
    try {
      await createStore(formData);
      setIsAddStoreOpen(false);
      fetchStores(); // refresh list
    } catch (err) {
      console.error("Error creating store:", err);
    }
  };

  return (
    <>
      <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
        {/* Header and Add Store Button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold font-poppins text-gray-800">
            Store Management
          </h1>
          <button
            onClick={() => setIsAddStoreOpen(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            + Add Store
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
          <DataTable
            data={stores}
            columns={columns}
            isLoading={loading}
            isSearch={true}
            searchPlaceholder="Search stores..."
          />
        </div>

        {/* Add Store Modal */}
        <Modal
          open={isAddStoreOpen}
          handler={() => setIsAddStoreOpen(false)}
          title="Add New Store"
        >
          <StoreForm
            onSubmit={handleCreateStore}
            onCancel={() => setIsAddStoreOpen(false)}
            onSuccess={() => {
              setIsAddStoreOpen(false);
              fetchStores();
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default StoreManagement;
