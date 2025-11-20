"use client";
import withAuth from "@/hoc/withAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  Heart,
  LogOut,
  LucideLayoutDashboard,
  MapPin,
  User2,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { userLogout } from "@/actions/authApi";
import { logoutUser } from "@/redux/features/authSlice";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await userLogout();
      dispatch(logoutUser());
    } catch (error) {
      console.log({ error });
    }
  };

  // Navigation items
  const navLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LucideLayoutDashboard,
    },
    {
      label: "My Orders",
      href: "/dashboard/orders",
      icon: WalletCards,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User2,
    },
    {
      label: "Address",
      href: "/dashboard/address",
      icon: MapPin,
    },
    {
      label: "Favorite Products",
      href: "/dashboard/favorites",
      icon: Heart,
    },
  ];

  return (
    <div>
      <div className="container grid grid-cols-1 lg:grid-cols-[300px_auto] py-10">
        {/* Sidebar */}
        <div className="p-4 mb-4 lg:mb-0 bg-white rounded-md">
          {/* User info */}
          <div className="flex pb-4 gap-3">
            <div className="w-10">
              <Avatar className="w-10 h-10 ring-1 ring-main ring-offset-1">
                <AvatarImage src={user?.profile} alt="Profile" />
                <AvatarFallback className="text-lg uppercase">
                  {user?.name?.firstName?.[0]}
                  {user?.name?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-gray-800 font-semibold leading-[18px]">
                {user?.name?.firstName} {user?.name?.lastName}
              </p>
              <p className="text-gray-400 text-sm leading-[16px]">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <ul>
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${
                    path === href && "bg-gray-100 text-gray-700"
                  } inline-flex px-3 gap-2 text-gray-500 hover:text-gray-700 items-center hover:bg-gray-100 rounded w-full py-2`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            ))}

            {/* Logout button */}
            <li>
              <Button
                type="button"
                variant={"destructive"}
                onClick={handleLogout}
                className="inline-flex px-3 gap-2  items-center  rounded w-full py-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default withAuth(ProfileLayout);
