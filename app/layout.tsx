import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saint Louis Weather App",
  description: "Weather application for Saint Louis, Missouri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
