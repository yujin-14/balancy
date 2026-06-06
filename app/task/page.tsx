"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskPlantForm from "@/components/TaskPlantForm";
import { Task, TaskType } from "@/types/task";

export default function TaskPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("balancy_tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // 🌱 引数に endTime をバシッと追加！
  const handlePlantTask = (
    type: TaskType,
    title: string,
    startTime: string,
    endTime: string,
    isTomorrow: boolean,
    memo: string,
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      type,
      startTime,
      endTime, // 💡 ここでオブジェクトにしっかりと格納するよ！
      dateTime: new Date().toISOString(),
      isTomorrow,
      memo,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("balancy_tasks", JSON.stringify(updatedTasks));

    // Homeへ自動ワープ
    router.push("/");
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 mt-12 flex flex-col gap-4 animate-fade-in">
      <TaskPlantForm onPlant={handlePlantTask} />
    </div>
  );
}
