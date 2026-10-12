/**
 * api داشته باشیم باید از middelwareاستفاده کنیم
 */
"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("user");

    //  if (!user && pathname !== "/login") {
    //   router.replace("/login");
    //   return;
    // }

    if (user && pathname === "/login") {
      router.replace("/");
      return;
    }

  }, [pathname, router]);



  return <>{children}</>;
}