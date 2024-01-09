import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Friedly Advisor",
  description: "Make NSU Advising Phase Easier with Automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#CDF5FD]">
      <body>{children}</body>
    </html>
  );
}
