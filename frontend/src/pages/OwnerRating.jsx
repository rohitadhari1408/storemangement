import React, { useEffect, useState } from "react";
import { getAllRatings } from "../services/RatingServices";
import { getStores } from "../services/StoreService";

const OwnerRating = () => {
  const [avgRating, setAvgRating] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAverageRating = async () => {
    try {
      setLoading(true);

      // Fetch ratings and stores together
      const [ratings, stores] = await Promise.all([
        getAllRatings(),
        getStores(),
      ]);

      // For now: pick first store (or filter by owner later)
      const store = stores.length > 0 ? stores[0] : null;
      if (store) {
        setStoreName(store.name || "Unknown Store");
        setStoreAddress(store.address || "No address available");
      }

      if (ratings.length > 0) {
        const total = ratings.reduce((sum, r) => sum + Number(r.rating), 0);
        const average = total / ratings.length;
        setAvgRating(average.toFixed(1));
      } else {
        setAvgRating(0);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAverageRating();
  }, []);

  return (
    <>

     <div className="p-6 space-y-6 bg-white rounded-xl shadow-md">
        {/* Header and Add Store Button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold font-poppins text-gray-800">
            Average Store Rating
          </h1>
          </div>



    <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="bg-white shadow-xl rounded-2xl p-10 w-[28rem] text-center border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-800">{storeName}</h2>
    <p className="text-base text-gray-500 mt-2">{storeAddress}</p>

    {loading ? (
      <p className="text-gray-400 mt-6 text-lg">Loading...</p>
    ) : (
      <p className="text-5xl font-extrabold text-yellow-500 mt-6">
        ⭐ {avgRating}
      </p>
    )}
  </div>
</div>


      </div>

    </>
  );
};

export default OwnerRating;
