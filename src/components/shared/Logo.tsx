import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  bdClass?: string;
};
const Logo = ({ bdClass }: Props) => {
  return (
    <>
      <Link href={"/"} className="inline-flex items-center">
        {/* <Image src={"/logo.png"} width={200} height={100} alt="Logo" /> */}
        <div className="flex items-center space-x-2">
          <div className="bg-main text-white p-2 rounded-lg">
            <span className="text-xl font-bold">
              <ShoppingCart />{" "}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-main">
              Collection<span className={cn("text-gray-950", bdClass)}>BD</span>{" "}
            </h1>
            <p className="text-xs text-gray-500">brandcollectionbd.com</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Logo;
