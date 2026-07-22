import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Titan Soles — AI-Powered Footwear Marketplace",
  description:
    "Discover premium footwear through natural conversation. Titan AI finds your perfect shoes from verified stores worldwide.",
  keywords: [
    "shoes",
    "footwear",
    "AI shopping",
    "sneakers",
    "marketplace",
    "Titan Soles",
  ],
  openGraph: {
    title: "Titan Soles — AI-Powered Footwear Marketplace",
    description:
      "Find your perfect shoes with natural language. Verified stores. AI-curated recommendations.",
    type: "website",
    locale: "en_US",
    siteName: "Titan Soles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan Soles — AI-Powered Footwear Marketplace",
    description:
      "Find your perfect shoes with natural language. Verified stores. AI-curated recommendations.",
  },
  robots: { index: true, follow: true },
};

// ✅ YEH NAYA VIEWPORT EXPORT ADD KIYA GAYA HAI (Zoom Issue Fix)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#08111E", // Aapke bg-[#08111E] ke sath match karne ke liye
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="h-full min-h-screen bg-[#08111E] font-sans text-base text-white antialiased">
        <Providers>
          <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}