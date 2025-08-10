import {
  HomeIcon,
  BuildingStorefrontIcon,
  UserIcon,
  UserPlusIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  StarIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const sidebarMenus = {
  admin: [
    {
      name: "Dashboard",
      icon: <HomeIcon className="w-6 h-6" />,
      path: "/dashboard/admin",

    },
    {
      name: "Stores Management",
      icon: <BuildingStorefrontIcon className="w-6 h-6" />,
      path: "/dashboard/admin/stores",

    },
    {
      name: "Users Management",
      icon: <UserIcon className="w-6 h-6" />,
      path: "/dashboard/admin/users",

    },

  ],
  user: [

    {
      name: "Stores",
      icon: <BuildingStorefrontIcon className="w-6 h-6" />,
      path: "dashboard/user/stores",

    },
    {
      name: "My Ratings",
      icon: <StarIcon className="w-6 h-6" />,
      path: "dashboard/user/ratings",

    },

  ],
  store_owner: [
    {
      name: "Dashboard",
      icon: <HomeIcon className="w-6 h-6" />,
      path: "dashboard/owner",

    },
    {
      name: "Ratings",
      icon: <StarIcon className="w-6 h-6" />,
      path: "dashboard/owner/ratings",
    },

  ],
};
