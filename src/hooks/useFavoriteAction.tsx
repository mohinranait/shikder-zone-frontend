"use client";
import { TProduct } from "@/types/product.type";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { addFavoriteProduct, deleteFavoriteById } from "@/actions/favoriteApi";
import { removeFavorite, setFavorites } from "@/redux/features/favoriteSlice";

const useFavoriteAction = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { favorites } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // existing cart finding
  const isFavorite = (product: TProduct) =>
    favorites?.find((fav) => String(fav.product) === String(product._id));

  // toggle favorite
  const toggleFavorite = async (product: TProduct) => {
    if (!user?._id) {
      toast.error("Please login, Then try again");
      router.push(`/login?redirectTo=${pathName}`);
      return;
    }

    setLoading(true);
    const exists = isFavorite(product);

    if (exists?._id) {
      const res = await deleteFavoriteById({
        favoriteId: exists._id,
        userId: user._id,
      });

      if (res.success) {
        dispatch(removeFavorite(exists._id));
        toast.success("Removed successfully");
      }
    } else {
      try {
        const res = await addFavoriteProduct({
          userId: user._id,
          product: product._id,
        });

        if (res.success) {
          dispatch(setFavorites([...favorites, res.payload]));
          toast.success("Added to your profile");
        }
      } catch (error) {
        console.log({ error });
      }
    }
    setLoading(false);
  };
  return { favorites, isFavorite, loading, toggleFavorite };
};

export default useFavoriteAction;
