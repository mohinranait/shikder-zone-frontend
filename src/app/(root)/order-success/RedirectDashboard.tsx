"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";
import Link from "next/link";
import React from "react";

const RedirectDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return null;
  return (
    <Link href="/dashboard">
      <Button variant={"outline"}>Back to Dashboard</Button>
    </Link>
  );
};

export default RedirectDashboard;
