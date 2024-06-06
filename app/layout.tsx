import type { Metadata } from "next";
import { Inter } from "next/font/google";
import JotaiProvider from "@/providers/jotai-providers";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <JotaiProvider>
            <Navbar />
            {children}
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}