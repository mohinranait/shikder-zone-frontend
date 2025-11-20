import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";

import React from "react";

const BannerSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Apple</span>
                <br />
                <span className="bg-main bg-clip-text text-transparent">
                  iPhone 17 air
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                The thinnest iPhone ever. With the power of pro inside.
              </p>
            </div>

            <div className="flex items-center flex-wrap sm:flex-row gap-4">
              <div className="text-3xl w-full sm:w-auto font-bold text-gray-900">
                Starting from <span className="text-main">৳999</span>
              </div>
              <div className="text-lg text-gray-500 line-through">৳1000</div>
              <Badge className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                10% OFF
              </Badge>
            </div>

            <div className="flex items-center gap-6">
              <Button className="bg-main hover:bg-main-light text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300">
                Shop Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center flex-wrap gap-2 sm:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  4.9/5 (2,847 reviews)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-main" />
                <span className="text-gray-600 font-medium">
                  3-day delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                width={500}
                height={200}
                src={"/air.png"}
                alt="Premium Fresh Products"
                className="w-[400px] mx-auto h-auto rounded-2xl "
              />

              {/* Floating Cards */}
              <div className="absolute z-10 -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-main to-main-light rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">100% Original</div>
                    <div className="text-sm text-gray-500">Certified Fresh</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Fast Delivery</div>
                    <div className="text-sm text-gray-500">Within 30 mins</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
