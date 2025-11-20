"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { Swiper as SwiperClass } from "swiper/types";
import "./productViewSlider.css";
import { TProduct } from "@/types/product.type";
import { useAppSelector } from "@/hooks/useRedux";

type Props = {
  product: TProduct;
};

const ProductViewSlider = ({ product }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const { variant } = useAppSelector((state) => state.product);

  const mainSwiperRef = useRef<SwiperClass | null>(null);

  // Load initial images
  useEffect(() => {
    let pImgs: string[] = [];
    const { featureImage, imageGallery } = product || {};
    if (product?.variant === "Variable Product") {
      const imgs = product?.variations
        ?.map((item) => item?.image)
        .filter(Boolean);
      pImgs = [...(imgs ?? [])];
    } else {
      const gallarys = (imageGallery as string[]) || [];
      pImgs = [featureImage?.image, ...gallarys];
    }
    setImages(pImgs);
  }, [product]);

  // Scroll to the matching variant image
  useEffect(() => {
    if (!variant?.image || !images?.length || !mainSwiperRef.current) return;

    const imageIndex = images.findIndex((img) => img === variant.image);
    if (imageIndex !== -1) {
      mainSwiperRef.current.slideTo(imageIndex);
    }
  }, [variant?.image, images]);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-2"
      >
        {images?.map((img, i) => (
          <SwiperSlide
            key={i}
            className="min-h-[400px]  flex items-center p-2 rounded bg-white"
            style={{ display: "flex" }}
          >
            <Image
              alt="image"
              width={400}
              height={400}
              src={img}
              className="w-auto mx-auto max-h-[400px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map((img, i) => (
          <SwiperSlide key={i} className="h-[70px]">
            <Image
              alt="image"
              width={100}
              height={100}
              src={img}
              className="object-cover h-[70px] cursor-pointer "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductViewSlider;
