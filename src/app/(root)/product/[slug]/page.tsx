import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  BadgeDollarSign,
  Banknote,
  ShieldCheck,
  Truck,
  VerifiedIcon,
} from "lucide-react";

import { getSingleProduct } from "@/actions/productApi";
import { TProduct } from "@/types/product.type";
import { getAllCategorys } from "@/actions/categoriesApi";
import { getAllBrands } from "@/actions/brandApi";
import { TBrandType } from "@/types/brand.type";
import { TCategoryType } from "@/types/category.type";

import StarRating from "@/components/utils/StarRating";
import { getCommentsByProductId } from "@/actions/commentApi";
import { TProductComment as BaseProductComment } from "@/types/comment.type";
import LeftProductBar from "@/components/pages/product/left-product-bar";
import MiddleProductBar from "@/components/pages/product/middle-product-bar";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

type TProductComment = BaseProductComment & {
  userId: {
    name: {
      firstName: string;
      lastName: string;
    };
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { payload } = await getSingleProduct(slug);
  const product: TProduct = payload;
  const previousImages = product?.featureImage?.image || null;

  return {
    title: product?.seo_title || product?.name + " - Collection BD",
    description: product?.seo_desc || "",
    keywords: product?.seo_keyword || [],
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/product/${product?.slug}`,
      images: [previousImages || ""],
    },
  };
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { payload } = await getSingleProduct(params?.slug);

  const product: TProduct = payload;
  if (
    !product ||
    (Array.isArray(product) && product.length === 0) ||
    typeof product !== "object"
  ) {
    notFound();
  }
  const productBrandIds = product?.brand;
  const productCategoryIds = product?.category;
  const getAllReviews = await getCommentsByProductId(
    product?._id || "",
    "public"
  );
  const reviews: TProductComment[] = getAllReviews?.payload?.comments || [];
  const avgRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews?.length ||
    0;

  const catRes = await getAllCategorys();
  const brandRes = await getAllBrands();

  const brands: TBrandType[] =
    brandRes?.payload?.filter((brand: TBrandType) =>
      productBrandIds?.includes(brand?._id)
    ) || [];

  const categories: TCategoryType[] =
    catRes?.payload?.filter((cat: TCategoryType) =>
      productCategoryIds?.includes(cat?._id)
    ) || [];

  // calculation for ratings progress bar
  const ratings = [1, 2, 3, 4, 5]
    .map((star) => {
      const totalReviews =
        reviews?.filter((st) => st.rating === star).length || 0;
      return {
        label: star,
        width: reviews?.length > 0 ? (totalReviews / reviews?.length) * 100 : 0,
        reviews: totalReviews,
      };
    })
    ?.reverse();

  // revalidate date function formate
  const formateDateRevalidate = (date: string) => {
    const formate = new Date(date);
    return formatDistanceToNow(formate, { addSuffix: true });
  };

  return (
    <section className=" space-y-4">
      <div className="container  px-2 md:px-0">
        <Breadcrumb className="py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {product?.productName || product?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container  mb-6 px-2 md:px-0">
        {/* Product display component */}
        <div className=" flex-col flex md:grid md:grid-cols-[420px_auto] lg:flex lg:flex-row xl:grid xl:grid-cols-[500px_auto_300px] 2xl:grid-cols-[500px_auto_300px] gap-4">
          <LeftProductBar product={product} />
          <MiddleProductBar
            product={product}
            avgRating={avgRating}
            totalReview={reviews?.length || 0}
            brands={brands}
            categories={categories}
            withBrandCategory
          />

          <div className="md:col-span-2 xl:col-span-1 w-full">
            <div className=" sticky top-0 xl:w-[310px] ">
              <ul className="bg-gray-100 space-y-6 p-10 lg:p-4 xl:p-6 rounded">
                <li className="items-center flex  gap-2">
                  <div>
                    <div className="w-7 text-gray-500">
                      <Truck />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    সমস্ত বাংলাদেশে ০৩ দিনের মধ্যে ডেলিভারি।
                  </p>
                </li>
                <li className="items-center flex  gap-2">
                  <div>
                    <div className="w-7 text-gray-500">
                      <ShieldCheck />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    আমাদের সকল প্রোডাক্ট ১০০% অরিজিনাল এবং গ্যারান্টেড।
                  </p>
                </li>
                <li className="items-center flex  gap-2">
                  <div>
                    <div className="w-7 text-gray-500">
                      <BadgeDollarSign />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    আমাদের প্রোডাক্টে সেরা মূল্য এবং মান নিশ্চিত এবং সেরা অফার।
                  </p>
                </li>
                <li className="items-center flex  gap-2">
                  <div className="w-7 text-gray-500">
                    <Banknote />
                  </div>
                  <p className="text-xs text-gray-500">
                    আমাদের সাথে নিরাপদ এবং সহজ পেমেন্ট অপশন।
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-3">
          <Tabs defaultValue="details" className="gap-0 border">
            <TabsList className="w-full bg-white h-auto ">
              <TabsTrigger
                value="details"
                className="w-full py-2 bg-main-light text-main data-[state=active]:bg-main data-[state=active]:text-white"
              >
                Product Details
              </TabsTrigger>

              <TabsTrigger
                value="reviews"
                className="w-full py-2 bg-main-light text-main data-[state=active]:bg-main data-[state=active]:text-white"
              >
                Reviews ({reviews?.length || 0})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-0">
              <div className="bg-white col-span-2 px-5 py-4">
                <p className="font-semibold text-lg mb-2 text-gray-900">
                  Product details of {product?.productName}
                </p>
                {product?.details && (
                  <div
                    className="quill-content"
                    dangerouslySetInnerHTML={{ __html: product?.details }}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="col-span-2 bg-white py-4">
                <p className=" text-sm font-semibold text-gray-700 px-5  ">
                  Ratings & Reviews of {product?.productName}
                </p>
                <div className="md:grid grid-cols-3 pb-5 gap-5  py-4 px-5">
                  <div className=" space-y-2 mb-6 lg:mb-0">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">
                        {avgRating?.toFixed(1) || 0}/
                        <span className="text-2xl">5</span>
                      </span>{" "}
                      <span className="text-white text-nowrap bg-[#FD8C00] text-xs py-1 px-3">
                        {avgRating >= 4
                          ? "Top Rated"
                          : avgRating >= 3
                          ? "Excellent"
                          : avgRating >= 2
                          ? "Good"
                          : "Poor"}
                      </span>{" "}
                    </div>
                    <div className="flex items-center gap-2">
                      {" "}
                      <StarRating value={avgRating} />
                    </div>
                    <p className="text-gray500 text-xs font-medium text-gray-600">
                      {reviews?.length || 0} Ratings
                    </p>
                  </div>
                  <div className="col-span-2">
                    <ul className="space-y-1">
                      {ratings?.map((star, i) => (
                        <li key={i} className="flex gap-5 items-center">
                          <div className=" gap-2 w-[100px] ">
                            <StarRating value={5 - i} />
                          </div>

                          <span className="w-[120px] sm:w-[200px] h-2  bg-[#E5E5E5] inline-block relative">
                            <span
                              className="bg-[#FD8C00] absolute left-0 top-0 inline-block h-2"
                              style={{ width: `${star?.width}%` }}
                            ></span>
                          </span>
                          <span className="text-sm text-gray-700">
                            {star?.reviews}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-white text-sm text-gray-700 px-5 py-3 border-y border-gray-100 ">
                  Product Reviews
                </div>
                <ul className="bg-white divide-y divide-gray-100">
                  {reviews?.map((review, index) => (
                    <li className="py-3 px-5" key={index}>
                      <div className="mb-2">
                        <StarRating size={12} value={review?.rating} />
                        <div className="flex justify-between items-center">
                          <p className="flex items-center gap-1 text-sm text-gray-600">
                            <span className="text-gray-800">
                              {review?.userId?.name?.firstName}{" "}
                              {review?.userId?.name?.lastName}
                            </span>
                            <VerifiedIcon className="text-main" size={14} />
                          </p>
                          <p className="text-sm text-gray-500">
                            {formateDateRevalidate(review?.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {review?.comment}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div></div>
      </div>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Delivery and Return Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className=" font-semibold"> ডেলিভারি পদ্ধতি</p>
              <ul className="list-disc list-inside text-sm space-y-2 mt-1 mb-4 text-gray-800">
                <li>
                  <span>ঢাকার মধ্যেঃ </span> হোম ডেলিভারি।পণ্য হাতে পাবার পর দাম
                  পরিশোধ করুন।
                </li>
                <li>
                  <span>ঢাকার বাইরেঃ </span> দেশের সকল জেলা-উপজেলা এবং ইউনিয়ন
                  পর্যায়ে পাচ্ছেন হোম ডেলিভারি সুবিধা। পণ্য হাতে পাবার পর দাম
                  পরিশোধ করুন।
                </li>
              </ul>
            </div>
            <div>
              <p className=" font-semibold">রিটার্ন পলিসি</p>
              <ul className=" space-y-2 mt-1 mb-4 text-sm text-gray-800">
                <li>
                  প্রোডাক্টটি অবশ্যই ডেলিভারি ম্যানের সামনে দেখে-বুঝে নিবেন।
                  প্রোডাক্ট পছন্দ না হলে কিংবা কোন সমস্যা থাকলে আমাদের
                  হেল্পলাইনে কল করে আপনার সমস্যার কথা জানাবেন। অন্যথায়
                  প্রোডাক্ট আনবক্সিং করার সময় অবশ্যই ভিডিও করে সেটা আমাদের
                  পাঠাবেন। সমস্যা থাকলে আমরা সেটা এক্সচেঞ্জ করে দিবো তবে আপনাকে
                  পুনরায় ডেলিভারি চার্জ দিয়ে প্রোডাক্টটি রিসিভ করতে হবে।
                </li>
              </ul>
            </div>
            <div>
              <p className=" font-semibold">ডেলিভারী চার্জ</p>
              <ul className="list-disc list-inside space-y-2 mt-1 mb-4 text-sm text-gray-800">
                <li>
                  <span>ঢাকার মধ্যেঃ </span> 80/- টাকা
                </li>
                <li>
                  <span>ঢাকার বাইরেঃ </span> 130/- টাকা
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProductPage;
