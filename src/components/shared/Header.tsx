"use client";
import {
  ChevronDown,
  Globe2,
  Heart,
  LayoutDashboard,
  List,
  LogOut,
  Search,
  ShoppingCart,
  Truck,
  UserRound,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logoutUser } from "@/redux/features/authSlice";
import { userLogout } from "@/actions/authApi";
import HeaderBrowsCategory from "../utils/HeaderBrowsCategory";
import { setCartSidebarOpen } from "@/redux/features/uiSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useTotalCartPrice from "@/hooks/useTotalCartPrice";
import { currency } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Offers", href: "/offers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact-us" },
];

const Header = () => {
  // Redux state
  const { carts, totalShipping, totalTax } = useAppSelector(
    (state) => state.cart
  );
  const totalCartPrice = useTotalCartPrice();
  const { favorites } = useAppSelector((state) => state.favorite);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 140);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // handle logout
  const handleLogout = async () => {
    try {
      await userLogout();
      dispatch(logoutUser());
    } catch (error) {
      console.log({ error });
    }
  };

  // handle search
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.push(`/shop?${params.toString()}`);
  }, [search, searchParams, router]);

  useEffect(() => {
    setOpenCategory(false);
  }, [pathName]);
  return (
    <div className="bg-white">
      {/* Top Bar */}
      <div className="bg-white border-b text-main py-2 px-4">
        <div className="container mx-auto flex   items-center text-xs sm:text-sm gap-2 sm:gap-0">
          <div className="flex flex-col sm:pr-10 sm:flex-row items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex  items-center gap-2">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-center text-nowrap sm:text-left">
                Free delivery
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Globe2 className="w-4 h-4" />
              <span className="text-nowrap">Returns Policy</span>
            </div>
          </div>
          <Marquee pauseOnHover={true} className="">
            <ul className="flex gap-6 whitespace-nowrap text-main list-disc list-inside">
              <li>ফ্রি ডেলিভারি — ৩,৫০০ টাকা অর্ডারে।</li>
              <li>নতুন কালেকশন এসেছে — পুরুষ/নারী/বাচ্চাদের ফ্যাশন দেখুন।</li>
              <li>কাস্টমার কেয়ার: ০১৭৩৩৩৪৩৩৩৩ (সকাল ৯টা–রাত ৯টা)।</li>
            </ul>
            <div className="w-32 lg:w-40"></div>
          </Marquee>
        </div>
      </div>

      <header
        className={cn(
          "",
          isScrolled &&
            "fixed top-0 left-0 right-0 z-30  transition-all duration-300 shadow-sm"
        )}
      >
        {/* Middle row */}
        <div className="border-b bg-white border-gray-100 shadow-lg">
          <div
            className={cn(
              "px-2 md:px-0 container justify-between h-[60px]  md:h-[80px] flex items-center ",
              isScrolled && "md:h-[60px]"
            )}
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              {isScrolled && (
                <div className="relative group ">
                  <Button type="button" className="hidden xl:flex">
                    <List size={20} className="text-white" />
                  </Button>
                  <div className="absolute w-[280px] top-full left-0 hidden group-hover:block  transition-all duration-200">
                    <HeaderBrowsCategory />
                  </div>
                </div>
              )}
              <Logo />
            </div>

            {/* Middle column */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              {/* Desktop Search */}
              <div className="relative w-full">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 py-[12px] h-auto  rounded border-2  border-gray-200   focus-visible:border-main   transition-all duration-200 text-base pr-20"
                />
                <Button
                  size="sm"
                  type="button"
                  onClick={handleSearch}
                  className="absolute  py-6 h-auto right-0 top-2/4 -translate-y-2/4 bottom-1 px-6 rounded !rounded-l-none bg-main hover:bg-main shadow-md"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <ul className="flex items-center gap-4">
                <li className=" md:hidden rounded-full h-10 w-10 inline-flex items-center justify-center relative">
                  <button
                    type="button"
                    onClick={() => setMobileSearch((prev) => !prev)}
                    className="w-10 cursor-pointer h-10 relative flex items-center justify-center rounded-full "
                  >
                    <Search size={24} className="text-gray-600" />
                  </button>
                </li>

                <li className="hidden  rounded-full h-10 w-10 md:inline-flex items-center justify-center relative">
                  <Link href={"/dashboard/favorites"}>
                    <Heart size={24} className="text-gray-600" />
                    <span className="px-1 text-xs font-semibold text-white rounded-full h-5 w-5 flex items-center justify-center bg-main absolute -top-1 -right-1">
                      {favorites?.length > 9 ? "9+" : favorites?.length}
                    </span>
                  </Link>
                </li>

                {/* Cart Button */}
                <li className="hidden md:block relative">
                  <button
                    onClick={() => dispatch(setCartSidebarOpen(true))}
                    className="flex items-center gap-1 sm:gap-2 relative "
                  >
                    <ShoppingCart className="size-6 text-gray-600" />
                    <div className="flex flex-col ">
                      <span className="hidden text-xs text-left sm:inline text-black font-medium">
                        Shopping Cart
                      </span>
                      <span className="hidden text-left text-[10px] sm:inline text-gray-600 font-medium">
                        Total: {currency}
                        {(totalCartPrice + totalTax + totalShipping).toFixed(2)}
                      </span>
                    </div>
                    <span className="absolute -top-2 left-1.5 text-white text-xs h-5 w-5 flex items-center justify-center bg-red-500 rounded-full ml-1">
                      {carts?.length > 9 ? "9+" : carts?.length}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* Mobile search */}
          {mobileSearch && (
            <div className="container pb-3 px-2 md:px-0  lg:hidden mt-3">
              <div className="relative">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-2 h-auto text-sm rounded-md border-2 border-gray-200  outline-none focus-visible:border-main  focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 transition-all duration-200"
                />
                <Button
                  onClick={handleSearch}
                  type="button"
                  size="sm"
                  className="absolute right-0 top-2/4 -translate-y-2/4 bottom-1 px-5 h-auto py-5 text-xs rounded-l-none bg-gradient-to-r from-main to-main-light hover:from-main hover:to-main-light shadow-md"
                >
                  {/* <Search className="w-4 h-4" /> */}
                  Search
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Bottom Row */}
      <div className="hidden bg-main md:block border-b border-gray-200">
        <div className="container  gap-4 flex ">
          <div className="w-[280px]  relative flex items-center    gap-3">
            <Button
              onClick={() => {
                setOpenCategory(!openCategory);
              }}
              className="flex justify-between hover:bg-[#e03703] gap-3 px-4 py-3 rounded-none bg-[#e03703]  cursor-pointer w-full h-full items-center"
            >
              <div className="flex gap-2 items-center">
                <List size={20} className="text-white" />

                <p className="uppercase text-sm text-white font-semibold">
                  All Categories
                </p>
              </div>
              <div>
                <ChevronDown size={16} className="text-white" />
              </div>
            </Button>
            {openCategory && (
              <div className="w-[280px] z-[4] bg-white absolute top-[calc(100%+1px)] left-0  ">
                <div className="border border-border border-t-0 max-h-[400px]  rounded rounded-t-none ">
                  <HeaderBrowsCategory />
                </div>
              </div>
            )}
          </div>
          <div className="flex-grow pl-2 flex justify-between items-center">
            <div className="flex items-center gap-6">
              {links?.map((link, index) => {
                return (
                  <Link
                    key={index}
                    href={link?.href}
                    className={cn(
                      "text-white   hover:text-white font-medium transition-colors",
                      pathName === link.href &&
                        "text-white underline underline-offset-4"
                    )}
                  >
                    {link?.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex text-white items-center gap-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <li className=" hidden    md:inline-flex items-center gap-1 justify-center relative">
                      <UserRound size={16} className="text-white" />
                      <p>
                        {user?.name?.firstName} {user?.name?.lastName}
                      </p>
                    </li>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <>
                      <Link href={"/dashboard"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <LayoutDashboard /> Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/dashboard/profile"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <UserRound /> Profile
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/dashboard/orders"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <WalletCards /> All Orders
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleLogout()}
                      >
                        <LogOut />
                        Logout
                      </DropdownMenuItem>
                    </>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex text-white items-center gap-0.5  ">
                  <UserRound className="size-4" />
                  <Link href={`/login?redirectTo=${pathName}`}>
                    Login
                  </Link> /{" "}
                  <Link href={`/register?redirectTo=${pathName}`}>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
