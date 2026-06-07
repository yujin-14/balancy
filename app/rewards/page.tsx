"use client";

import React, { useState, useEffect } from "react";

const STYLES = {
  container:
    "w-full max-w-4xl mx-auto px-6 mt-10 flex flex-col gap-6 animate-fade-in pb-12",
  headerRow: "flex flex-col gap-1",
  pageTitle: "text-lg font-black tracking-tight text-neutral-800",
  pageSubtitle: "text-xs text-neutral-400 font-bold",
  adsGrid: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-2", // 💡 すっきり並ぶようにマージン調整
  adsCard:
    "bg-white/40 border border-dashed border-neutral-300 rounded-[24px] p-6 flex flex-col justify-between min-h-[220px] shadow-sm relative overflow-hidden",
  adsBadge:
    "absolute top-3 right-3 text-[9px] font-black uppercase bg-neutral-200 text-neutral-500 px-2 py-0.5 rounded tracking-widest select-none",
  adsSlotWrapper:
    "w-full flex-1 flex items-center justify-center bg-neutral-100/70 border border-neutral-200/40 rounded-xl text-neutral-400 text-xs font-bold p-4 text-center select-none shadow-inner",
};

const ADSENSE_DATABASE = [
  { slotId: "ca-pub-12345_slotA" },
  { slotId: "ca-pub-12345_slotB" },
  { slotId: "ca-pub-12345_slotC" },
  { slotId: "ca-pub-12345_slotD" },
  { slotId: "ca-pub-12345_slotE" },
];

export default function RewardsPage() {
  const [displayAds, setDisplayAds] = useState<typeof ADSENSE_DATABASE>([]);

  useEffect(() => {
    const shuffled = [...ADSENSE_DATABASE]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    setDisplayAds(shuffled);
  }, []);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.headerRow}>
        <h2 className={STYLES.pageTitle}>Sponsored Content</h2>
        <p className={STYLES.pageSubtitle}>
          アドセンス広告枠の動的配備ステージ（ページを開くたびにランダムに切り替わります）
          📢
        </p>
      </div>

      {/* 🎰 余計なバナーを全廃し、純粋な広告コンポーネントだけが美しく整列する神画面 */}
      <div className={STYLES.adsGrid}>
        {displayAds.map((ad, index) => (
          <div key={ad.slotId} className={STYLES.adsCard}>
            <span className={STYLES.adsBadge}>スポンサー広告</span>
            <div className={STYLES.adsSlotWrapper}>
              <div className="flex flex-col gap-2">
                <span className="text-xl">📊 Google AdSense</span>
                <code className="text-[10px] text-neutral-400 bg-white/80 px-2 py-0.5 rounded border border-neutral-200/50">
                  slot_id: {ad.slotId} (枠 #{index + 1})
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
