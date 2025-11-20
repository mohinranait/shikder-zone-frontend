import VerifyForm from "@/components/forms/VerifyForm";
import React from "react";

const EmailVerifyPage = async ({ params }: { params: { token: string } }) => {
  return <VerifyForm token={params?.token} />;
};

export default EmailVerifyPage;
