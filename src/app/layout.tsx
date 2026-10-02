import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberShieldX — Next-Gen AI Threat Detection & Command Center",
  description:
    "AI-powered cybersecurity intelligence platform that detects suspicious activities, analyzes abnormal behavior, calculates real-time risk scores with SHAP explainability, and orchestrates proactive defense.",
  keywords: [
    "cybersecurity",
    "threat detection",
    "explainable AI",
    "SOC",
    "command center",
    "SHAP",
    "risk scoring",
    "zero trust",
  ],
  authors: [{ name: "CyberShieldX Defense Systems" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#02040a] text-slate-200 selection:bg-[#00f3ff] selection:text-black">
        {children}
      </body>
    </html>
  );
}
