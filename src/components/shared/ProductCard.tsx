"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { TProduct } from "@/types/product.type";
import { Eye, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { TCartItems } from "@/types/cart.type";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addToCart, setAllCarts } from "@/redux/features/shoppingCartSlice";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

import {
  calculateDiscount,
  calculateProductPrice,
  isOfferStillActive,
  newProduct,
} from "@/helpers/product.helper";
import { currency } from "@/helpers/utils";
import { useRouter } from "next/navigation";
import { setProductModal } from "@/redux/features/uiSlice";
import { cn } from "@/lib/utils";
import FavoriteIcon from "../utils/favorite-icon";
import { DEFAULT_IMAGE } from "@/helpers/secretVariable";

type Props = {
  product: TProduct;
  className?: string;
  isRating?: boolean;
};
const ProductCard = ({ product, className, isRating = true }: Props) => {
  const { name, slug, featureImage, price } = product || {};
  // Redux State
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const findCart = carts?.find((cart) => cart?.product === product?._id);
  const [images, setImages] = useState<string[]>([]);
  const [featureImg, setFeatureImg] = useState(featureImage?.image);
  const router = useRouter();

  const handleAddToCart = (action: "order" | "card" = "card") => {
    const cartData: TCartItems = {
      user: null,
      product: product?._id,
      quantity: 1,
      pImage: product?.featureImage?.image || "",
      pName: product?.name,
      price: +calculateProductPrice(product),
      sku: product?.skuCode || "default",
      shippingCharge: product?.shippingCharge || 0,
      tax: product?.tax || 0,
    };
    if (isAuthenticated) {
      cartData.user = user?._id as string;
    }

    dispatch(addToCart(cartData));
    if (action === "order") {
      router.push(`/checkout`);
    }
  };

  const increment = (qty: number) => {
    if (qty < 20) {
      const updateCarts = carts?.map((cart) =>
        cart?.product === product?._id
          ? { ...cart, quantity: cart?.quantity + 1 }
          : cart
      );
      dispatch(setAllCarts(updateCarts));
    }
  };

  const decrement = (qty: number) => {
    if (qty > 1) {
      const updateCarts = carts?.map((cart) =>
        cart?.product === product?._id
          ? { ...cart, quantity: cart?.quantity - 1 }
          : cart
      );
      dispatch(setAllCarts(updateCarts));
    }
  };

  useEffect(() => {
    let pImgs: string[] = [];
    const { featureImage, imageGallery } = product || {};
    if (product?.variant === "Variable Product") {
      const imgs = product?.variations?.map((item) => item?.image);
      pImgs = [...imgs];
    } else {
      const gallarys = (imageGallery as string[]) || [];
      pImgs = [featureImage?.image, ...gallarys];
    }
    setImages(pImgs || []);
    setFeatureImg(pImgs[0]);
  }, [product]);

  return (
    <>
      <Card
        className={cn(
          "group h-full  transition-all duration-300 border-0 shadow",
          className
        )}
      >
        <CardContent className="flex flex-col h-full p-3">
          <div className="group/img relative mb-4">
            <Image
              onClick={() => {
                dispatch(setProductModal(product));
              }}
              width={400}
              height={400}
              src={featureImg || featureImage?.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300"
            />
            {newProduct(product) && (
              <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                New
              </Badge>
            )}
            {
              <div className="absolute top-2 flex flex-col gap-1 right-2 ">
                {product.variant === "Single Product" &&
                  isOfferStillActive(product.offerDate) &&
                  price.discountValue > 0 && (
                    <Badge className=" bg-red-500 hover:bg-red-600">
                      -{calculateDiscount(product).percentage}%
                    </Badge>
                  )}
                {product.isFeature === "Active" && (
                  <Badge className="">Feature</Badge>
                )}
              </div>
            }

            {images?.length > 1 && (
              <div className="absolute group-hover:scale-100 group-hover:left-1 transition-all scale-0 w-[50px] z-10 bottom-1 left-[18px] ">
                <div className="flex flex-col gap-1  p-1 h-[130px] w-[44px]">
                  {images?.slice(0, 3)?.map((img, imgIndex) => (
                    <button
                      onClick={() => setFeatureImg(img)}
                      key={imgIndex}
                      className=" border rounded size-10 bg-white hover:bg-white"
                    >
                      <Image
                        src={img || `/${DEFAULT_IMAGE}`}
                        width={40}
                        height={40}
                        alt="images"
                        className="w-full object-cover h-full bg-white"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <FavoriteIcon product={product} />
          </div>

          <div className="space-y-2 flex-grow">
            <h3 className="font-semibold text-sm line-clamp-2">
              <Link
                title={name}
                href={`/product/${slug}`}
                className=" hover:text-main !line-clamp-2 text-sm text-gray-700 transition-all  inline-block leading-[17px] font-medium"
              >
                {name}
              </Link>
            </h3>

            {isRating && (
              <div className="flex items-center gap-1 ">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product?.avgRating || 0)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-yellow-500"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product?.totalComments})
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              {product?.variant === "Variable Product" ? (
                <span className="font-bold text-main">
                  {currency}
                  {calculateProductPrice(product)}
                </span>
              ) : (
                <>
                  <span className="font-bold text-main">
                    {currency}
                    {calculateProductPrice(product)}
                  </span>
                  {price?.discountValue > 0 && (
                    <span className="text-sm text-gray-500 line-through">
                      {currency}
                      {price?.productPrice}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            <div className="flex relative items-center justify-between pt-2">
              {product?.variant === "Single Product" ? (
                <Button
                  type="button"
                  onClick={() => handleAddToCart("order")}
                  size="sm"
                  className="h-[32px] px-[8px] bg-main hover:bg-main"
                >
                  Order
                </Button>
              ) : (
                <Link href={`/product/${slug}`}>
                  <Button type="button" className=" h-[32px] px-[8px]  ">
                    Details
                  </Button>
                </Link>
              )}
              {findCart?.product ? (
                <div className=" h-8 flex items-center  ">
                  <div className="flex gap-1 items-center">
                    <button
                      onClick={() => decrement(findCart?.quantity || 1)}
                      className="w-7 h-7 hover:bg-main hover:text-white rounded-full border border-border flex items-center justify-center cursor-pointer"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-[20px] text-center py-[3px] text-sm">
                      {findCart?.quantity}
                    </span>
                    <button
                      onClick={() => increment(findCart?.quantity || 1)}
                      className="w-7 h-7 hover:bg-main hover:text-white rounded-full border border-border flex items-center justify-center cursor-pointer"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {product?.variant === "Single Product" ? (
                    <Button
                      onClick={() => handleAddToCart("card")}
                      type="button"
                      className=" h-[32px] bg-main hover:bg-main px-[8px] "
                    >
                      <ShoppingCart />
                    </Button>
                  ) : (
                    <Link href={`/product/${slug}`}>
                      <Button
                        type="button"
                        className=" bg-main hover:bg-main h-[32px] px-[8px] "
                      >
                        <Eye />
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
