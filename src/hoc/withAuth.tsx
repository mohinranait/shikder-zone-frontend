"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import AuthLoading from "@/components/skeleton/AuthLoading";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent = (props: P) => {
    const { isLoading, user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
      } else {
      }
    }, [isLoading, user, pathname, router]);

    if (isLoading || !user) {
      return <AuthLoading />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
