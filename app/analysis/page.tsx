"use client";

import React, { useState, useEffect } from "react";

const STYLES = {
  container:
    "w-full max-w-4xl mx-auto px-6 mt-10 flex flex-col gap-6 animate-fade-in pb-12",
  headerRow: "flex flex-col gap-1",
  pageTitle: "text-lg font-black tracking-tight text-neutral-800",
  pageSubtitle: "text-xs text-neutral-400 font-bold",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-5",
  statCard:
    "bg-white/60 backdrop-blur-md border border-white/60 p-5 rounded-2xl shadow-sm flex flex-col gap-1",
  statLabel: "text-[10px] font-black uppercase text-neutral-400 tracking-wider",
  statValue: "text-2xl font-black text-neutral-800 tracking-tight",
  chartSection:
    "w-full bg-white/60 backdrop-blur-md border border-white/60 rounded-[32px] p-6 shadow-sm flex flex-col gap-6",
  chartTitle:
    "text-xs font-black text-neutral-500 uppercase tracking-widest bg-neutral-100/80 px-3 py-1 rounded-full w-max border border-neutral-200/10",
  chartContainer:
    "w-full flex items-end justify-between h-48 px-4 mt-4 border-b border-neutral-200/40 pb-2",
  barWrapper: "flex flex-col items-center gap-3 w-full",
  barOuter:
    "w-8 bg-neutral-100 rounded-full h-36 relative overflow-hidden flex flex-col justify-end shadow-inner",
  barLabel: "text-[10px] text-neutral-400 font-black uppercase",
  adviceBox:
    "bg-orange-500/5 border border-orange-500/10 rounded-2xl p-5 flex items-start gap-4 mt-2",
  adviceIcon:
    "w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white text-lg shrink-0 shadow-sm",
  adviceTextContainer: "flex flex-col gap-0.5",
  adviceTitle: "text-xs font-black text-neutral-800",
  adviceDesc: "text-xs text-neutral-500 font-bold leading-relaxed",
};

export default function AnalysisPage() {
  const WEEK_DATA = [
    { day: "Mon", workH: 80, color: "bg-blue-400" },
    { day: "Tue", workH: 95, color: "bg-blue-500" },
    { day: "Wed", workH: 50, color: "bg-orange-500" },
    { day: "Thu", workH: 75, color: "bg-blue-400" },
    { day: "Fri", workH: 40, color: "bg-orange-400" },
    { day: "Sat", workH: 15, color: "bg-orange-400" },
    { day: "Sun", workH: 0, color: "bg-neutral-200" },
  ];

  return (
    <div className={STYLES.container}>
      <div className={STYLES.headerRow}>
        <h2 className={STYLES.pageTitle}>Weekly Analytics</h2>
        <p className={STYLES.pageSubtitle}>
          キミの頑張りとご自愛の軌跡を、美しい図形で可視化 📊
        </p>
      </div>

      <div className={STYLES.grid}>
        <div className={STYLES.statCard}>
          <span className={STYLES.statLabel}>今週の平均調和スコア</span>
          <p className={STYLES.statValue}>
            1.1{" "}
            <span className="text-xs text-orange-500 font-bold">
              / 水平に近い
            </span>
          </p>
        </div>
        <div className={STYLES.statCard}>
          <span className={STYLES.statLabel}>収穫した総タネ数</span>
          <p className={STYLES.statValue}>
            24 <span className="text-xs text-neutral-400 font-bold">Seeds</span>
          </p>
        </div>
        <div className={STYLES.statCard}>
          <span className={STYLES.statLabel}>現在のご自愛貯金</span>
          <p className={STYLES.statValue}>
            120{" "}
            <span className="text-xs text-orange-500 font-bold">🍊 Mikan</span>
          </p>
        </div>
      </div>

      <div className={STYLES.chartSection}>
        <span className={STYLES.chartTitle}>Balance Trend (Work Ratio)</span>

        <div className={STYLES.chartContainer}>
          {WEEK_DATA.map((data) => (
            <div key={data.day} className={STYLES.barWrapper}>
              <div className={STYLES.barOuter}>
                <div
                  className={`${data.color} w-full rounded-b-full transition-all duration-1000`}
                  style={{ height: `${data.workH}%` }}
                />
              </div>
              <span className={STYLES.barLabel}>{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={STYLES.adviceBox}>
        <div className={STYLES.adviceIcon}>🍊</div>
        <div className={STYLES.adviceTextContainer}>
          <h4 className={STYLES.adviceTitle}>
            Balaful コンシェルジュからのメッセージ
          </h4>{" "}
          {/* 💡 ここを Balaful に変更！ */}
          <p className="text-xs text-neutral-500 font-bold leading-relaxed">
            今週の火曜日はWORKにかなり傾いちゃってたみたい（95%消費）！でも、水曜日にしっかりご自愛（CHARGE）を仕込んで水平に戻せてるの、マジで天才的なセルフコントロールだよ。この調子で、週末は思いっきり趣味の時間を楽しんでね！
          </p>
        </div>
      </div>
    </div>
  );
}
