"use client";
import React from "react";
import { Button } from "../ui/button";
import useFavoriteAction from "@/hooks/useFavoriteAction";
import { TProduct } from "@/types/product.type";
import { Heart, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  product: TProduct;
  className?: string;
};
const FavoriteIcon = ({ product, className }: Props) => {
  const {
    isFavorite,
    toggleFavorite,
    loading: favoriteLoading,
  } = useFavoriteAction();
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => toggleFavorite(product)}
      type="button"
      className={cn(
        "absolute bottom-2 right-2 bg-white/80 hover:bg-white",
        className
      )}
    >
      {favoriteLoading ? (
        <LoaderCircle className="animate-spin w-4 h-4" />
      ) : (
        <Heart
          className={cn(
            "w-4 h-4",
            isFavorite(product)?._id && "text-red-700 fill-red-700 "
          )}
        />
      )}
    </Button>
  );
};

export default FavoriteIcon;
