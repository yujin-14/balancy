"use client";

import React, { useState, useEffect, useMemo } from "react";
import BalancyScale from "@/components/BalancyScale";
import TaskTimeline from "@/components/TaskTimeline";
import { Task } from "@/types/task";

const STYLES = {
  mainContainer:
    "max-w-6xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:h-[calc(100vh-7rem)] lg:overflow-hidden pb-6",
  leftCol:
    "lg:col-span-5 w-full flex flex-col justify-center items-center py-4",
  rightCol:
    "lg:col-span-7 w-full flex flex-col gap-5 lg:h-full lg:overflow-y-auto pr-2 pb-8",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTasks = localStorage.getItem("balancy_tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // 📐 開始時刻（startTime）を基準に、全自動で美しい時系列にソート！
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [tasks]);

  const todayTasks = useMemo(
    () => sortedTasks.filter((t) => !t.isTomorrow),
    [sortedTasks],
  );
  const tomorrowTasks = useMemo(
    () => sortedTasks.filter((t) => t.isTomorrow),
    [sortedTasks],
  );

  // ⚖️ 今日の登録タスク数から、現在のリアルタイム天秤バランスを計算
  const score = useMemo(() => {
    if (todayTasks.length === 0) return 0;
    let workDrainCount = 0;
    let chargeCount = 0;

    todayTasks.forEach((task) => {
      if (task.type === "WORK" || task.type === "LIFE_DRAIN") {
        workDrainCount++;
      } else if (task.type === "LIFE_CHARGE") {
        chargeCount++;
      }
    });

    if (workDrainCount === 0) return 1.5;
    const ratio = chargeCount / workDrainCount;
    return Math.max(0.1, Math.min(1.9, ratio));
  }, [todayTasks]);

  if (!isClient) return null;

  return (
    <main className={STYLES.mainContainer}>
      <div className={STYLES.leftCol}>
        <BalancyScale score={score} />
      </div>
      <div className={STYLES.rightCol}>
        {/* 💡 onHarvest プロパティを完全に無くして、純粋なタイムライン手帳へ */}
        <TaskTimeline
          title="Mikan Garden / 今日のタイムライン ☀️"
          tasks={todayTasks}
          emptyMessage="現在、今日の予定はありません。Taskページからタイムラインを追加してみましょう 🌱"
        />
        <TaskTimeline
          title="Mikan Garden / 明日のタイムライン 🌙"
          tasks={tomorrowTasks}
          emptyMessage="明日仕込む予定のご自愛はありますか？あらかじめタネを蒔いておきましょう ✨"
        />
      </div>
    </main>
  );
}
