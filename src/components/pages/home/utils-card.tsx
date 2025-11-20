import FavoriteIcon from "@/components/utils/favorite-icon";
import StarRating from "@/components/utils/StarRating";
import { calculateProductPrice } from "@/helpers/product.helper";
import { currency } from "@/helpers/utils";
import { TProduct } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: TProduct;
};
const UtilsCard = ({ product }: Props) => {
  return (
    <div className="flex gap-2 bg-white rounded-md p-3 shadow">
      <div>
        <div className="w-[100px] h-[80px]">
          <Link href={`/product/${product?.slug}`}>
            <Image
              src={product?.featureImage?.image}
              width={100}
              height={100}
              alt="image"
              className="rounded-md w-[100px] h-[80px] object-cover"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/product/${product?.slug}`}>
          <p className="text-gray-700 hover:text-gray-950 line-clamp-1">
            {product?.name}
          </p>
        </Link>
        <div className="flex items-center text-sm text-gray-600">
          <StarRating value={product?.avgRating || 0} /> (
          {product?.totalComments})
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-main font-medium">
            {currency}
            {calculateProductPrice(product)}
          </p>
          <FavoriteIcon
            product={product}
            className="static w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default UtilsCard;
