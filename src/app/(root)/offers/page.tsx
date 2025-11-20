"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/hooks/useRedux";
import { isOfferStillActive } from "@/helpers/product.helper";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
const OfferPage = () => {
  const { products } = useAppSelector((state) => state.product);
  const [isLoadMore, setIsLoadMore] = React.useState(1);
  const offerProducts = products?.filter((prod) => {
    const hasDiscount = prod?.price?.discountValue && prod?.price?.discountType;
    const isActive = isOfferStillActive(prod?.offerDate);
    return hasDiscount && isActive;
  });

  const totalShow = 12;

  return (
    <section className="mb-10">
      <div className="container px-2 md:px-0">
        <Breadcrumb className="py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Offers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container px-2 md:px-0  ">
        <div className=" space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
            {offerProducts?.length === 0 && (
              <div className="text-center text-gray-600 text-sm col-span-5 py-4">
                Product not found for your request
              </div>
            )}
            {[...offerProducts]
              ?.slice(0, isLoadMore * totalShow)
              ?.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>
          {offerProducts?.length > isLoadMore * totalShow && (
            <div className="flex items-center justify-center py-4">
              <Button
                onClick={() => setIsLoadMore((prev) => prev + 1)}
                className="btn btn-primary"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OfferPage;
