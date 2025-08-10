/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/store.png";
import Cookies from "js-cookie";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import UpdatePasswordForm from "../forms/UpdatePasswordForm"; // Adjust path if needed

const AppHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const userCookie = Cookies.get("user");
  const userData = userCookie ? JSON.parse(userCookie) : null;
  const name = userData?.name || "N/A";
  const contact = userData?.contact || "N/A";


  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("isLoggedIn");
    localStorage.clear();
    navigate("/Login");
  };

  // Password form state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

//  const handlePasswordUpdate = async () => {
//   // const userId = localStorage.getItem("id");
//   //  // assuming you stored the ID as "id"
//   const userId = JSON.parse(localStorage.getItem("user"))?._id;
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // from .env

//   if (!userId) {
//     alert("User ID not found. Please log in again.");
//     return;
//   }

//   if (!newPassword.trim() || !confirmPassword.trim()) {
//   alert("Please fill in all fields");
//   return;
// }

//   if (newPassword !== confirmPassword) {
//     alert("New passwords do not match");
//     return;
//   }

//  try {
//     const res = await updatePassword(userId, newPassword);
//     alert(res.message || "Password updated successfully!");
//     setIsPasswordModalOpen(false);
//     setNewPassword("");
//     setConfirmPassword("");
//   } catch (err) {
//     alert(err.response?.data?.message || "Failed to update password");
//   }
// };


  return (
    <>
 <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-50 shadow-sm">
  <div className="flex items-center justify-between w-full px-3 lg:px-5">

    {/* Left side: Sidebar Toggle & Logo */}
    <div className="flex items-center gap-2 py-3">
      <button
        className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-400 dark:hover:bg-gray-700 transition"
        onClick={handleToggle}
        aria-label="Toggle Sidebar"
      >
        <svg
          className="size-5 text-gray-700 dark:text-gray-300"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H15M1 6H15M1 11H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <Link to="/" className="lg:hidden">
        <img className="dark:hidden size-12" src={logo} alt="Logo" />
      </Link>
    </div>

    {/* Right side: Profile Dropdown */}
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md transition"
      >
        <UserIcon className="size-5" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <button
            onClick={() => {
              setIsPasswordModalOpen(true);
              setIsDropdownOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Update Password
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
</header>

{/* Update Password Modal */}
<Modal
  open={isPasswordModalOpen}
  handler={() => setIsPasswordModalOpen(false)}
  title="Update Password"
  size="sm"
>
  <UpdatePasswordForm
    userId={userData?._id}
    onSuccess={() => {
      setIsPasswordModalOpen(false);
      // Optional: show success toast
    }}
    onCancel={() => setIsPasswordModalOpen(false)}
  />
</Modal>


</>
  );
};

export default AppHeader;
