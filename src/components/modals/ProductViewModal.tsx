"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LeftProductBar from "../pages/product/left-product-bar";
import MiddleProductBar from "../pages/product/middle-product-bar";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProductModal } from "@/redux/features/uiSlice";

const ProductViewModal = () => {
  const { productModalOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const product = productModalOpen;
  if (!product) {
    return;
  }

  const handleOpenChange = () => {
    dispatch(setProductModal(null));
  };
  return (
    <Dialog open={!!product} onOpenChange={handleOpenChange}>
      <DialogContent className="lg:max-w-[1000px] ">
        <div className="  lg:grid md:grid-cols-2 max-h-[90vh] overflow-y-auto gap-4">
          <LeftProductBar product={product} className="xl:w-[450px] " />
          <MiddleProductBar product={product} avgRating={2} totalReview={2} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModal;
