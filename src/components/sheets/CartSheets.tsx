"use client";
import React, { useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "../utils/CartCounter";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { removeCart } from "@/redux/features/shoppingCartSlice";
import { setCartSidebarOpen } from "@/redux/features/uiSlice";
import { usePathname } from "next/navigation";
import useTotalCartPrice from "@/hooks/useTotalCartPrice";
import { currency } from "@/helpers/utils";
import EmptyCartComponent from "../utils/EmptyCartComponent";
import { Separator } from "../ui/separator";

const CartSheets = () => {
  const pathName = usePathname();
  // Redux state
  const { carts, totalShipping, totalTax } = useAppSelector(
    (state) => state.cart
  );
  const { cartSidebarOpen } = useAppSelector((state) => state.ui);
  const totalCartPrice = useTotalCartPrice();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCartSidebarOpen(false));
  }, [pathName]);

  return (
    <Sheet
      onOpenChange={() => dispatch(setCartSidebarOpen(!cartSidebarOpen))}
      open={cartSidebarOpen}
      key={"right"}
    >
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-l-2 border-slate-200">
        <SheetHeader className="p-4">
          <SheetTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({carts?.length} items)
          </SheetTitle>
        </SheetHeader>

        {carts.length === 0 ? (
          <EmptyCartComponent />
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 px-4">
              {carts.map((cart, index) => {
                return (
                  <div
                    key={index}
                    className="group bg-slate-50 rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200"
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <Image
                          src={cart.pImage || "/placeholder.svg"}
                          alt={`${cart?.pName}`}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover bg-white border border-slate-200"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 mb-1 text-sm line-clamp-2">
                          {cart?.pName}
                        </h4>
                        <p className="text-sm font-bold text-main ">
                          {currency}
                          {cart.price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between">
                          <CartCounter cart={cart} className="bg-white" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                            onClick={() => dispatch(removeCart(cart?.product))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator className="my-4" />

            {/* Order Summary */}
            <div className="space-y-4  bg-slate-50 rounded-xl p-4 mx-4 mb-8 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">
                Order Summary
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">
                    {currency}
                    {totalCartPrice?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-medium">
                    {currency}
                    {totalTax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium">
                    {totalShipping > 0 ? (
                      <>
                        {currency}
                        {totalShipping.toFixed(2)}
                      </>
                    ) : (
                      <span className="text-main font-semibold">FREE</span>
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-main">
                    {currency}
                    {(totalCartPrice + totalTax + totalShipping).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className=" grid grid-cols-2 gap-4 pb-5">
                <Link href={"/cart"}>
                  <Button
                    className="w-full bg-main  text-white hover:bg-main transition-all duration-200 "
                    size="lg"
                  >
                    Cart
                  </Button>
                </Link>
                <Link href={"/checkout"}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-slate-200 hover:border-slate-300 font-medium  transition-all duration-200"
                    size="lg"
                  >
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheets;
