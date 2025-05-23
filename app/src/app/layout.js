import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import ContextProvider from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto Estate",
  description: "Next-Gen Real Estate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <Provider>{children}</Provider>
        </ContextProvider>
      </body>
    </html>
  );
}
