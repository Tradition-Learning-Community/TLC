import { permanentRedirect } from "next/navigation";

export default function LegacyAboutRedirect() {
  permanentRedirect("/tlc");
}
