"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { currency } from "@/helpers/utils";
import { TBrandType } from "@/types/brand.type";

const ShopFilterSection = () => {
  const { brands } = useAppSelector((state) => state.brand);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("cat");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [openItems, setOpenItems] = useState([
    "range-slider",
    "item-1",
    "item-2",
    "item-3",
    "item-4",
  ]);

  const handleFilterObject = (
    currentParams: URLSearchParams,
    obj?: Record<string, string>
  ) => {
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });

    // use currentParams
    const prices = currentParams.get("priceRange")?.split(",") || [];

    const queryObject: {
      search: string;
      categoryIds: string[] | undefined;
      brandIds: string[];
      shipping: "yes" | "no";
      status: string[] | undefined;
      ratings: string[] | undefined;
      priceRange?: [number, number] | undefined;
    } = {
      ...obj,
      search,
      categoryIds: currentParams.get("cat")?.split(","),
      brandIds: currentParams.get("brandIds")?.split(",") || [],
      shipping: currentParams.get("shipping") as "yes" | "no",
      status: currentParams.get("status")?.split(","),
      ratings: currentParams.get("ratings")?.split(","),
    };

    if (prices?.length === 2) {
      queryObject.priceRange = [Number(prices[0]), Number(prices[1])];
    }
  };

  // Helper: Update URL query
  const updateMultiValueQuery = (key: string, value: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    const existingValues = currentParams.get(key)?.split(",") || [];

    let updatedValues: string[] | number[] = [];
    if (key === "priceRange") {
      updatedValues = value.split(",").map((item) => parseInt(item, 10));
    } else {
      if (existingValues.includes(value)) {
        updatedValues = existingValues.filter((item) => item !== value);
      } else {
        updatedValues = [...existingValues, value];
      }
    }

    if (updatedValues.length > 0) {
      currentParams.set(key, updatedValues.join(","));
    } else {
      currentParams.delete(key);
    }

    // push updated params to router
    handleFilterObject(currentParams);
  };

  // Helper: Single value like shipping
  const updateSingleValueQuery = (key: string, value: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set(key, value);
    handleFilterObject(currentParams, { shipping: value });
  };

  // clear filter
  const handleClearFilter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete(key);
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    handleFilterObject(currentParams, { [key]: "" });
  };

  let getBrands: TBrandType[] = [];
  if (categoryId) {
    const filterBrands = brands?.filter((brand) =>
      brand?.categoryIds?.includes(categoryId)
    );
    if (filterBrands?.length === 0) {
      getBrands = brands;
    } else {
      getBrands = filterBrands;
    }
  } else {
    getBrands = brands;
  }

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="space-y-2"
    >
      {/* Shipping */}
      <AccordionItem
        value="range-slider"
        className="rounded px-3 py-0 border bg-white border-border"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="font-semibold">Price</span> <span>Range</span>
            </div>
            {searchParams.get("priceRange") && (
              <button
                className="text-xs text-gray-500 hover:text-gray-900 mr-2"
                type="button"
                onClick={(e) => {
                  handleClearFilter(e, "priceRange");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 mt-3">
            <div className="flex items-center justify-between text-sm text-primary font-medium">
              <span>
                Min: {currency}
                {priceRange[0]}
              </span>
              <span>
                Max: {currency}
                {priceRange[1]}
              </span>
            </div>
            <RangeSlider
              min={0}
              max={50000}
              className="price-range-slider"
              defaultValue={priceRange}
              onInput={(e) => {
                setPriceRange(e);
                updateMultiValueQuery("priceRange", e.join(","));
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Shipping */}
      <AccordionItem
        value="item-1"
        className="rounded px-3 py-0 border bg-white border-border"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <span>Free Shipping</span>
            {searchParams.get("shipping") && (
              <button
                className="text-xs text-gray-500 hover:text-gray-900 mr-2"
                type="button"
                onClick={(e) => {
                  handleClearFilter(e, "shipping");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <RadioGroup
              onValueChange={(e) => updateSingleValueQuery("shipping", e)}
              defaultValue={`${searchParams.get("shipping")}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <label
                  htmlFor="yes"
                  className="cursor-pointer text-gray-500 hover:text-gray-900 w-full"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <label
                  htmlFor="no"
                  className="cursor-pointer text-gray-500 hover:text-gray-900 w-full"
                >
                  No
                </label>
              </div>
            </RadioGroup>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Brands */}
      <AccordionItem
        value="item-2"
        className="rounded px-3 py-0 border bg-white border-border"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <span>Brands</span>
            {searchParams.get("brandIds") && (
              <button
                className="text-xs text-gray-500 hover:text-gray-900 mr-2"
                type="button"
                onClick={(e) => {
                  handleClearFilter(e, "brandIds");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 max-h-[200px] overflow-y-auto">
            {getBrands?.map((brand, i) => {
              const brandParam = searchParams.get("brandIds") || "";
              const checked = brandParam.split(",").includes(brand._id);
              return (
                <div key={i} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand_${i}`}
                    value={brand._id}
                    checked={checked}
                    onCheckedChange={() =>
                      updateMultiValueQuery("brandIds", brand._id)
                    }
                  />
                  <label
                    htmlFor={`brand_${i}`}
                    className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer font-medium"
                  >
                    {brand?.name}
                  </label>
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Status Example */}
      <AccordionItem
        value="item-3"
        className="rounded px-3 py-0 border bg-white border-border"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <span>Product Status</span>
            {searchParams.get("status") && (
              <button
                className="text-xs text-gray-500 hover:text-gray-900 mr-2"
                type="button"
                onClick={(e) => {
                  handleClearFilter(e, "status");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3  max-h-[150px] overflow-y-auto">
            {/* {["inStock", "isFeature", "homeDelivery"].map((status) => {
              const checked = (searchParams.get("status") || "")
                .split(",")
                .includes(status);
              return (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={status}
                    checked={checked}
                    onCheckedChange={() =>
                      updateMultiValueQuery("status", status)
                    }
                  />
                  <label
                    htmlFor={status}
                    className="text-sm text-gray-500 hover:text-gray-900 font-medium cursor-pointer"
                  >
                    {status === "inStock"
                      ? "In Stock"
                      : status === "isFeature"
                      ? "Features"
                      : "Home Delivery"}
                  </label>
                </div>
              );
            })} */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id={"stock"}
                checked={searchParams.get("stock") ? true : false}
                onCheckedChange={() => updateMultiValueQuery("stock", "yes")}
              />
              <label
                htmlFor={"stock"}
                className="text-sm text-gray-500 hover:text-gray-900 font-medium cursor-pointer"
              >
                In Stock
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={"feature"}
                checked={searchParams.get("feature") ? true : false}
                onCheckedChange={() => updateMultiValueQuery("feature", "yes")}
              />
              <label
                htmlFor={"feature"}
                className="text-sm text-gray-500 hover:text-gray-900 font-medium cursor-pointer"
              >
                Features
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={"delivery"}
                checked={searchParams.get("delivery") ? true : false}
                onCheckedChange={() => updateMultiValueQuery("delivery", "yes")}
              />
              <label
                htmlFor={"delivery"}
                className="text-sm text-gray-500 hover:text-gray-900 font-medium cursor-pointer"
              >
                Home Delivery
              </label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Ratings */}
      <AccordionItem
        value="item-4"
        className="rounded px-3 py-0 border bg-white border-border"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full">
            Rating
            {searchParams.get("ratings") && (
              <button
                className="text-xs text-gray-500 hover:text-gray-900 mr-2"
                type="button"
                onClick={(e) => {
                  handleClearFilter(e, "ratings");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 max-h-[150px] overflow-y-auto">
            <RadioGroup
              onValueChange={(e) => updateSingleValueQuery("ratings", e)}
              defaultValue={`${searchParams.get("ratings")}`}
            >
              {[5, 4, 3, 2, 1].map((rating) => {
                return (
                  <>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={`${rating}`} id={`${rating}`} />
                      <label
                        htmlFor={`${rating}`}
                        className="cursor-pointer flex text-gray-500 hover:text-gray-900 w-full"
                      >
                        {Array.from({ length: rating }, (_, i) => (
                          <Star size={16} key={i} />
                        ))}
                      </label>
                    </div>
                  </>
                );
              })}
            </RadioGroup>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ShopFilterSection;
