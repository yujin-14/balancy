// src/app/layout.tsx
import "./globals.css";
import React from "react";
import Header from "@/components/Header";

export const metadata = {
  title: "Balaful | Work-Life Harmony App", // 💡 Balancy から Balaful へ変更！
  description: "仕事と生活のバランスを、蜜柑の天秤で整えるご自愛アプリ",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFEFE4] to-[#FFDFCC] font-sans antialiased selection:bg-orange-100">
        <Header />
        <div className="pt-4">{children}</div>
      </body>
    </html>
  );
}
