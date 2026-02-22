import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

// Bold, geometric sans — distinctive and modern, great for a creative
const syne = Syne({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Refined mono with character — IBM heritage, not generic
const ibmMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// Elegant high-contrast serif — cinematic, editorial presence
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ivie Aiwuyo | Filmmaker. Photographer. Designer. Storyteller.",
  description:
    "Portfolio of Ivie Aiwuyo — Nigerian-American filmmaker, photographer, and designer from Chicago. Currently at Dartmouth College.",
  keywords: [
    "Ivie Aiwuyo",
    "filmmaker",
    "photographer",
    "designer",
    "Dartmouth",
    "Chicago",
    "Nigerian-American",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${ibmMono.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
