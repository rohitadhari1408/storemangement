// import React from 'react'
// import AdminDashboard from "../pages/AdminDashboard";
// import StoresManagement from "../pages/StoreMangement";
// import UsersManagement from "../pages/UserMangement";

// import UserStores from "../pages/Userstore";
// import MyRatings from "../pages/MyRating";

// import OwnerDashboard from "../pages/OwnerDashborad";
// import OwnerRatings from "../pages/OwnerRating";

// import { Route, Routes } from "react-router-dom";
// const DashboardRoute = () => {
//   return (
//     <>
//     <div>
//       <Routes>
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/stores" element={<StoresManagement />} />
//         <Route path="/admin/users" element={<UsersManagement />} />

//         <Route path="/user/stores" element={<UserStores />} />
//         <Route path="/user/ratings" element={<MyRatings />} />

//         <Route path="/owner" element={<OwnerDashboard />} />
//         <Route path="/owner/ratings" element={<OwnerRatings />} />
//       </Routes>
//     </div>
//     </>
//   )
// }

// export default DashboardRoute

import React from "react";
import AdminDashboard from "../pages/AdminDashboard";
import StoresManagement from "../pages/StoreMangement";
import UsersManagement from "../pages/UserMangement";
import UserStores from "../pages/Userstore";
import MyRatings from "../pages/MyRating";
import OwnerDashboard from "../pages/OwnerDashborad";
import OwnerRatings from "../pages/OwnerRating";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../route/ProtectedRoute";

const DashboardRoute = () => {
  return (
    <div>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StoresManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UsersManagement />
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/stores"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserStores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/ratings"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyRatings />
            </ProtectedRoute>
          }
        />

        {/* Store Owner Routes */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={["store_owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/ratings"
          element={
            <ProtectedRoute allowedRoles={["store_owner"]}>
              <OwnerRatings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default DashboardRoute;
