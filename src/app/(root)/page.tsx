// import BannerSection from "@/components/pages/home/BannerSection";
import BannerSection from "@/components/pages/home/BannerSection";
import CategoriesSection from "@/components/pages/home/categories-section";
import MasonaryProducts from "@/components/pages/home/masonary-products";
import ProductSection from "@/components/pages/home/ProductSection";
import UtilsProductSection from "@/components/pages/home/utils-product-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gift, Headphones, Shield, Truck } from "lucide-react";
import React from "react";
const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
    color: "text-green-500",
    IconBgColor: "bg-green-100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: Gift,
    title: "Special Offers",
    description: "Regular discounts and promotions",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
  },
];

const HomePage = () => {
  return (
    <main>
      {/* Hero Banner */}
      <BannerSection />

      {/* Categoriys section */}
      <CategoriesSection />

      <ProductSection />

      {/* Featured Products - Masonry Layout */}
      <MasonaryProducts />

      <UtilsProductSection />

      {/* Newsletter */}
      <section className="bg-muted/50 py-12 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-xl text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground">
              Stay updated with our latest products and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <Input
                placeholder="Enter your email"
                type="email"
                className="sm:flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group text-center p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center group-hover:bg-main transition-all  w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-main group-hover:text-slate-50" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-main">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
