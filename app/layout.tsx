import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./frontend.css";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { ThemeProvider } from "@/components/theme-provider";

// Let next/font generate metric-adjusted fallbacks; the CSS tokens retain generic alternatives.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-playfair-display",
  adjustFontFallback: true,
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
