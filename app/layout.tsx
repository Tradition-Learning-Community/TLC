import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "TLC — Tradition Learning Community",
  description: "Recherche ouverte pour une intelligence artificielle sobre, accessible et utile.",
  openGraph: {
    title: "TLC — Tradition Learning Community",
    description: "Recherche ouverte pour une intelligence artificielle sobre, accessible et utile.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" suppressHydrationWarning><body className="min-h-screen bg-background text-foreground"><ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange><div className="flex min-h-screen flex-col"><Header/><main id="top" className="min-h-screen flex-1">{children}</main><FooterSection/></div><BackToTop/></ThemeProvider></body></html>;
}
