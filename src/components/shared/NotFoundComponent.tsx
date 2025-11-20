"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { calculateProductPrice } from "@/helpers/product.helper";
import { currency } from "@/helpers/utils";

import React from "react";
import { useAppSelector } from "@/hooks/useRedux";

const NotFoundComponent = () => {
  const { products } = useAppSelector((state) => state.product);
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-foreground mb-4 text-balance">
              Oops! We couldn not find that page
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              It looks like the page you are looking for has been moved,
              deleted, or does not exist. But do not worry - we have plenty of
              amazing products waiting for you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go to Homepage
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
            >
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Products
              </Link>
            </Button>
          </div>

          {/* Popular Products Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Popular Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products?.slice(0, 3)?.map((product, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <Link href={`/product/${product?.slug}`}>
                    <Image
                      src={`${product?.featureImage?.image}?height=200&width=200&query=popular product ${product?.name}, ecommerce product image`}
                      alt={`${product?.name}`}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                  </Link>
                  <h4 className="font-medium text-foreground mb-2 line-clamp-2 text-sm">
                    {product?.name}
                  </h4>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {currency}
                      {calculateProductPrice(product)}
                    </span>
                    <Link href={`/product/${product?.slug}`}>
                      <Button size="sm">View</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundComponent;
