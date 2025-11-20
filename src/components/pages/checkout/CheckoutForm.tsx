import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useRedux";
import Link from "next/link";
import { TAddress } from "@/types/address.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TUpazilaType, upozila, zila } from "@/constans/location";
import { Textarea } from "@/components/ui/textarea";
import { BadgeInfo } from "lucide-react";

type CheckoutFormProps = {
  errors: Record<string, string> | undefined;
  address: TAddress;
  setAddress: React.Dispatch<React.SetStateAction<TAddress>>;
};
const CheckoutForm = ({ errors, address, setAddress }: CheckoutFormProps) => {
  // Redux state
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [selectUpozila, setSelectUpozila] = React.useState<
    TUpazilaType[] | null
  >(null);

  // Local state
  const handleCity = (value: string) => {
    const filterUpozila = upozila.filter((u) => u.districtId === value);
    setSelectUpozila(filterUpozila);
    const selectedZila = zila.find((z) => z.id === value);
    setAddress((prev) => ({
      ...prev,
      city: selectedZila?.bn || "",
    }));
  };

  useEffect(() => {
    if (!address?.city) return;
    const findCity = zila.find((d) => d.bn === address?.city);
    const filterUpozila = upozila.filter((u) => u.districtId === findCity?.id);
    setSelectUpozila(filterUpozila);
  }, [address?.city]);

  return (
    <div>
      <Alert
        variant={"destructive"}
        className=" bg-sky-100 text-sky-500 border-sky-500 mb-4"
      >
        <BadgeInfo className="size-4 !text-sky-500" />
        <AlertTitle className="mb-0">
          নিচের তথ্যগুলো সঠিকভাবে পূরণ করে{" "}
          <span className="font-semibold">Confirm Order</span> বাটনে ক্লিক করুন।
        </AlertTitle>
      </Alert>

      <p className="flex  justify-between items-center text-lg mb-1 font-semibold">
        Contact & Delivery Address
        {!isAuthenticated && (
          <Link
            className="text-sm text-main underline font-normal"
            href={"/login?redirectTo=checkout"}
          >
            Log In
          </Link>
        )}
      </p>

      <div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName">নামের প্রথম অংশ </label>
              <Input
                id="firstName"
                type="text"
                placeholder="নামের প্রথম অংশ লিখুন"
                className={cn(
                  "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-main h-auto py-3"
                )}
                value={address?.firstName}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              {errors?.firstName && (
                <p className="text-xs text-red-500 mt-[3px]">
                  {errors?.firstName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName">নামের শেষ অংশ </label>
              <Input
                id="lastName"
                type="text"
                placeholder="নামের শেষ অংশ লিখুন"
                className={cn(
                  "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-main h-auto py-3"
                )}
                value={address?.lastName}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
              {errors?.lastName && (
                <p className="text-xs text-red-500 mt-[3px]">
                  {errors?.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone"> মোবাইল নাম্বার </label>
            <Input
              id="phone"
              type="text"
              placeholder="আপনার মোবাইল নাম্বার লিখুন"
              value={address?.phone}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, phone: e.target.value }))
              }
              className={cn(
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-main h-auto py-3"
              )}
            />
            {errors?.phone && (
              <p className="text-xs text-red-500 mt-[3px]">{errors?.phone}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="district">জেলা</label>
              <Select
                defaultValue={zila?.find((d) => d.bn === address?.city)?.id}
                onValueChange={(e) => handleCity(e)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="জেলা সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>জেলা সিলেক্ট করুন</SelectLabel>
                    {zila?.map((zila, idx) => (
                      <SelectItem key={idx} value={zila?.id}>
                        {zila?.name}- ({zila?.bn})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.city && (
                <p className="text-xs text-red-500 mt-[3px]">{errors?.city}</p>
              )}
            </div>
            <div>
              <label htmlFor="sub-district">উপজেলা</label>
              <Select
                defaultValue={address?.subCity || ""}
                onValueChange={(e) => {
                  setAddress((prev) => ({ ...prev, subCity: e }));
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="উপজেলা সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>উপজেলা সিলেক্ট করুন</SelectLabel>
                    {selectUpozila?.map((upzila, idx) => (
                      <SelectItem key={idx} value={upzila?.bn}>
                        {upzila?.name}- ({upzila?.bn})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.subCity && (
                <p className="text-xs text-red-500 mt-[3px]">
                  {errors?.subCity}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="address">ঠিকানা</label>
            <Textarea
              id="address"
              placeholder="ঠিকানা লিখুন"
              className={cn(
                "focus-visible:outline-none !h-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-main py-3"
              )}
              rows={2}
              value={address?.address}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
            {errors?.address && (
              <p className="text-xs text-red-500 mt-[3px]">{errors?.address}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
