import { redirect } from "next/navigation";

export default function LegacyAdminAuthRedirect() {
  redirect("/admin/login");
}

