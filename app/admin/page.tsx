"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session === "true") {
      router.push("/community/admin");
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  return <div>Redirection...</div>;
}
