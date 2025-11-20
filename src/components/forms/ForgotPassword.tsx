"use client";
import { LoaderCircle } from "lucide-react";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPassword } from "@/actions/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type Inputs = {
  email: string;
};

const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email field is required" })
    .nonempty({ message: "Email field is required" })
    .email({ message: "Invalid email address" })
    .min(5, { message: "Charecter must be at lest 5 charecter" }),
});

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data.email);
      if (res?.success) {
        const token = res.payload;
        reset();
        router.push(`/verify/${token}?verifyType=forgot&email=${data?.email}`);
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
            Forgot Password
          </p>
          <p className="text-center  text-gray-500 text-sm">
            Enter your registered email to receive a password reset OTP.
          </p>
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
        </div>
        <div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <LoaderCircle className="animate-spin" />}
            Forgot Password
          </Button>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
