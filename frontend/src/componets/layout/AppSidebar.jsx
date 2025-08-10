import { useSidebar } from "../context/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/store.png";
import { sidebarMenus } from "../../utils/SidebarMenu"; // your role-based menu data

const AppSidebar = () => {
  const location = useLocation();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsMobileOpen } = useSidebar();

  const [navItems, setNavItems] = useState([]);

  // ✅ Load menu according to role
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const role = parsedUser?.role || "user"; // default to user if role missing
      setNavItems(sidebarMenus[role] || []);
    }
  }, []);

  const isActive = (path) => location.pathname.startsWith(path);

  const renderMenuItems = () => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={index}>
          <Link
            to={nav.path}
            className={`flex items-center gap-3 p-3 rounded-md transition-all duration-150 font-medium font-poppins capitalize cursor-pointer
              ${
                isActive(nav.path)
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-800 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
          >
            <span>{nav.icon}</span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="truncate">{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    if (isMobileOpen) {
      setTimeout(() => setIsMobileOpen(false), 100);
    }
  }, [location.pathname]);

  return (
   <>
   <aside
  className={`fixed top-0 left-0 z-50 h-screen
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-white
    border-r border-gray-200 dark:border-gray-800
    flex flex-col px-5
    mt-16 lg:mt-0
    transition-all duration-300 ease-in-out
    ${isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0`}
  onMouseEnter={() => !isExpanded && setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {/* Logo */}
  <div
    className={`py-4 flex items-center transition-all duration-300
      ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}
  >
    <Link to="/" className="flex items-center">
      {(isExpanded || isHovered || isMobileOpen) ? (
        <img
          className="dark:hidden size-16 hidden lg:block transition-transform duration-300 hover:scale-105"
          src={logo}
          alt="Logo"
        />
      ) : (
        <img
          src={logo}
          alt="Logo"
          className="size-12 transition-transform duration-300 hover:scale-105"
        />
      )}
    </Link>
  </div>

  {/* Navigation */}
  <nav className="flex-1 mt-4 space-y-2">{renderMenuItems()}</nav>
</aside>

   </>
  );
};

export default AppSidebar;
