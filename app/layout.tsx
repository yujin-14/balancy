// src/app/layout.tsx
import "./globals.css";
import React from "react";
import Header from "@/components/Header"; // 💡 ヘッダーをここに1回だけ読み込む！

export const metadata = {
  title: "Balancy | Work-Life Harmony App",
  description: "仕事と生活のバランスを、蜜柑の天秤で整えるご自愛アプリ",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      {/* 💡 ページ全体の共通グラデーション背景も、ここに1箇所にまとめるのがプロの技！ */}
      <body className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFEFE4] to-[#FFDFCC] font-sans antialiased selection:bg-orange-100">
        {/* 🧭 全ページ共通で上部に絶対表示される神ヘッダー */}
        <Header />

        {/* 📦 ここに各ページ（HomeやTask）の中身が、ヘッダーの下にスポッとはまり込むよ！ */}
        <div className="pt-4">{children}</div>
      </body>
    </html>
  );
}
