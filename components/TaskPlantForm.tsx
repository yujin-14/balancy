"use client";

import React, { useState } from "react";
import { TaskType } from "@/types/task";

interface TaskPlantFormProps {
  // 引数に endTime を追加！
  onPlant: (
    type: TaskType,
    title: string,
    startTime: string,
    endTime: string,
    isTomorrow: boolean,
    memo: string,
  ) => void;
}

const STYLES = {
  wrapper:
    "w-full bg-white/60 backdrop-blur-md rounded-[32px] p-6 border border-white/60 shadow-sm flex flex-col gap-5",
  heading:
    "text-[10px] uppercase tracking-widest text-neutral-400 font-black select-none bg-neutral-100/80 px-3 py-1 rounded-full w-max border border-neutral-200/10",
  typeSelectorContainer: "grid grid-cols-3 gap-3",
  typeButtonBase:
    "flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-200 select-none cursor-pointer font-bold",
  inputGroup: "flex flex-col gap-2",
  label: "text-xs font-black text-neutral-500 tracking-wide pl-1",
  input:
    "w-full bg-white/80 border border-neutral-200/40 rounded-2xl px-4 py-3.5 text-xs font-bold text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all shadow-sm",
  textarea:
    "w-full bg-white/80 border border-neutral-200/40 rounded-2xl px-4 py-3 text-xs font-bold text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all shadow-sm resize-none h-20",

  // 🕒 時間入力を2つ綺麗に横並びにするためのグリッド
  timeGrid: "grid grid-cols-2 gap-3",
  timeInput:
    "w-full bg-white/80 border border-neutral-200/40 rounded-2xl px-4 py-3.5 text-xs font-black text-neutral-700 focus:outline-none focus:border-orange-400 focus:bg-white transition-all shadow-sm cursor-pointer",

  timeToggleContainer:
    "grid grid-cols-2 gap-2 bg-neutral-100/80 p-1 rounded-xl border border-neutral-200/20",
  timeButton:
    "py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none",
  timeButtonActive: "bg-white text-neutral-800 shadow-sm font-black",
  timeButtonInactive: "text-neutral-400 hover:text-neutral-600",
  templateContainer: "flex flex-wrap gap-1.5 mt-1",
  templateBtn:
    "px-3 py-1.5 bg-white/80 hover:bg-white border border-neutral-200/30 text-neutral-500 hover:text-neutral-700 rounded-xl text-[11px] font-bold transition-all duration-150 active:scale-95 cursor-pointer select-none",
  submitButton:
    "w-full bg-orange-500 text-white hover:bg-orange-600 text-xs font-black tracking-widest py-4 rounded-2xl shadow-md shadow-orange-500/10 transition-all active:scale-[0.98] mt-2 select-none disabled:opacity-30 disabled:cursor-not-allowed uppercase",
};

const TASK_TEMPLATES: Record<TaskType, string[]> = {
  WORK: [
    "MTG・会議",
    "資料作成",
    "メール返信",
    "面接・就活対応",
    "ドイツ語学習",
  ],
  LIFE_DRAIN: [
    "部屋 of 掃除",
    "自炊・皿洗い",
    "買い出し",
    "洗濯物干し",
    "役所の手続き",
  ],
  LIFE_CHARGE: [
    "カフェでまったり",
    "好きな音楽を聴く",
    "散歩・ご自愛",
    "サウナ・お風呂",
    "ゲーム（eFootball）",
  ],
};

export default function TaskPlantForm({ onPlant }: TaskPlantFormProps) {
  const [type, setType] = useState<TaskType>("WORK");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00"); // 💡 【新設】終了時刻の初期値
  const [isTomorrow, setIsTomorrow] = useState<boolean>(false);
  const [memo, setMemo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startTime || !endTime) return;

    // 終了時間も含めて親に送信！
    onPlant(type, title, startTime, endTime, isTomorrow, memo);
    setTitle("");
    setMemo("");
  };

  return (
    <form onSubmit={handleSubmit} className={STYLES.wrapper}>
      <span className={STYLES.heading}>Plant New Seed</span>

      {/* いつのタイムラインに植える？ */}
      <div className={STYLES.inputGroup}>
        <label className={STYLES.label}>いつのタイムラインに植える？</label>
        <div className={STYLES.timeToggleContainer}>
          <button
            type="button"
            onClick={() => setIsTomorrow(false)}
            className={`${STYLES.timeButton} ${!isTomorrow ? STYLES.timeButtonActive : STYLES.timeButtonInactive}`}
          >
            ☀️ 今日やるタネ
          </button>
          <button
            type="button"
            onClick={() => setIsTomorrow(true)}
            className={`${STYLES.timeButton} ${isTomorrow ? STYLES.timeButtonActive : STYLES.timeButtonInactive}`}
          >
            🌙 明日のヨテイ
          </button>
        </div>
      </div>

      {/* 🔮 どんな蜜柑を植える？ */}
      <div className={STYLES.typeSelectorContainer}>
        {["WORK", "LIFE_DRAIN", "LIFE_CHARGE"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setType(t as TaskType);
              setTitle("");
            }}
            className={`${STYLES.typeButtonBase} ${type === t ? (t === "WORK" ? "bg-blue-500 border-blue-500 text-white shadow-sm" : t === "LIFE_DRAIN" ? "bg-amber-400 border-amber-400 text-neutral-900 shadow-sm" : "bg-orange-500 border-orange-500 text-white shadow-sm") : "bg-white/40 border-neutral-200/40 text-neutral-400 hover:bg-white"}`}
          >
            <span className="text-xl mb-1">
              {t === "WORK" ? "💻" : t === "LIFE_DRAIN" ? "🧹" : "🍊"}
            </span>
            <span className="text-[10px] tracking-wider">{t}</span>
          </button>
        ))}
      </div>

      {/* ✏️ タスク名の入力 ＆ ⚡ クイックテンプレ */}
      <div className={STYLES.inputGroup}>
        <label className={STYLES.label}>タネの名前をきめる</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ボタンを押すか、自由に入力してね"
          className={STYLES.input}
          maxLength={30}
        />
        <div className={STYLES.templateContainer}>
          {TASK_TEMPLATES[type].map((tmpl) => (
            <button
              key={tmpl}
              type="button"
              onClick={() => setTitle(tmpl)}
              className={STYLES.templateBtn}
            >
              ＋ {tmpl}
            </button>
          ))}
        </div>
      </div>

      {/* 📅 【大改造】ツインカレンダー時間指定（開始と終了を美しく横並びに！） */}
      <div className={STYLES.inputGroup}>
        <label className={STYLES.label}>育てる時間帯（開始 〜 終了）</label>
        <div className={STYLES.timeGrid}>
          <div>
            <span className="text-[9px] font-bold text-neutral-400 block mb-1 pl-1">
              START
            </span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={STYLES.timeInput}
            />
          </div>
          <div>
            <span className="text-[9px] font-bold text-neutral-400 block mb-1 pl-1">
              END
            </span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={STYLES.timeInput}
            />
          </div>
        </div>
      </div>

      {/* 📝 備考メモ欄 */}
      <div className={STYLES.inputGroup}>
        <label className={STYLES.label}>備考・メモ（自由記入）</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="場所、持ち物、ちょっとした一言など"
          className={STYLES.textarea}
          maxLength={100}
        />
      </div>

      <button
        type="submit"
        disabled={!title.trim()}
        className={STYLES.submitButton}
      >
        天秤の庭に植える ✨
      </button>
    </form>
  );
}
