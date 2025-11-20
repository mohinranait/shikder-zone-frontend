"use client";
import React, { FC } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import ShopFilterSection from "../pages/shop/ShopFilterSection";

type Props = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
const ShopFilterSheet: FC<Props> = ({ open, setOpen }) => {
  return (
    <Sheet onOpenChange={setOpen} open={open} key={"right"}>
      <SheetTrigger>
        <li className="py-3 inline-flex items-center justify-center flex-col px-2">
          <Filter size={16} className="text-gray-500" />
          <p className="text-xs text-gray-500">Filter</p>
        </li>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-full md:hidden px-0 py-0 res4:w-[300px]"
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="h-[50px]  px-3 flex gap-1 items-center bg-gray-200">
              <Filter size={16} className="text-gray-500" />
              <p className="text-sm">Find the products</p>
            </div>
          </div>
          <div className="flex-grow px-2 py-2 h-[calc(100vh-100px)] overflow-y-auto">
            <ShopFilterSection />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShopFilterSheet;
