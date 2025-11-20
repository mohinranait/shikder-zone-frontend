"use client";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import { useAppSelector } from "@/hooks/useRedux";
const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact-us" },
];

const Footer = () => {
  const { categories } = useAppSelector((state) => state.category);
  return (
    <>
      {/* Responsive Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <Logo bdClass="text-white" />
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Your trusted partner for fresh, organic produce delivered
                straight from local farms to your doorstep.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <div className="space-y-2">
                {links?.map((link) => (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link?.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Categories</h4>
              <div className="space-y-2">
                {categories?.slice(0, 4).map((category) => {
                  return (
                    <Link
                      key={category?._id}
                      href={`/shop?cat=${category?._id}`}
                      className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {category?.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-slate-100 d">Follow Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">Payment Methods</h4>
                <div className="flex space-x-2">
                  <div className="h-8 w-12 rounded bg-muted"></div>
                  <div className="h-8 w-12 rounded bg-muted"></div>
                  <div className="h-8 w-12 rounded bg-muted"></div>
                  <div className="h-8 w-12 rounded bg-muted"></div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-6 sm:mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 FreshMart. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-center"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-center"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
