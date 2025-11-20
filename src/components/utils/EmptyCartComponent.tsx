import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const EmptyCartComponent = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <ShoppingCart className="h-16 w-16 text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-600 mb-2">
          Your cart is <span className="text-main">Empty</span>
        </h3>
        <p className="text-slate-500">
          Add some premium products to get started
        </p>
        <div className="mt-4">
          <Link href="/shop">
            <Button type="button" className="bg-main text-white">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmptyCartComponent;
