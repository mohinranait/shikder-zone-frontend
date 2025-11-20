import { categoryColors } from "@/constans/categorysLists";
import { DEFAULT_IMAGE } from "@/helpers/secretVariable";
import { TCategoryType } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./badge";

type Props = {
  category: TCategoryType;
  index: number;
};
const CategoryCard = ({ category, index }: Props) => {
  return (
    <div
      key={index}
      className={`group relative overflow-hidden rounded-2xl ${categoryColors[index].bgColor} border border-gray-100 hover:border-main-light transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
    >
      <div className="p-4  text-center">
        {/* Icon Container */}
        <div
          className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 lg:mb-4 rounded-2xl bg-gradient-to-br ${categoryColors[index].color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 `}
        >
          <Image
            src={category?.catThumbnail || `/${DEFAULT_IMAGE}`}
            width={60}
            height={60}
            className="w-14 h-14 rounded-md"
            alt="category image"
          />
        </div>

        {/* Category Info */}
        <h3
          className={`font-bold text-gray-900 text-sm    group-hover:text-main transition-colors`}
        >
          {category?.name}
        </h3>
        {/* <p className="text-xs  text-gray-500 font-medium">
          {category?.productCount || 0} Items
        </p> */}

        {/* Hover Effect Badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href={`/shop?cat=${category?._id}`}>
            <Badge className="bg-main text-white text-xs px-2 py-1">
              Shop Now
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
