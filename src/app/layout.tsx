import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentinel AI · Real-Time Fraud Intervention Voice Agent",
  description: "Multilingual zero-knowledge voice intervention agent for regulated UAE banking workflows. Built for ElevenLabs IGNYTE Hackathon Track 1.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070b14] text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
