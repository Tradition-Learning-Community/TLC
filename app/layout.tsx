import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./frontend.css";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { ThemeProvider } from "@/components/theme-provider";

// Load the checked-in Latin subsets and generate metric-adjusted fallbacks.
const inter = localFont({
  src: [
    { path: "../public/fonts/inter-latin.woff2", weight: "400" },
    { path: "../public/fonts/inter-latin.woff2", weight: "500" },
    { path: "../public/fonts/inter-latin.woff2", weight: "600" },
    { path: "../public/fonts/inter-latin.woff2", weight: "700" },
  ],
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
  preload: true,
});

const playfairDisplay = localFont({
  src: [
    { path: "../public/fonts/playfair-display-latin.woff2", weight: "500" },
    { path: "../public/fonts/playfair-display-latin.woff2", weight: "600" },
    { path: "../public/fonts/playfair-display-latin.woff2", weight: "700" },
  ],
  style: "normal",
  display: "swap",
  variable: "--font-playfair-display",
  adjustFontFallback: "Times New Roman",
  preload: true,
});

export const metadata: Metadata = {
  title: "TLC — Tradition Learning Community",
  description: "Site officiel de Tradition Learning Community : théorie Tradition Learning, bibliothèque tllib, recherche, publications et participation.",
  openGraph: {
    title: "TLC — Tradition Learning Community",
    description: "Tradition Learning, tllib et la communauté scientifique TLC : ressources et travaux publics.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className={`${inter.variable} ${playfairDisplay.variable}`} suppressHydrationWarning><body className="min-h-screen bg-background text-foreground"><a href="#main-content" className="skip-link">Aller au contenu</a><ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange><div className="flex min-h-screen flex-col"><Header/><main id="main-content" tabIndex={-1} className="min-h-screen flex-1">{children}</main><FooterSection/></div><BackToTop/></ThemeProvider></body></html>;
}
