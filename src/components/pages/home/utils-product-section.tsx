"use client";
import { useAppSelector } from "@/hooks/useRedux";
import React from "react";
import UtilsCard from "./utils-card";

const UtilsProductSection = () => {
  const { products } = useAppSelector((state) => state.product);
  const ratingProducts = [...products]
    ?.sort((a, b) => (a.avgRating || 0) - (b.avgRating || 0))
    ?.reverse();
  console.log({ ratingProducts });

  return (
    <section className="py-10">
      <div className="container px-2 md:px-0 ">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-800">Top Rating</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ratingProducts?.slice(0, 9)?.map((product, index) => (
            <UtilsCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UtilsProductSection;
