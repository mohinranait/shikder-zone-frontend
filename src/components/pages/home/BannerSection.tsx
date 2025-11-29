import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import React from "react";

//  Slider for home page
const BannerSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container mx-auto  md:py-4">
        <Carousel className="w-full gap-0 ">
          <CarouselContent>
            {["slider/1.jpg", "slider/3.avif"].map((img, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Image
                    src={`/${img}`}
                    width={1500}
                    height={600}
                    alt="Image"
                    className="w-full h-auto"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" />
        </Carousel>
      </div>
    </section>
  );
};

export default BannerSection;
