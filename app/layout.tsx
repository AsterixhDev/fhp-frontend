import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FHP",
  description: "Watch short drama easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased w-screen h-dvh bg-neutral-900`}>
        {children}
      </body>
    </html>
  );
}
