import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ShopFilterSection from "@/components/pages/shop/ShopFilterSection";
import ShopProducts from "@/components/pages/shop/ShopProducts";
import { getAllProductsForShopPage } from "@/actions/productApi";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const search = searchParams.search || "";
  const category = searchParams.cat || "";
  const brands = searchParams.brandIds || "";
  const shipping = searchParams.shipping || "";
  const ratings = searchParams.ratings || "";
  const stock = searchParams.stock || "";
  const feature = searchParams.feature || "";
  const priceRange = searchParams.priceRange || "";
  const sort = searchParams.sort || "";
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 20;

  const query = new URLSearchParams({
    category: category || "",
    priceRange: priceRange || "",
    search: search || "",
    brands: brands || "",
    shipping: shipping || "",
    stock: stock || "",
    feature: feature || "",
    ratings: ratings || "",
    sort: sort || "",
    page: String(page) || "1",
    limit: String(limit) || "20",
  });
  const res = await getAllProductsForShopPage({ query });

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
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container px-2 md:px-0  flex gap-3">
        <div className="hidden md:block">
          <div className="w-[280px] h-full">
            <ShopFilterSection />
          </div>
        </div>
        <ShopProducts
          products={res?.payload?.products}
          total={res?.payload?.total}
          page={Number(page)}
          limit={Number(limit)}
        />
      </div>
    </section>
  );
};

export default ShopPage;
