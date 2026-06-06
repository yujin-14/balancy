"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STYLES = {
  header:
    "w-full bg-white/60 backdrop-blur-md border-b border-white/40 sticky top-0 z-50 px-8 py-4 flex items-center justify-between",
  logoContainer: "flex items-center gap-2.5 cursor-pointer select-none group",
  // 💡 幾何学的なソリッド丸背景のロゴ枠！
  logoIconWrapper:
    "w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-base font-black shadow-sm transition-transform duration-300 group-hover:rotate-12 select-none",
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
      {/* 🍊 ロゴエリア：悠仁のロゴ画像をいつでもハメ込めるように設計！ */}
      <Link href="/" className={STYLES.logoContainer}>
        {/* 💡 今後、自分で作った横長ロゴ画像（例: logo.png）を適用したいときは、
          下の <div className={STYLES.logoIconWrapper}>...</div> の部分を丸ごと消して、
          <img src="/logo.png" alt="Balancy Logo" className="h-8 w-auto object-contain" /> 
          に差し替えるだけで、一瞬で超綺麗な本物のブランドロゴに化けるよ！
        */}
        <img
          src="/logo.png"
          alt="Balancy Logo"
          className="h-8 w-auto object-contain"
        />
        <div className={STYLES.logoTextContainer}>
          <h1 className={STYLES.logoTitle}>Balancy</h1>
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
