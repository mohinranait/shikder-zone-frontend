"use clinet";
import React from "react";
import { Minus, Plus } from "lucide-react";
import { TCartItems } from "@/types/cart.type";
import { useAppDispatch } from "@/hooks/useRedux";
import { addToCart } from "@/redux/features/shoppingCartSlice";
import { cn } from "@/lib/utils";

type Props = {
  cart: TCartItems;
  className?: string;
};
const CartCounter = ({ cart, className }: Props) => {
  const dispatch = useAppDispatch();

  const increment = () => {
    if (cart?.quantity < 20) {
      dispatch(addToCart({ ...cart, quantity: cart?.quantity + 1 }));
    }
  };

  const decrement = () => {
    if (cart?.quantity > 1) {
      dispatch(addToCart({ ...cart, quantity: cart?.quantity - 1 }));
    }
  };

  return (
    <div className="inline-flex gap-1 items-center">
      <button
        onClick={decrement}
        className={cn(
          "w-7 h-7 rounded-full border border-border flex items-center justify-center cursor-pointer",
          className
        )}
      >
        <Minus size={15} />
      </button>
      <span className="px-[6px] py-[3px] text-sm">{cart?.quantity}</span>
      <button
        onClick={increment}
        className={cn(
          "w-7 h-7 rounded-full border border-border flex items-center justify-center cursor-pointer",
          className
        )}
      >
        <Plus size={15} />
      </button>
    </div>
  );
};

export default CartCounter;
