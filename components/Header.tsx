"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STYLES = {
  // 💡 flex-col と md:flex-row を組み合わせて、スマホでの文字被りを100%完全ガード！
  header:
    "w-full bg-white/60 backdrop-blur-md border-b border-white/40 sticky top-0 z-50 px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-0",

  logoContainer: "flex items-center gap-2.5 cursor-pointer select-none group",
  logoImage:
    "h-8 w-auto object-contain transition-transform duration-300 group-hover:rotate-6 select-none",
  logoTextContainer: "flex flex-col",
  logoTitle:
    "text-base font-extrabold tracking-wider text-neutral-800 uppercase",
  logoSubtitle:
    "text-[9px] font-bold tracking-widest text-neutral-400 uppercase -mt-0.5",

  // 💡 スマホでメニューが窮屈にならないように、ちょっとだけ文字サイズとパディングを調整できるようにしたよ！
  nav: "flex items-center gap-1 bg-neutral-100/60 p-1 rounded-2xl border border-neutral-200/20 max-w-full overflow-x-auto whitespace-nowrap",
  navLink:
    "px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[11px] md:text-xs font-bold tracking-wide transition-all duration-200 select-none",

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
      {/* ロゴエリア */}
      <Link href="/" className={STYLES.logoContainer}>
        <img src="/logo.png" alt="Balaful Logo" className={STYLES.logoImage} />
        <div className={STYLES.logoTextContainer}>
          <h1 className={STYLES.logoTitle}>Balaful</h1>
          <span className={STYLES.logoSubtitle}>Work-Life Harmony</span>
        </div>
      </Link>

      {/* ナビゲーションバー（スマホの時は下に綺麗にセパレートされるから絶対被らない！） */}
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
