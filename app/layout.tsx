import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stellar View Services",
  description: "Window cleaning for homes and small businesses in Sacramento.",
  icons: {
    icon: "/static/images/SVC_logo_3a.png",
  },
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
