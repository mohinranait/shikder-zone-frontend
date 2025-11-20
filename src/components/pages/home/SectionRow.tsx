import ProductCard from "@/components/shared/ProductCard";
import ProductsSlider from "@/components/sliders/ProductsSlider";
import { TProduct } from "@/types/product.type";
import { TSection } from "@/types/section.type";
import React from "react";

type Props = {
  section: TSection;
};
const SectionRow = ({ section }: Props) => {
  const products = section?.products as unknown as TProduct[];
  return (
    <>
      {section?.type === "grid" ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-3">
          {products?.map((product, index) => (
            <ProductCard key={index} product={product} isRating={false} />
          ))}
        </div>
      ) : (
        <ProductsSlider products={products} />
      )}
    </>
  );
};

export default SectionRow;
