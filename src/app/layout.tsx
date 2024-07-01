import type { Metadata } from "next";
import "./globals.css";
import Header from './components/Header';

export const metadata: Metadata = {
  title: "Missing Activist",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#545454] text-black flex justify-center">
        <div className="w-full max-w-md relative bg-white shadow-md">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
