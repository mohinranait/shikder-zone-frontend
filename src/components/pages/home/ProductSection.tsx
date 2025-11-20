"use client";
import { getAllSections } from "@/actions/sectionApi";
import { TSection } from "@/types/section.type";
import React, { useEffect, useState } from "react";
import SectionRow from "./SectionRow";
import { Skeleton } from "@/components/ui/skeleton";

const ProductSection = () => {
  const [sections, setSections] = useState<TSection[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    (async () => {
      const response = await getAllSections();
      if (response?.success) {
        setSections(response.payload?.sections || []);
      }
    })();
    setIsFetching(false);
  }, []);

  if (isFetching) {
    return (
      <div className="space-x-4">
        <Skeleton className="h-12 " />
        <div className="grid grid-cols-2 lg:grid-cols-5  space-y-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32 " />
          <Skeleton className="h-32 " />
          <Skeleton className="h-32 " />
          <Skeleton className="h-32 " />
        </div>
      </div>
    );
  }

  return (
    <>
      {sections?.map((section, idx) => {
        return (
          <section key={idx} className="py-10">
            <div>
              <div className="px-2 md:px-0 container">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 ">
                      {section?.name}
                    </p>
                  </div>
                </div>
                <SectionRow section={section} />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default ProductSection;
