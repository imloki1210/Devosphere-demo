import type { Metadata } from "next";
import { Outfit, Inter, Roboto } from "next/font/google";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devosphere: Hire Elite, On-Demand Tech Talent",
  description:
    "Scale your product engineering team with vetted, highly motivated software developers from around the world. We hire developers who are ready to scale with you.",
  metadataBase: new URL("https://x-team.com"),
  openGraph: {
    title: "Devosphere: Hire Elite, On-Demand Tech Talent",
    description: "Scale your product engineering team with vetted, highly motivated software developers.",
    url: "https://x-team.com",
    siteName: "Devosphere",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devosphere: Hire Elite, On-Demand Tech Talent",
    description: "Scale your product engineering team with vetted, highly motivated software developers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${roboto.variable} h-full antialiased light`}
    >
      <body className="min-h-full flex flex-col bg-background-main text-text-primary font-body selection:bg-brand-primary selection:text-white">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
