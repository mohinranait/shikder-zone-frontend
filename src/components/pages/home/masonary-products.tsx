"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FavoriteIcon from "@/components/utils/favorite-icon";
import { calculateProductPrice, newProduct } from "@/helpers/product.helper";
import { currency } from "@/helpers/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProductModal } from "@/redux/features/uiSlice";
import { TProduct } from "@/types/product.type";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MasonaryProducts = () => {
  // Redux state
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const normalProducts = products?.filter(
    (product) => product?.variant === "Single Product"
  );

  // Show big product from masonary
  const feature = normalProducts[0];
  const featured = normalProducts[5];

  // handle open modal for show single product details
  const handleOpenModal = (product: TProduct) => {
    if (!product) {
      return;
    }
    dispatch(setProductModal(product));
  };
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 ">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Hand-picked fresh items just for you
            </p>
          </div>
          <Button variant="outline" className="rounded-full bg-transparent">
            View All Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Large Featured Product */}
          {feature && (
            <div className="md:col-span-2 md:row-span-2 grid grid-rows-2 gap-6">
              <Card className=" group transition-shadow duration-300">
                <CardContent className="p-0 md:grid grid-cols-2 h-full">
                  <div className="relative md:h-full overflow-hidden rounded-lg rounded-r-none">
                    <Image
                      onClick={() => handleOpenModal(feature)}
                      src={
                        `${feature?.featureImage?.image}?height=600&width=600` ||
                        "/image.png"
                      }
                      alt={feature?.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {newProduct(feature) && (
                      <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                        New
                      </Badge>
                    )}

                    <FavoriteIcon
                      product={feature}
                      className="!top-3 !right-3"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(feature?.avgRating || 0)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({feature.totalComments} reviews)
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature?.name}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {feature?.productShortDesc || ""}
                    </p>
                    <div className="flex items-center flex-wrap justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-main">
                          {currency}
                          {calculateProductPrice(feature)}
                        </span>

                        {feature?.price?.discountValue > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            {currency}
                            {feature?.price?.productPrice}
                          </span>
                        )}
                      </div>
                      <Link href={`/product/${feature?.slug}`}>
                        <Button className="bg-main hover:bg-main-light rounded-full">
                          View Product
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {featured && (
                <Card className=" group  transition-shadow duration-300">
                  <CardContent className="p-0 md:grid grid-cols-2 h-full">
                    <div className="relative md:h-full overflow-hidden rounded-lg rounded-r-none">
                      <Image
                        onClick={() => handleOpenModal(featured)}
                        src={
                          `${featured?.featureImage?.image}?height=600&width=600` ||
                          "/image.png"
                        }
                        alt={featured?.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {newProduct(featured) && (
                        <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                          New
                        </Badge>
                      )}

                      <FavoriteIcon
                        product={featured}
                        className="!top-3 !right-3"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(featured?.avgRating || 0)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          ({featured?.totalComments} reviews)
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {featured?.name}
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {featured?.productShortDesc || ""}
                      </p>
                      <div className="flex items-center flex-wrap justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-main">
                            {currency}
                            {calculateProductPrice(featured)}
                          </span>

                          {featured?.price?.discountValue > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              {currency}
                              {featured?.price?.productPrice}
                            </span>
                          )}
                        </div>
                        <Link href={`/product/${featured?.slug}`}>
                          <Button className="bg-main hover:bg-main-light rounded-full">
                            View Product
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Regular Products */}
          {normalProducts?.slice(1, 5).map((product, index) => (
            <Card key={index} className="group  transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    onClick={() => handleOpenModal(product)}
                    src={
                      `${product?.featureImage?.image}?height=200&width=300` ||
                      "/image.png"
                    }
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {newProduct(product) && (
                    <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                      New
                    </Badge>
                  )}

                  <FavoriteIcon product={product} />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product?.avgRating || 0)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                      ({product.totalComments})
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-main">
                        {currency}
                        {calculateProductPrice(product)}
                      </span>

                      {product?.price?.discountValue > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          {currency}
                          {product?.price?.productPrice}
                        </span>
                      )}
                    </div>
                    <Link href={`/product/${product?.slug}`}>
                      <Button
                        size="sm"
                        className="bg-main hover:bg-main-light rounded-full"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonaryProducts;
