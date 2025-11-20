"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { currency, generateRandomId } from "@/helpers/utils";
import useTotalCartPrice from "@/hooks/useTotalCartPrice";
import { setAllCarts } from "@/redux/features/shoppingCartSlice";
import { TOrderForm } from "@/types/order.type";
import { placeNewOrder } from "@/actions/orderApi";
import { useRouter } from "next/navigation";

import {
  createAddressByAuthUser,
  deleteAddressByAddressId,
  getAllAddressByAuthUser,
  updateAddressByAddressId,
} from "@/actions/addressApi";
import { TAddress, TAddressResponse } from "@/types/address.type";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import GlobalModal from "@/components/shared/GlobalModal";
import AddressCard from "./AddressCard";

import CheckoutForm from "./CheckoutForm";
import { addressFormValidation } from "@/validations/AddressFormValidation";
import SpinnerLoading from "@/components/shared/SpinnerLoading";
import { calculateProductPrice } from "@/helpers/product.helper";

const CheckoutComponent = () => {
  // Redux state
  const { carts, totalShipping, totalTax } = useAppSelector(
    (state) => state.cart
  );
  const { products } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const totalCartPrice = useTotalCartPrice();

  // Local State
  const router = useRouter();
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [userAddress, setUserAddress] = useState<TAddressResponse[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<TAddressResponse | null>(userAddress[0]);
  const [errors, setErrors] = useState<Record<string, string>>();
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState<TAddress>({
    userId: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    subCity: "",
    city: "",
    type: "Home",
  });

  // handle order data
  const handleOrder = async () => {
    // Validation address form
    const validations = addressFormValidation(address);
    setErrors({ ...validations });
    const isError = Object.keys(validations).length === 0;
    if (!selectedAddress?._id && !isError) return;

    // Validation empty carts
    if (carts?.length === 0) return;

    let order: TOrderForm = {
      items: [],
      totalAmount: 0,
      uid: generateRandomId(8),
      phone: address?.phone || selectedAddress?.phone || "",
    };

    carts?.forEach((cart) => {
      const findProduct = products.find(
        (product) => product?._id === cart?.product
      );
      if (!findProduct) return;
      if (findProduct?.variant === "Single Product") {
        const pPrice = +calculateProductPrice(findProduct);
        if (pPrice !== cart?.price) {
          dispatch(setAllCarts([]));
          return;
        }
      }

      // Update form data
      order.totalAmount +=
        cart?.price * cart?.quantity +
        (cart?.shippingCharge || 0) +
        (cart?.tax || 0);
      order.items.push({
        ...cart,
        image: cart?.pImage,
        name: cart?.pName,
      });
    });

    const addressData = {
      firstName: address?.firstName,
      lastName: address?.lastName,
      phone: address?.phone,
      address: address?.address,
      subCity: address?.subCity,
      city: address?.city,
      type: address?.type as "Home" | "Office" | "Others",
    };

    if (user?._id) {
      order.userId = user?._id;
    } else {
      order = {
        ...order,
        shippingAddress: {
          ...order.shippingAddress,
          userId: "",
          ...addressData,
        },
      };
    }

    // As a first time create new address for shipping
    if (order?.userId) {
      if (userAddress?.length > 0) {
        order.shippingAddressId = selectedAddress?._id;
      } else {
        const newAddress = {
          ...addressData,
          userId: user?._id as string,
        };
        const resData = await createAddressByAuthUser({
          addressData: newAddress,
        });
        order.shippingAddressId = resData?.payload?._id;
      }
    }

    try {
      setIsLoading(true);
      const getResponse = await placeNewOrder(order);
      if (getResponse?.success) {
        dispatch(setAllCarts([]));
        if (!user) {
          resetFrom();
        }
        router.push(`/order-success?code=${getResponse?.payload?.uid}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFrom = () => {
    setAddress({
      userId: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      subCity: "",
      type: "Home",
    });
  };

  useEffect(() => {
    (async function () {
      try {
        const data = await getAllAddressByAuthUser();
        const address: TAddressResponse[] = data?.payload?.address;

        if (data.success) {
          setUserAddress(address);
          setSelectedAddress(address[0]);
        }
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  // Create Or Update address
  const handelSaveAddress = async () => {
    const validations = addressFormValidation(address);
    setErrors({ ...validations });
    const isError = Object.keys(validations).length === 0;
    if (!isError) return;

    const addressData = {
      firstName: address?.firstName,
      lastName: address?.lastName,
      phone: address?.phone,
      address: address?.address,
      subCity: address?.subCity,
      city: address?.city,
      type: address?.type as "Home" | "Office" | "Others",
    };

    const data = {
      ...addressData,
      userId: user?._id as string,
    };

    if (selectedAddress?._id) {
      try {
        const resData = await updateAddressByAddressId({
          addressData: data,
          addressId: selectedAddress?._id,
        });
        const resAddress = resData?.payload;
        setUserAddress((prev) =>
          prev?.map((add) => (add._id === resAddress?._id ? resAddress : add))
        );
        setSelectedAddress(resAddress);
        setIsAddressOpen(false);
        resetFrom();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const resData = await createAddressByAuthUser({
          addressData: data,
        });
        const resAddress = resData?.payload;
        setUserAddress((prev) => [...prev, resAddress]);
        setSelectedAddress(resAddress);
        setIsAddressOpen(false);
        resetFrom();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddressByAddressId({
        addressId,
      });
      setUserAddress((prev) => prev?.filter((add) => add?._id !== addressId));
      setSelectedAddress(userAddress[0] || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10">
      <div className="container px-2 md:px-0 xl:max-w-[1100px]  min-h-screen grid  lg:grid-cols-[auto_400px] gap-5">
        <div className="">
          <div className="space-y-4">
            {userAddress?.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {userAddress?.map(
                  (address: TAddressResponse, index: number) => {
                    return (
                      <AddressCard
                        key={index}
                        setSelectedAddress={setSelectedAddress}
                        selectedAddress={selectedAddress}
                        address={address}
                        index={index}
                        setFromAddress={setAddress}
                        setIsAddressOpen={setIsAddressOpen}
                        handleDeleteAddress={handleDeleteAddress}
                      />
                    );
                  }
                )}
                <Card
                  onClick={() => {
                    setIsAddressOpen(true);
                    setSelectedAddress(null);
                  }}
                  className="w-full max-w-md mx-auto bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="flex flex-col items-center justify-center py-12 px-6">
                    <Button
                      size="lg"
                      className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 mb-6 p-0"
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </Button>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                      Add New Address
                    </h3>

                    <p className="text-sm text-gray-500 text-center">
                      Add a shipping or billing address
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <CheckoutForm
                errors={errors}
                address={address}
                setAddress={setAddress}
              />
            )}

            <div className="space-y-4">
              <div>
                <p className=" text-lg  font-semibold">Payment</p>
                <p className=" text-slate-600 text-base mb-1 font-normal">
                  All transactions are secure and encrypted.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex border-main border rounded-md items-center justify-between px-4 py-3 text-sm bg-white">
                  <span>Cash on Delivery (COD)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border bg-white border-slate-200 rounded-md">
            <div className="flex py-3 pt-4 px-4 justify-between items-center">
              <p>Product{carts?.length > 1 && "s"} </p>
              <p>Subtotal</p>
            </div>
            <ul className="px-4 divide-y  divide-slate-200">
              <li>
                <ul className=" divide-y  divide-slate-200">
                  {carts?.length > 0 &&
                    carts?.map((cart, index) => {
                      const findProduct = products?.find(
                        (product) => product?._id === cart?.product
                      );
                      return (
                        <li
                          key={index}
                          className="flex py-3 items-center gap-2"
                        >
                          <div>
                            <div className="w-[60px] relative">
                              <span className="w-5 h-5 text-white absolute -top-1 -right-1 rounded-full bg-slate-400 flex items-center justify-center text-sm">
                                {cart?.quantity}
                              </span>
                              <Image
                                src={findProduct?.featureImage?.image || ""}
                                width={100}
                                height={100}
                                alt="img"
                                className="w-[60px] h-[60px] p-2 rounded border border-slate-200"
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <p className="text-[15px] text-slate-800 font-medium leading-[17px]">
                              {findProduct?.name}
                            </p>
                          </div>
                          <div>
                            <div className="w-[60px] ">
                              <p className="text-right text-slate-800">
                                {currency}
                                {cart?.price}{" "}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li className="flex py-4 justify-between items-center">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {totalCartPrice.toFixed(2)}
                </span>
              </li>
              <li className="flex py-4 justify-between items-center">
                <span>Tax</span>

                <span>
                  {currency}
                  {totalTax?.toFixed(2)}
                </span>
              </li>
              <li className="flex py-4 justify-between items-center">
                <span>Shipping Service</span>
                {totalShipping > 0 ? (
                  <>
                    {currency}
                    {totalShipping?.toFixed(2)}
                  </>
                ) : (
                  <span className="uppercase text-main">Free</span>
                )}
              </li>
              <li className="flex py-4 justify-between items-center">
                <span>Total</span>
                <span>
                  {currency}
                  {(totalCartPrice + totalShipping + totalTax).toFixed(2)}
                </span>
              </li>
              <li className=" py-4 space-y-4">
                <Button
                  onClick={handleOrder}
                  className="w-full bg-main  text-white "
                  size={"lg"}
                  disabled={carts?.length === 0 || isLoading}
                >
                  {isLoading && <SpinnerLoading />}
                  Confirm Order - {currency}
                  {(totalCartPrice + totalShipping + totalTax).toFixed(2)}
                </Button>

                <Link href={"/"}>
                  <Button className="w-full  " variant={"link"} size={"lg"}>
                    Continue Shopping
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <GlobalModal
        open={isAddressOpen}
        setOpen={() => {
          setIsAddressOpen(false);
          resetFrom();
        }}
        className="w-[550px] md:w-[550px] lg:w-[550px]"
        withFooter={
          <div className="flex gap-2 items-center">
            <Button type="button" onClick={handelSaveAddress}>
              {selectedAddress?._id ? "Update Addres" : "Save & Close"}
            </Button>
          </div>
        }
        subTitle={`Manage shipping address inforamtion`}
        title={`Address modal `}
      >
        <CheckoutForm
          errors={errors}
          address={address}
          setAddress={setAddress}
        />
      </GlobalModal>
    </div>
  );
};

export default CheckoutComponent;
