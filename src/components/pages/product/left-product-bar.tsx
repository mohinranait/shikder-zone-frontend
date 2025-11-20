import ProductViewSlider from "@/components/sliders/ProductViewSlider";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import React from "react";

type Props = {
  product: TProduct;
  className?: string;
};
const LeftProductBar = ({ product, className }: Props) => {
  return (
    <div className="w-full ">
      <div
        className={cn(" sticky top-0 md:w-[400px] xl:w-[500px]  ", className)}
      >
        <ProductViewSlider product={product} />
      </div>
    </div>
  );
};

export default LeftProductBar;
