import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Royal Scout Intelligence 2027 | Rajasthan Royals SupeRR Selector",
  description: "Advanced cricket scouting and player intelligence under pressure for IPL and T20I (2022-2026)",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
