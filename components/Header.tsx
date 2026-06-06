"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STYLES = {
  header:
    "w-full bg-white/60 backdrop-blur-md border-b border-white/40 sticky top-0 z-50 px-8 py-4 flex items-center justify-between",
  logoContainer: "flex items-center gap-2.5 cursor-pointer select-none group",

  // 💡 ロゴ画像が綺麗に収まるように、プロ仕様のレスポンシブスタイルを追加！
  logoImage:
    "h-8 w-auto object-contain transition-transform duration-300 group-hover:rotate-6 select-none",

  logoTextContainer: "flex flex-col",
  logoTitle:
    "text-base font-extrabold tracking-wider text-neutral-800 uppercase",
  logoSubtitle:
    "text-[9px] font-bold tracking-widest text-neutral-400 uppercase -mt-0.5",
  nav: "flex items-center gap-1 bg-neutral-100/60 p-1 rounded-2xl border border-neutral-200/20",
  navLink:
    "px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 select-none",
  activeLink: "bg-white text-orange-600 shadow-sm",
  inactiveLink: "text-neutral-500 hover:text-neutral-800 hover:bg-white/40",
};

export default function Header() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { path: "/", label: "Home" },
    { path: "/task", label: "Task" },
    { path: "/analysis", label: "Analysis" },
    { path: "/rewards", label: "Rewards" },
  ];

  return (
    <header className={STYLES.header}>
      {/* 🍊 ロゴエリア：logo.png をガッツリ反映する本物のマークアップに修正！ */}
      <Link href="/" className={STYLES.logoContainer}>
        {/* 💡 悠仁が用意してくれた画像を、Next.jsが全自動でインターネットに配信してくれるよ！ */}
        <img src="/logo.png" alt="Balaful Logo" className={STYLES.logoImage} />

        <div className={STYLES.logoTextContainer}>
          <h1 className={STYLES.logoTitle}>Balaful</h1>
          <span className={STYLES.logoSubtitle}>Work-Life Harmony</span>
        </div>
      </Link>

      {/* ナビゲーションバー */}
      <nav className={STYLES.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${STYLES.navLink} ${isActive ? STYLES.activeLink : STYLES.inactiveLink}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
