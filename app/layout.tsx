// Root layout: sets the page metadata and wraps every page in the <html>/<body> shell.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dallas Weather App",
  description: "Weather application for Dallas, Texas",
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
