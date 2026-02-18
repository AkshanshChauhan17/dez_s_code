import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Escort & VIP Call Girls Services Online",
  description: "Find luxury escort services at affordable price with trusted VIP call girls services online. Easy booking, privacy assured & fast response.",
  alternates: {
    canonical: "https://dezirexx.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "4Nfyzo-QonzeLniRFJbs71nlJnI8dUYojoXH4w6itkE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
