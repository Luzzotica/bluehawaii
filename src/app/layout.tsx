import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Blue Hawaii Homes | Custom Home Builder in Maui",
  description:
    "Blue Hawaii Homes is a Maui-based home building company specializing in custom luxury homes, renovations, and sustainable design for island living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
