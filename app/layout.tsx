import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "TLC — Tradition Learning",
  description:
    "TLC — Plateforme open-source pour l'approche Tradition Learning : IA performante, interprétable et accessible.",
  openGraph: {
    title: "TLC — Tradition Learning",
    description:
      "Plateforme open-source pour l'approche Tradition Learning : IA performante, interprétable et accessible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
