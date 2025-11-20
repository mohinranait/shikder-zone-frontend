import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { getAllCategorys } from "@/actions/categoriesApi";
import { getAllBrands } from "@/actions/brandApi";
import { getAllProducts } from "@/actions/productApi";
import { getAllAttributes } from "@/actions/attributeApi";
import ProductViewModal from "@/components/modals/ProductViewModal";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shikder Zone | All Products in one place",
  description: "Shikder Zone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catRes = await getAllCategorys();
  const brandRes = await getAllBrands();
  const productRes = await getAllProducts();
  const getAttributes = await getAllAttributes();
  const categories = catRes?.success ? catRes?.payload : [];
  const brands = brandRes?.success ? brandRes?.payload : [];
  const products = productRes?.success ? productRes?.payload?.products : [];
  const attributes = getAttributes?.success ? getAttributes?.payload : [];
  // console.log({ products });

  return (
    <html lang="en">
      <body className={` ${inter.className}   bg-gray-50 antialiased`}>
        <ReduxProvider
          brands={brands}
          categories={categories}
          products={products}
          attributes={attributes}
        >
          {children}
          <Toaster />
          <ProductViewModal />
        </ReduxProvider>
      </body>
    </html>
  );
}
