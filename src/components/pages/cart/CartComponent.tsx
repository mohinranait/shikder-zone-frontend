"use client";
import { Button } from "@/components/ui/button";
import CartCounter from "@/components/utils/CartCounter";
import EmptyCartComponent from "@/components/utils/EmptyCartComponent";
import { currency } from "@/helpers/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useTotalCartPrice from "@/hooks/useTotalCartPrice";
import { removeCart } from "@/redux/features/shoppingCartSlice";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartComponent = () => {
  // Redux state
  const { carts, totalShipping, totalTax } = useAppSelector(
    (state) => state.cart
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const totalCartPrice = useTotalCartPrice();
  return (
    <>
      <div className="grid md:grid-cols-2  gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="py-4 px-4 rounded bg-white border border-slate-200">
            <p className="text-gray-800 mb-1">
              Free shipping delivery{" "}
              <span className="text-main">{currency}10,000 </span>{" "}
            </p>
            <div className="w-full bg-gray-200 rounded-3xl relative h-2">
              <span className="absolute -top-6 right-0 ">
                {((totalCartPrice / 10000) * 100).toFixed(0)}%
              </span>
              <div
                className={`w-[60%] bg-main h-2 rounded-3xl`}
                style={{ width: (totalCartPrice / 10000) * 100 }}
              ></div>
            </div>
          </div>
          {carts?.length === 0 && <EmptyCartComponent />}
          <ul className="space-y-4">
            {carts?.map((cart, i) => {
              return (
                <li
                  key={i}
                  className="border border-gray-200 grid grid-cols-[100px_auto]  bg-white gap-2 rounded"
                >
                  <div className="relative res6:row-span-2 md:row-span-1 res9:row-span-2 ">
                    <button
                      onClick={() => dispatch(removeCart(cart?.product))}
                      className="absolute cursor-pointer flex items-center justify-center -top-1 -left-1 h-7 w-7 bg-white rounded-full shadow"
                    >
                      <X className="text-gray-500" size={14} />
                    </button>
                    <div className="w-[100px]">
                      <Image
                        src={cart?.pImage || ""}
                        width={100}
                        height={100}
                        alt="Image"
                        className="h-[100px] object-cover rounded-l"
                      />
                    </div>
                  </div>
                  <div className="pt-3 w-full pr-3">
                    <p className="text-sm font-medium text-gray-700 hover:text-gray-900 inline-block hover:text-primary transition-all">
                      {cart?.pName}
                    </p>

                    {cart?.attributes &&
                      Object.entries(cart?.attributes).length > 0 && (
                        <>
                          <p className="uppercase text-xs text-gray-500 ">
                            Explore
                          </p>
                          <ul>
                            {Object.entries(cart?.attributes)?.map(
                              ([key, value]) => (
                                <li
                                  key={key}
                                  className="text-xs text-gray-500 before:w-[6px] before:h-[6px] before:rounded-full before:bg-black before:absolute before:-translate-y-2/4 pl-3 before:left-0 before:top-2/4 relative"
                                >
                                  {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                                  {value}
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      )}
                  </div>
                  <div className="flex col-span-2 res6:col-span-1 md:col-span-2 res9:col-span-1 justify-between items-center py-2 px-4 res6:pl-0 md:px-4 res9:pl-0 w-full">
                    <div className="flex items-center gap-3">
                      <p>Qty</p>
                      <div>
                        <CartCounter cart={cart} />
                        {/* <div className="inline-flex gap-1 items-center">
                          <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center cursor-pointer">
                            <Minus size={15} />
                          </button>
                          <span className="px-[6px] py-[3px] text-sm">
                            {cart?.quantity}
                          </span>
                          <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center cursor-pointer">
                            <Plus size={15} />
                          </button>
                        </div> */}
                      </div>
                      <p>
                        {currency}
                        {cart?.price}
                      </p>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      {currency}
                      {cart?.price * cart?.quantity}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="border rounded p-4 bg-white">
            <div className="space-y-3">
              {!isAuthenticated && (
                <p className="py-3 text-center text-sm uppercase px-4 rounded bg-red-50 text-red-500">
                  Unregisterd Account
                </p>
              )}
              <div className="">
                <p className="text-gray-700 font-semibold">
                  Free Delivery for orders over{" "}
                  <span className="text-main "> {currency}10000</span>{" "}
                </p>
              </div>
            </div>
            <div className=" py-4 ">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm text-gray-800">
                    {currency}
                    {totalCartPrice.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm text-gray-800">
                    {currency}
                    {totalTax.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Shipping Service
                  </span>
                  <span className="text-sm text-gray-800">
                    {totalShipping > 0 ? (
                      <>
                        {currency}
                        {totalShipping.toFixed(2)}
                      </>
                    ) : (
                      <span className="text-main">FREE</span>
                    )}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-600">
                    Total
                  </span>
                  <span className="text-base font-semibold text-main">
                    {currency}
                    {(totalCartPrice + totalShipping + totalTax).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-5">
              <Link href={"/checkout"}>
                <Button className="w-full">Order Now</Button>
              </Link>
              <Link href={"/"}>
                <Button className="w-full" variant={"link"}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
