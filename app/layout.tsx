import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "TLC — Tradition Learning",
  description:
    "TLC est une communauté scientifique ouverte qui développe Tradition Learning, une recherche sur de nouvelles façons d’apprendre pour les intelligences artificielles.",
  openGraph: {
    title: "TLC — Tradition Learning",
    description:
      "Découvrez Tradition Learning, les recherches de TLC et les façons de contribuer ou soutenir le projet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="min-h-screen flex-1 ">
              {children}
            </main>

            <FooterSection />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
