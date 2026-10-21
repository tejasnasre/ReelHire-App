// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next";
import { Manrope, Fira_Code } from "next/font/google";
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

export const metadata: Metadata = {
  title: "ReelHire: Tech hiring, told in reels",
  description:
    "ReelHire is a reels-style hiring app for tech roles. Candidates apply with short video resumes and teams post video job reels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
