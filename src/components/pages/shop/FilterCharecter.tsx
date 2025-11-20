"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterCharecter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSingleValueQuery = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("sort", value);
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <Select
      onValueChange={(e) => updateSingleValueQuery(e)}
      value={searchParams.get("sort") || ""}
    >
      <SelectTrigger className="w-[180px] h-9">
        <SelectValue placeholder="Sorting.." className="text-red-600" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">A-Z</SelectItem>
        <SelectItem value="desc">Z-A</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterCharecter;
