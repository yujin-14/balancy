// src/types/task.ts

export type TaskType = "WORK" | "LIFE_DRAIN" | "LIFE_CHARGE";

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  startTime: string; // "14:00"
  endTime: string; // 💡 【新設】"15:00" などの終了時刻！
  dateTime: string;
  isTomorrow: boolean;
  memo: string;
}
