import React, { useEffect, useState } from "react";
import DataTable from "../componets/table/tableComponet";
import { getAllRatings } from "../services/RatingServices";
import { getStores } from "../services/StoreService";

const MyRating = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
const currentUserId = user._id;// replace with actual logged-in user ID

  const fetchMyRatings = async () => {
    try {
      setLoading(true);

      const [allRatings, allStores] = await Promise.all([
        getAllRatings(),
        getStores(),
      ]);

      console.log("All Ratings:", allRatings);
      console.log("All Stores:", allStores);

      // Filter ratings for current user
      const myRatings = allRatings.filter(
        (r) => r.userId === currentUserId
      );

      // Merge store details
      const mergedData = myRatings.map((rating) => {
        const store = allStores.find((s) => s._id === rating.storeId);
        return {
          ...rating,
          storeName: store?.name || "Unknown Store",
          storeAddress: store?.address || "No address available",
        };
      });

      setRatings(mergedData);
    } catch (error) {
      console.error("Error fetching my ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRatings();
  }, []);

  const columns = [
    { header: "Store Name", accessorKey: "storeName" },
    { header: "Address", accessorKey: "storeAddress" },
    { header: "Rating", accessorKey: "rating" },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];

  return (
   <>
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Ratings</h2>
      <DataTable
        data={ratings}
        columns={columns}
        isLoading={loading}
        isSearch={true}
        searchPlaceholder="Search your ratings..."
      />
    </div>
   </>
  );
};

export default MyRating;
