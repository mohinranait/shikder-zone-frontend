"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "../shared/ProductCard";
import { TProduct } from "@/types/product.type";

type Props = {
  products: TProduct[];
};
const ProductsSlider = ({ products }: Props) => {
  return (
    <>
      <Carousel className="w-full  ">
        <CarouselContent className="py-4 pt-0">
          {products?.map((product, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} isRating={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </>
  );
};

export default ProductsSlider;
