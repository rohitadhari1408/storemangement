import React, { useEffect, useState } from "react";
import DataTable from "../componets/table/tableComponet";
import Modal from "../componets/ui/Modal";
import { getStores } from "../services/StoreService";
import RatingForm from "../componets/forms/RatingForm";
import { getAllRatings } from "../services/RatingServices";

const UserStore = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const fetchStoresAndRatings = async () => {
    try {
      setLoading(true);

      // Fetch stores and ratings in parallel
      const [storeData, ratingData] = await Promise.all([
        getStores(),
        getAllRatings()
      ]);

      // Merge ratings into store list
      const mergedData = storeData.map(store => {
        const userRating = ratingData.find(r => r.storeId === store._id);
        return {
          ...store,
          userRating: userRating ? userRating.rating : null,
          ratingId: userRating ? userRating._id : null
        };
      });

      setStores(mergedData);
    } catch (error) {
      console.error("Error fetching stores/ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoresAndRatings();
  }, []);

  const openRatingModal = (store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const closeModalAndRefresh = () => {
    setIsModalOpen(false);
    fetchStoresAndRatings();
  };

  const columns = [
    { header: "Store Name", accessorKey: "name" },
    {
      header: "Your Rating",
      accessorKey: "userRating",
      cell: ({ row }) =>
        row.original.userRating ? (
          <span>{row.original.userRating}</span>
        ) : (
          <span className="text-gray-400 italic">No rating yet</span>
        ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => openRatingModal(row.original)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {row.original.userRating ? "Update" : "Submit"}
        </button>
      ),
    },
  ];

  return (
   <>
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Store Ratings</h2>

      <DataTable
        data={stores}
        columns={columns}
        isLoading={loading}
        isSearch={true}
        searchPlaceholder="Search stores..."
      />

      <Modal
        open={isModalOpen}
        handler={() => setIsModalOpen(false)}
        title={selectedStore?.userRating ? "Update Rating" : "Submit Rating"}
      >
        {selectedStore && (
          <RatingForm
            initialData={{
              _id: selectedStore.ratingId || null,
              storeId: selectedStore._id,
              rating: selectedStore.userRating || "",
            }}
            onCancel={closeModalAndRefresh}
          />
        )}
      </Modal>
    </div>
   </>
  );
};

export default UserStore;
