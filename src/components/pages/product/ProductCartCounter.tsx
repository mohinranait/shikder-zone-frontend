"use client";
import { Minus, Plus } from "lucide-react";

type Props = {
  decrement: () => void;
  increment: () => void;
  quantity: number;
};
const ProductCartCounter = ({ increment, decrement, quantity }: Props) => {
  return (
    <>
      <div className="rounded gap-1 inline-flex items-center ">
        <button
          disabled={quantity === 1 ? true : false}
          onClick={decrement}
          className={`${
            quantity === 1
              ? " text-slate-400 hover:bg-slate-200 hover:text-slate-400"
              : ""
          } w-10 h-10 rounded-full flex items-center justify-center border border-main bg-main   text-white cursor-pointer`}
        >
          <Minus className="" size={16} />
        </button>

        <span className=" w-8 text-center block">{quantity}</span>

        <button
          disabled={quantity === 20 ? true : false}
          onClick={increment}
          className={` ${
            quantity === 20
              ? " text-slate-400 hover:bg-slate-200 hover:text-slate-400"
              : ""
          } w-10 h-10 rounded-full flex items-center justify-center border border-main bg-main   text-white cursor-pointer`}
        >
          <Plus className="" size={16} />
        </button>
      </div>
    </>
  );
};

export default ProductCartCounter;
