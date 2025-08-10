import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/UserService";
import { getStores } from "../services/StoreService";
import { getAllRatings } from "../services/RatingServices"; // create if not exists

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        const stores = await getStores();
        const ratings = await getAllRatings();

        setStats({
          totalUsers: users.length,
          totalStores: stores.length,
          totalRatings: ratings.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchData();
  }, []);

  const cardStyle =
    "bg-white shadow-md rounded-lg p-6 text-center border border-gray-200";

  return (
   <>
   <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
  <h1 className="text-2xl font-bold mb-6 font-poppins">Admin Dashboard</h1>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {/* Total Users */}
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
      <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
    </div>

    {/* Total Stores */}
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold text-gray-600">Total Stores</h2>
      <p className="text-3xl font-bold text-green-600">{stats.totalStores}</p>
    </div>

    {/* Total Ratings */}
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold text-gray-600">Total Ratings</h2>
      <p className="text-3xl font-bold text-yellow-600">{stats.totalRatings}</p>
    </div>
  </div>
</div>

   </>
  );
};

export default AdminDashboard;
