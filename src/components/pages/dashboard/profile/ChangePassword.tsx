"use client";
import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/actions/authApi";
import { useAppSelector } from "@/hooks/useRedux";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const ChangePassword = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // validate fields
  const validate = (name: string, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required.";
    } else if (value.length < 6) {
      error = "Password must be at least 6 characters.";
    } else if (value.length > 50) {
      error = "Password must be at most 50 characters.";
    } else if (name === "confirmPassword" && formData.newPassword !== value) {
      error = "Passwords do not match.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // handle input change + instant validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // recheck all validations before submit
    Object.entries(formData).forEach(([name, value]) => {
      validate(name, value);
    });

    // if any error still exists, stop submit
    const hasError = Object.values(errors).some((err) => err !== "");
    if (hasError) return;

    try {
      if (!user?._id) return;
      const data = await changePassword({
        userId: user?._id,
        password: formData?.confirmPassword,
        oldPassword: formData?.currentPassword,
      });

      if (data?.success) {
        toast.success("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data?.message || "Failed to change password");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Current Password */}
      <div>
        <Label htmlFor="currentPassword">Present Password</Label>
        <InputGroup>
          <InputGroupInput
            name="currentPassword"
            type={showPassword.current ? "text" : "password"}
            placeholder="••••••••"
            className="h-8"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <InputGroupAddon align="inline-start">
            <Lock />
          </InputGroupAddon>
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                current: !prev.current,
              }))
            }
          >
            {showPassword.current ? <EyeOff /> : <Eye />}
          </InputGroupAddon>
        </InputGroup>
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
        )}
      </div>

      {/* New Password */}
      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <InputGroup>
          <InputGroupInput
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            placeholder="••••••••"
            className="h-8"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <InputGroupAddon align="inline-start">
            <Lock />
          </InputGroupAddon>
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                new: !prev.new,
              }))
            }
          >
            {showPassword.new ? <EyeOff /> : <Eye />}
          </InputGroupAddon>
        </InputGroup>
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <InputGroup>
          <InputGroupInput
            name="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="••••••••"
            className="h-8"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <InputGroupAddon align="inline-start">
            <Lock />
          </InputGroupAddon>
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirm: !prev.confirm,
              }))
            }
          >
            {showPassword.confirm ? <EyeOff /> : <Eye />}
          </InputGroupAddon>
        </InputGroup>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Update Password
      </Button>
    </form>
  );
};

export default ChangePassword;
