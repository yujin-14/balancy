"use client";

import React from "react";

interface BalancyScaleProps {
  score: number;
}

// 🎨 スタイル定義（CSS役割）の分離：線を全廃し、「丸と四角（面）」の幾何学アート風に！
const STYLES = {
  wrapper:
    "w-full flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md rounded-[32px] border border-white/60 shadow-sm transition-all duration-500",
  label:
    "text-[10px] uppercase tracking-widest text-neutral-400 font-black mb-8 select-none bg-neutral-100/80 px-3 py-1 rounded-full border border-neutral-200/20",
  scaleContainer:
    "relative w-72 h-44 flex flex-col items-center justify-end mt-4",

  // 🪵 幾何学の「面」だけで構成された、極太ミニマルな支柱と土台
  pillar: "w-6 h-28 bg-neutral-200/80 rounded-full relative shadow-inner",
  pillarCenter:
    "w-2.5 h-2.5 bg-neutral-400 rounded-full absolute top-3 left-1/2 -translate-x-1/2 z-20 shadow-sm", // 回転の中心軸
  base: "w-24 h-5 bg-neutral-300/80 rounded-2xl absolute bottom-0 left-1/2 -translate-x-1/2 shadow-sm",

  // 🏹 線の要素をゼロにした、ぽってり厚みのある梁（ソリッドな角丸長方形の面）
  beam: "absolute top-3 w-52 h-4.5 bg-neutral-300/90 rounded-full origin-center transition-transform duration-700 ease-out shadow-sm",

  // 🔗 紐（線）を完全破壊！梁の先端にダイレクトにドッキングする回転プレート
  leftPlate:
    "absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-700 ease-out origin-center z-10",
  rightPlate:
    "absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-700 ease-out origin-center z-10",

  // 🔮 塊感（ソリッド感）MAXなパステルカラーの正円図形
  circleWork:
    "w-14 h-14 rounded-full bg-blue-100/90 border border-blue-200/40 shadow-sm flex items-center justify-center text-2xl -translate-x-1/2 select-none transform hover:scale-110 transition-transform duration-300",
  circleLife:
    "w-14 h-14 rounded-full bg-orange-100/90 border border-orange-200/40 shadow-sm flex items-center justify-center text-2xl translate-x-1/2 select-none transform hover:scale-110 transition-transform duration-300",

  // 💬 メッセージボード
  statusText:
    "font-bold text-xs text-neutral-600 leading-relaxed max-w-[280px] text-center mt-10 min-h-[48px] bg-white/40 p-4 rounded-2xl border border-white/20 shadow-inner",
};

export default function BalancyScale({ score }: BalancyScaleProps) {
  // 📐 スコア（0.0 〜 2.0）を天秤の傾き（-25度 〜 +25度）にマッピング
  const calculateRotation = (s: number): number => {
    if (s === 0) return -25;
    const deg = (s - 1.0) * 23; // 図形同士の衝突を防ぐ黄金の傾き角度
    return Math.max(-25, Math.min(25, deg));
  };

  const rotateDeg = calculateRotation(score);

  return (
    <div className={STYLES.wrapper}>
      <span className={STYLES.label}>Scale of Harmony</span>

      <div className={STYLES.scaleContainer}>
        {/* ソリッドな丸みを帯びた支柱 */}
        <div className={STYLES.pillar}>
          <div className={STYLES.pillarCenter} />
          <div className={STYLES.base} />
        </div>

        {/* 梁（ビーム）：太い長方形の面 */}
        <div
          className={STYLES.beam}
          style={{ transform: `rotate(${rotateDeg}deg)` }}
        >
          {/* 左の皿：WORK（紐を無くし、梁の左端に『パステルブルーの正円』をダイレクト配置） */}
          <div
            className={STYLES.leftPlate}
            style={{ transform: `rotate(${-rotateDeg}deg)` }}
          >
            <div className={STYLES.circleWork}>💻</div>
          </div>

          {/* 右の皿：LIFE（紐を無くし、梁の右端に『パステルオレンジの正円』をダイレクト配置） */}
          <div
            className={STYLES.rightPlate}
            style={{ transform: `rotate(${-rotateDeg}deg)` }}
          >
            <div className={STYLES.circleLife}>🍊</div>
          </div>
        </div>
      </div>

      {/* スコアに応じた可愛いメッセージ出し分け */}
      <p className={STYLES.statusText}>
        {score === 1.0 && "完璧な調和。天秤が美しく水平を保っています 🌿"}
        {score > 0 &&
          score < 0.5 &&
          "WORKに傾きすぎて蜜柑が落ちそう！ご自愛を補給して！🥺"}
        {score >= 0.5 &&
          score < 1.0 &&
          "少しWORKが重ため。あと少しLIFEを足すと安定するよ 🙌"}
        {score > 1.0 && "たっぷり充電中。心穏やかなご自愛タイムです 🥰"}
        {score === 0 && "天秤が停止しています。今日のタネを植えてみましょう 🌱"}
      </p>
    </div>
  );
}
