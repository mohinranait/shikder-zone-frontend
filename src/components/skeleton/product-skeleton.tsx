import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-48 w-full rounded-md mb-2" />
      <Skeleton className="h-7 w-3/4 rounded-md mb-1" />
      <Skeleton className="h-7 mt-2 w-1/2 rounded-md" />
    </div>
  );
};

export default ProductSkeleton;
