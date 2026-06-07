"use client";

import React, { useState, useEffect } from "react";

const STYLES = {
  container:
    "w-full max-w-4xl mx-auto px-6 mt-10 flex flex-col gap-6 animate-fade-in pb-12",
  headerRow: "flex flex-col gap-1",
  pageTitle: "text-lg font-black tracking-tight text-neutral-800",
  pageSubtitle: "text-xs text-neutral-400 font-bold",

  // 💡 貯金が消えたので、グリッドを2カラムにしてバランスよく配置！
  grid: "grid grid-cols-1 md:grid-cols-2 gap-5",
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

interface ChartBar {
  day: string;
  workH: number;
  color: string;
  total: number;
}

export default function AnalysisPage() {
  const [totalSeeds, setTotalSeeds] = useState(0);
  const [avgScore, setAvgScore] = useState<string>("0.0");
  const [weekData, setWeekData] = useState<ChartBar[]>([]);

  useEffect(() => {
    // 💡 収穫履歴ではなく、メインのタイムラインデータ（balancy_tasks）を直接見にいく！
    const savedTasks = localStorage.getItem("balancy_tasks");
    const taskList = savedTasks ? JSON.parse(savedTasks) : [];

    setTotalSeeds(taskList.length);

    // 登録データから平均調和スコアをリアルタイム計算
    let workDrainCount = 0;
    let chargeCount = 0;
    taskList.forEach((task: any) => {
      if (task.type === "WORK" || task.type === "LIFE_DRAIN") workDrainCount++;
      else if (task.type === "LIFE_CHARGE") chargeCount++;
    });
    if (taskList.length === 0) {
      setAvgScore("0.0 (タネなし)");
    } else if (workDrainCount === 0) {
      setAvgScore("1.5 (ご自愛満タン)");
    } else {
      setAvgScore((chargeCount / workDrainCount).toFixed(1));
    }

    // 曜日自動マッピングアルゴリズム
    const daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayCounts = daysName.map((name) => ({
      day: name,
      work: 0,
      total: 0,
    }));

    taskList.forEach((task: any) => {
      const dayIndex = new Date(task.dateTime).getDay();
      const dayName = daysName[dayIndex];
      const targetBucket = dayCounts.find((d) => d.day === dayName);

      if (targetBucket) {
        targetBucket.total++;
        if (task.type === "WORK" || task.type === "LIFE_DRAIN") {
          targetBucket.work++;
        }
      }
    });

    const calculatedChart = dayCounts.map((b) => {
      const ratio = b.total === 0 ? 0 : Math.round((b.work / b.total) * 100);
      let color = "bg-neutral-200";
      if (ratio > 60) color = "bg-blue-500";
      else if (ratio >= 40 && ratio <= 60) color = "bg-orange-500";
      else if (ratio > 0 && ratio < 40) color = "bg-orange-400";

      return { day: b.day, workH: ratio, color, total: b.total };
    });

    const monToSunOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sortedChart = monToSunOrder.map(
      (m) => calculatedChart.find((c) => c.day === m)!,
    );

    setWeekData(sortedChart);
  }, []);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.headerRow}>
        <h2 className={STYLES.pageTitle}>Weekly Analytics</h2>
        <p className={STYLES.pageSubtitle}>
          キミの頑張りとご自愛の軌跡を、美しい図形で可視化 📊
        </p>
      </div>

      {/* 2カラムになってすっきりオシャレになったサマリー */}
      <div className={STYLES.grid}>
        <div className={STYLES.statCard}>
          <span className={STYLES.statLabel}>現在の予定調和スコア</span>
          <p className={STYLES.statValue}>{avgScore}</p>
        </div>
        <div className={STYLES.statCard}>
          <span className={STYLES.statLabel}>登録された総タネ数</span>
          <p className={STYLES.statValue}>
            {totalSeeds}{" "}
            <span className="text-xs text-neutral-400 font-bold">Seeds</span>
          </p>
        </div>
      </div>

      {/* リアルタイム連動グラフ */}
      <div className={STYLES.chartSection}>
        <span className={STYLES.chartTitle}>Balance Trend (Work Ratio)</span>

        <div className={STYLES.chartContainer}>
          {weekData.map((data) => (
            <div key={data.day} className={STYLES.barWrapper}>
              <div className={STYLES.barOuter}>
                <div
                  className={`${data.color} w-full rounded-b-full transition-all duration-1000`}
                  style={{ height: `${data.total === 0 ? 0 : data.workH}%` }}
                />
              </div>
              <span className={STYLES.barLabel}>
                {data.day}
                {data.total > 0 && (
                  <span className="block text-[8px] font-normal text-neutral-400">
                    {data.workH}%
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={STYLES.adviceBox}>
        <div className={STYLES.adviceIcon}>🍊</div>
        <div className={STYLES.adviceTextContainer}>
          <h4 className={STYLES.adviceTitle}>
            Balaful コンシェルジュからのメッセージ
          </h4>
          <p className={STYLES.adviceDesc}>
            登録した予定（タネ）の比率がそのままリアルタイムにグラフに反映されるよ！今日や明日の予定を立てるだけで、自分の1週間がどんなバランスになるか一目でシミュレーションできる最高のライフログ手帳を楽しんでね
            ✨
          </p>
        </div>
      </div>
    </div>
  );
}
