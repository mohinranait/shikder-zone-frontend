"use client";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { changeForgotPassword } from "@/actions/authApi";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

import { AxiosError } from "axios";

type Inputs = {
  newPassword: string;
  confirmPassword: string;
};

const resetSchema = z
  .object({
    newPassword: z
      .string({ message: "New passowd field is required" })
      .nonempty({ message: "New password field is required" })
      .min(6, { message: "New password at lest 6 charecters" }),

    confirmPassword: z
      .string({ message: "Confirm passowd field is required" })
      .nonempty({ message: "Confirm password field is required" })
      .min(6, { message: "Confirm password at lest 6 charecters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangeForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(resetSchema),
  });

  const params = useSearchParams();
  const redirectTo = params.get("redirectTo");

  const [showPassword, setShowPassword] = useState<{
    new: boolean;
    confirm: boolean;
  }>({
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const tokenFromLS = localStorage.getItem("forgot");
    if (!tokenFromLS) return;
    const token = JSON.parse(tokenFromLS);
    setIsLoading(true);
    try {
      const res = await changeForgotPassword({
        password: data?.confirmPassword,
        token,
      });
      if (res?.success) {
        localStorage.removeItem("forgot");
        reset();
        toast.success("Reset successfull");
        router.push(`${redirectTo ? redirectTo : "/login"}`);
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
          <p className="text-center mb-2 text-primary font-bold text-3xl">
            Reset Your Password
          </p>
          <p className="text-center  text-gray-500 text-sm">
            Enter a strong new password to secure your account.
          </p>
        </div>
        <div className="mt-4 mb-6  space-y-5">
          <div>
            <div className="relative">
              <span
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute top-2/4 right-2 cursor-pointer  -translate-y-2/4"
              >
                {showPassword?.new ? (
                  <EyeOff size={18} className="text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-600" />
                )}
              </span>
              <Input
                {...register("newPassword")}
                type={showPassword?.new ? "text" : "password"}
                placeholder="******"
                className="focus-visible:outline-offset-0 focus-visible:ring-offset-0"
              />
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute top-2/4 right-2 cursor-pointer  -translate-y-2/4"
              >
                {showPassword?.confirm ? (
                  <EyeOff size={18} className="text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-600" />
                )}
              </span>
              <Input
                {...register("confirmPassword")}
                type={showPassword?.confirm ? "text" : "password"}
                placeholder="******"
                className="focus-visible:outline-offset-0 focus-visible:ring-offset-0"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Button className="w-full" disabled={isLoading}>
            {" "}
            {isLoading && <LoaderCircle className="animate-spin" />}
            Reset Password
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangeForgotPassword;
