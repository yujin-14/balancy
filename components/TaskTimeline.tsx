"use client";

import React from "react";
import { Task } from "@/types/task";

const STYLES = {
  container:
    "w-full bg-white/50 backdrop-blur-md rounded-[28px] p-6 border border-white/60 shadow-sm transition-all duration-300 hover:shadow-md",
  headerRow:
    "flex items-center justify-between border-b border-neutral-200/40 pb-3 mb-4",
  title:
    "text-sm font-extrabold tracking-wide text-neutral-700 flex items-center gap-2",
  badge:
    "px-2.5 py-0.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black tracking-wider uppercase",
  list: "flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1", // 💡 ボタンが消えた分、縦幅を広げて見やすくしたよ！
  emptyCard:
    "border-2 border-dashed border-neutral-300/60 rounded-2xl p-8 text-center bg-neutral-50/30",
  emptyText: "text-xs text-neutral-400 font-bold leading-relaxed",
  taskLeft: "flex items-start gap-3 w-full", // 横幅いっぱいに使う
  taskIcon:
    "w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-inner mt-0.5 shrink-0",
  taskTitle: "text-xs font-bold text-neutral-700",
  taskTimeRange:
    "text-[9px] bg-neutral-900 text-white font-black px-2 py-0.5 rounded-md inline-block tracking-wide shadow-sm select-none shrink-0 mt-0.5",
  memoText:
    "mt-1.5 text-[10px] text-neutral-500 bg-neutral-50/80 px-2 py-1 rounded-lg border border-neutral-100/50 font-medium inline-block max-w-[280px] break-all",
};

interface TaskTimelineProps {
  title: string;
  tasks: Task[];
  emptyMessage: string;
}

export default function TaskTimeline({
  title,
  tasks,
  emptyMessage,
}: TaskTimelineProps) {
  const getTypeConfig = (type: Task["type"]) => {
    switch (type) {
      case "WORK":
        return { icon: "💻", bg: "bg-blue-50 text-blue-600" };
      case "LIFE_DRAIN":
        return { icon: "🧹", bg: "bg-amber-50 text-amber-600" };
      case "LIFE_CHARGE":
        return { icon: "🍊", bg: "bg-orange-50 text-orange-600" };
    }
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.headerRow}>
        <h3 className={STYLES.title}>
          <span>{title}</span>
        </h3>
        <span className={STYLES.badge}>{tasks.length} Seeds</span>
      </div>

      {tasks.length === 0 ? (
        <div className={STYLES.emptyCard}>
          <p className={STYLES.emptyText}>{emptyMessage}</p>
        </div>
      ) : (
        <div className={STYLES.list}>
          {tasks.map((task) => {
            const config = getTypeConfig(task.type);
            return (
              /* 💡 ボタンを無くしたことで、左右の余白が均等になって超クリーンなカードに進化！ */
              <div
                key={task.id}
                className="flex items-center p-3.5 bg-white rounded-xl border border-neutral-200/30 shadow-sm transition-all duration-200 hover:translate-x-0.5"
              >
                <div className={STYLES.taskLeft}>
                  <div className={`${STYLES.taskIcon} ${config.bg}`}>
                    {config.icon}
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <span className={STYLES.taskTimeRange}>
                        {task.startTime} - {task.endTime}
                      </span>
                      <h4 className={STYLES.taskTitle}>{task.title}</h4>
                    </div>
                    {task.memo && task.memo.trim() !== "" && (
                      <div className={STYLES.memoText}>📝 {task.memo}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
