"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  totalPages: number;
  limit: number;
};
const ShopPagination = ({ page, totalPages, limit }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Generate page numbers (show max 5)
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(page - 2, 1);
    const end = Math.min(start + 4, totalPages);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // Handle page click (client-side navigation)
  const handlePageClick = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    params.set("limit", limit.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex justify-center mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(Math.max(page - 1, 1));
              }}
            />
          </PaginationItem>

          {getPageNumbers().map((num) => (
            <PaginationItem key={num}>
              <PaginationLink
                href="#"
                isActive={num === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(num);
                }}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(Math.min(page + 1, totalPages));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ShopPagination;
