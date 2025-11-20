import { cn } from "@/lib/utils";
import React from "react";

const SpinnerLoading = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center animate-spin justify-center w-5 h-5 rounded-full border-b-2 border-white",
        className
      )}
    ></span>
  );
};

export default SpinnerLoading;
