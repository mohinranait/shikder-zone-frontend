import ProductCard from "@/components/shared/ProductCard";
import { TProduct } from "@/types/product.type";
import React, { Suspense } from "react";
import FilterCharecter from "./FilterCharecter";
import ShopPagination from "./ShopPagination";

type Props = {
  products: TProduct[];
  total: number;
  page?: number;
  limit?: number;
};

const ShopProducts = ({ products, total, page = 1, limit = 20 }: Props) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <Suspense fallback={<div>Suspense loading...</div>}>
      <div className="flex-grow space-y-4">
        {/* Filter & Result Count */}
        <div className="py-3 bg-white px-3 flex items-center justify-between rounded shadow">
          <p className="text-gray-600 text-sm">
            Showing {products?.length} of {total} results
          </p>
          <div className="flex">
            <FilterCharecter />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
          {products?.length === 0 && (
            <div className="text-center text-gray-600 text-sm col-span-5 py-4">
              Product not found for your request
            </div>
          )}
          {products?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <ShopPagination totalPages={totalPages} page={page} limit={limit} />
        )}
      </div>
    </Suspense>
  );
};

export default ShopProducts;
