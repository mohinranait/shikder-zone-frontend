"use client";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavoriteProducts = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  const { products } = useAppSelector((state) => state.product);
  const favoriteProductIds = new Set(
    favorites?.map((fav) => String(fav.product))
  );

  const getMatchProducts = products?.filter((product) =>
    favoriteProductIds.has(String(product._id))
  );

  return (
    <div className=" mx-auto px-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Favorites</h2>
          <p className="text-muted-foreground">Manage your favorite products</p>
        </div>
      </div>

      {getMatchProducts?.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg bg-card py-20 px-4 text-center">
          {/* Heart Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>

          <h2 className="mb-3 text-balance text-2xl font-semibold text-foreground">
            আপনার প্রিয় তালিকা খালি
          </h2>

          <p className="mb-8 max-w-md text-pretty  text-muted-foreground">
            এখনো কোনো প্রিয় পণ্য যোগ করেননি। আপনার পছন্দের পণ্যগুলি সংরক্ষণ
            করুন এবং পরে সহজেই খুঁজে নিন।
          </p>

          <Link href="/shop">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              শপিং শুরু করুন
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {getMatchProducts?.map((prod, index) => {
          return (
            <div key={index} className="h-full">
              <ProductCard product={prod} key={index} className={"h-full"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteProducts;
