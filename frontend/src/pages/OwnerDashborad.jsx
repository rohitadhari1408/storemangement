import React, { useEffect, useState } from "react";
import DataTable from "../componets/table/tableComponet";
import { getAllRatings } from "../services/RatingServices";
import { getAllUsers } from "../services/UserService";

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnerRatings = async () => {
    try {
      setLoading(true);

      // Fetch ratings and users in parallel
      const [ratingData, userData] = await Promise.all([
        getAllRatings(),
        getAllUsers(),
      ]);

      // Merge user details into ratings
      const mergedData = ratingData.map((rating) => {
        const user = userData.find((u) => u._id === rating.userId);
        return {
          ...rating,
          userName: user ? user.name : "Unknown User",
          userEmail: user ? user.email : "N/A",
        };
      });

      setRatings(mergedData);
    } catch (error) {
      console.error("Error fetching owner ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerRatings();
  }, []);

  const columns = [
    { header: "User Name", accessorKey: "userName" },
    { header: "User Email", accessorKey: "userEmail" },
    { header: "Rating", accessorKey: "rating" },
  ];

  return (
   <>
   <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
     <h2 className="text-2xl font-bold mb-4">Users </h2>

     <DataTable
       data={ratings}
       columns={columns}
       isLoading={loading}
       isSearch={true}
       searchPlaceholder="Search users..."
     />
   </div>
   </>
  );
};

export default OwnerDashboard;
