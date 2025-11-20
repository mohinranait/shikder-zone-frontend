"use client";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/category-card";
import { useAppSelector } from "@/hooks/useRedux";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoriesSection = () => {
  const { categories } = useAppSelector((state) => state.category);
  const cates = categories?.filter((cat) => cat.parent === null);

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 ">
          <h2 className="text-3xl  font-bold text-gray-900 mb-1">
            Shop by <span className="text-brand">Categories</span>
          </h2>
          <p className=" text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of fresh and organic products across
            different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-6">
          {cates?.map((category, index) => (
            <CategoryCard category={category} index={index} key={index} />
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-6 lg:mt-8">
          <Link href={`/categories`}>
            <Button
              variant="outline"
              className="border-2  px-8 py-3 rounded-full  font-medium transition-all duration-300"
            >
              View All Categories <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
