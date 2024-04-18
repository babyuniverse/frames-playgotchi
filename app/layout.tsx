import type { Metadata } from "next";
import { Fragment_Mono } from "next/font/google";
import "./globals.css";

const inter = Fragment_Mono({
  subsets: ["latin"],
  weight: "400"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
