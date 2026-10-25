// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next";
import { Caveat, Manrope, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Manrope matches the ReelHire mobile app (app/assets/font/Manrope).
const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Handwriting for the doodled notes over the phones, as in the app's welcome screen.
const fontHand = Caveat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-hand",
});

export const metadata: Metadata = {
  title: "ReelHire | Video-First Hiring App",
  description:
    "ReelHire is the video-first hiring app for tech roles. Every candidate applies with a short video resume and every job is posted as a video reel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontHand.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
