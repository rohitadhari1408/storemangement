import React from "react";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import mtsslogo from "../../assets/store.png";

const AppLayout = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className=" p-4  max-w-(--breakpoint-2xl) md:p-5 bg-gray-50 h-screen flex flex-col gap-5 justify-between">
          <div className="container mx-auto">
            <Outlet />
          </div>

          <div className="flex items-center justify-center">
            <h1 className="text-xs md:text-sm font-poppins text-gray-800 flex items-center gap-1">
              {/* Designed & Developed by Mounarch Tech Solutions & Systems Pvt. Ltd. */}
              Designed & Developed by Rohit Adhari {new Date().getFullYear()}
              <img src={mtsslogo} alt="mtsslogo" className="size-10" />
            </h1>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AppLayout;
