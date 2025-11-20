"use client";
import {
  createAddressByAuthUser,
  deleteAddressByAddressId,
  getAllAddressByAuthUser,
  updateAddressByAddressId,
} from "@/actions/addressApi";
import { Button } from "@/components/ui/button";
import { TAddress, TAddressResponse } from "@/types/address.type";
import React, { useEffect, useState } from "react";
import AddressCard from "../../checkout/AddressCard";
import GlobalModal from "@/components/shared/GlobalModal";
import CheckoutForm from "../../checkout/CheckoutForm";
import { useAppSelector } from "@/hooks/useRedux";
import { addressFormValidation } from "@/validations/AddressFormValidation";
import { MapPin } from "lucide-react";

const AddressLists = () => {
  // Redux state
  const { user } = useAppSelector((state) => state.auth);

  //  Local State
  const [addressLists, setAddressLists] = useState<TAddressResponse[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<TAddressResponse | null>(null);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>();

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
        setAddressLists((prev) =>
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
        setAddressLists((prev) => [...prev, resAddress]);
        setSelectedAddress(resAddress);
        setIsAddressOpen(false);
        resetFrom();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetFrom = () => {
    setAddress({
      userId: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      subCity: "",
      city: "",
      type: "Home",
    });
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddressByAddressId({
        addressId,
      });
      setAddressLists((prev) => prev?.filter((add) => add?._id !== addressId));
      setSelectedAddress(addressLists[0] || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const data = await getAllAddressByAuthUser();
        const address: TAddressResponse[] = data?.payload?.address;

        if (data.success) {
          setAddressLists(address);
          setSelectedAddress(address[0]);
        }
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return (
    <div className=" mx-auto px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Address</h2>
          <p className="text-muted-foreground">Manage your address</p>
        </div>
        <Button
          onClick={() => {
            setIsAddressOpen(true);
            setSelectedAddress(null);
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <MapPin />
          Add New Address
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {addressLists?.map((address, index) => (
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
        ))}
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

export default AddressLists;
