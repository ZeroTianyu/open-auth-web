import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <div className="h-full flex items-center justify-center bg-sky-500">
          {children}
        </div>
      </body>
    </html>
  );
}