import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stellar View Cleaning",
  description: "Window cleaning for homes and small businesses in Sacramento.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
