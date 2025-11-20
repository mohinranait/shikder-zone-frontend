"use client";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { userLogin } from "@/actions/authApi";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setAuthUser } from "@/redux/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { setAllCarts } from "@/redux/features/shoppingCartSlice";
import { getAllFavoriteProducts } from "@/actions/favoriteApi";
import { setFavorites } from "@/redux/features/favoriteSlice";
import Logo from "../shared/Logo";
import { AxiosError } from "axios";

type Inputs = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z
    .string({ message: "Email field is required" })
    .nonempty({ message: "Email field is required" })
    .email({ message: "Invalid email address" })
    .min(5, { message: "Charecter must be at lest 5 charecter" }),
  password: z
    .string({ message: "Passowd field is required" })
    .nonempty({ message: "Password field is required" })
    .min(6, { message: "Password at lest 6 charecters" }),
});

const LoginForm = () => {
  const { carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const params = useSearchParams();
  const redirectTo = params.get("redirectTo");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await userLogin(data);
      if (res?.success) {
        dispatch(setAuthUser(res?.payload));
        const favoritesRes = await getAllFavoriteProducts();
        if (favoritesRes?.success) {
          dispatch(setFavorites(favoritesRes?.payload));
        }

        reset();
        toast.success("Login successfull");

        // Update Shopping cart only user
        if (carts?.length > 0) {
          const allCarts = carts?.map((cart) => ({
            ...cart,
            user: res?.payload?._id,
          }));
          dispatch(setAllCarts(allCarts));
        }

        router.push(`${redirectTo ? redirectTo : "/"}`);
      } else {
        toast.error("Somthing wrong");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[350px] mx-auto">
        <div>
          <div className="flex mb-10 justify-center">
            <Logo />
          </div>
          {/* <p className="text-center  text-primary font-bold text-3xl">
            Wellcome Back
          </p>
          <p className="text-center  text-gray-500 text-sm">
            Please login your user account
          </p> */}
        </div>
        <div className="mt-4 mb-6  space-y-5">
          <div className="">
            <Input
              type="text"
              {...register("email")}
              placeholder="Email address"
              className="focus-visible:outline-offset-0 focus-visible:ring-offset-0"
            />
            {errors.email && (
              <p className="text-red-500 text-xs pt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2/4 right-2 cursor-pointer  -translate-y-2/4"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-600" />
                )}
              </span>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="focus-visible:outline-offset-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex items-center  justify-between">
              <p className="text-red-500 text-xs pt-1">
                {errors.password && errors.password.message}
              </p>
              <Link
                className="text-gray-500 text-xs font-normal"
                href={"/forgot-passowrd"}
              >
                Forgot password
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Button className="w-full" disabled={isLoading}>
            {" "}
            {isLoading && <LoaderCircle className="animate-spin" />}
            Login
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-sm text-gray-500 text-center">
          Create a new account{" "}
          <Link
            href={`/register?redirectTo=${redirectTo}`}
            className="underline hover:text-main"
          >
            Register
          </Link>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
