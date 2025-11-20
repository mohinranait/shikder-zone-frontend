"use client";
import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotEmailVerify, verifyEmailAccount } from "@/actions/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export type TVerifyEmailType = {
  token: string;
  code: string;
};

const verifySchema = z.object({
  code: z
    .string()
    .trim()
    .nonempty({ message: "Give me verify code (Check Email)" })
    .min(6, { message: "Enter 6 character code" })
    .max(6, { message: "Enter 6 character code" }),
});
type Props = {
  token: string;
};
const VerifyForm: FC<Props> = ({ token }) => {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo");
  const verifyType = params.get("verifyType");
  const email = params.get("email");
  const {
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<TVerifyEmailType>({
    resolver: zodResolver(verifySchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<TVerifyEmailType> = async (data) => {
    setIsLoading(true);

    if (verifyType === "forgot") {
      // forgot
      try {
        const res = await forgotEmailVerify({ ...data, token });
        if (res.success) {
          const token = res?.payload?.token;
          localStorage.setItem("forgot", JSON.stringify(token));
          router.push("/change-password");
        }
      } catch (error) {
        const err = error as AxiosError<{ message?: string }>;

        if ("Invalid your verify request" === err.response?.data?.message) {
          setError("code", {
            type: "manual",
            message: err.response?.data?.message,
          });
        } else {
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      }
    } else {
      try {
        const res = await verifyEmailAccount({ ...data, token });
        if (res?.success) {
          toast.success("Verify successfull");
          router.push(`/login?redirectTo=${redirectTo}`);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        console.log({ error });
        const err = error as AxiosError<{ message?: string }>;

        if ("Invalid your verify request" === err.response?.data?.message) {
          setError("code", {
            type: "manual",
            message: err.response?.data?.message,
          });
        } else {
          toast.error(err.response?.data?.message || "Something went wrong");
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[350px] mx-auto">
      <div>
        <p className="text-center mb-2 text-primary font-bold text-3xl">
          Verify Eamil
        </p>
        <p className="text-center  text-gray-500 text-sm">
          Your 6 digit verification code has been sent to{" "}
          <span className="text-main">{email}</span>
        </p>
      </div>
      <div className="mt-4 mb-6">
        <div className="flex justify-center">
          <InputOTP
            onChange={(value) => setValue("code", value)}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* <Input
            type="text"
            {...register("code")}
            placeholder="6 Digit verify code"
            className="focus-visible:outline-offset-0 focus-visible:ring-offset-0"
          />
          {errors.code && (
            <p className="text-red-500 text-xs pt-1">{errors.code.message}</p>
          )} */}
        </div>
        {errors.code && (
          <p className="text-red-500 text-center text-xs pt-1">
            {errors.code.message}
          </p>
        )}
      </div>
      <div>
        <Button className="w-full" disabled={isLoading}>
          {" "}
          {isLoading && <LoaderCircle className="animate-spin" />} Verify
        </Button>
      </div>
    </form>
  );
};

export default VerifyForm;
