import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heesha Cakes n Treats | Luxury in every bite",
  description: "Best cakes in Surulere and Ilorin. Premium, customized, and luxury cakes for all occasions.",
  keywords: ["Best cakes in Surulere", "Luxury cakes Lagos", "Heesha Cakes n Treats", "Lagos Cakes", "Ilorin Cakes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        {children}
      </body>
    </html>
  );
}
