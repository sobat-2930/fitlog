
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { PlanItem } from "@/types/workout";
import { storage } from "@/lib/storage";

interface FitLogContextType {
  plan: PlanItem[];
  saved: number[];
  addToPlan: (workoutId: number) => boolean;
  removeFromPlan: (workoutId: number) => void;
  toggleDone: (workoutId: number) => void;
  toggleSaved: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
  planCount: number;
  savedCount: number;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

const PLAN_CAP = 5;

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlan(storage.getPlan());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(storage.getSaved());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) storage.setPlan(plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) storage.setSaved(saved);
  }, [saved, hydrated]);

  const isInPlan = (workoutId: number) =>
    plan.some((p) => p.workoutId === workoutId);

  const isSaved = (workoutId: number) => saved.includes(workoutId);

  const addToPlan = (workoutId: number) => {
    if (isInPlan(workoutId)) return true;
    if (plan.length >= PLAN_CAP) return false;
    setPlan((prev) => [
      ...prev,
      { workoutId, addedAt: new Date().toISOString(), done: false },
    ]);
    return true;
  };

  const removeFromPlan = (workoutId: number) => {
    setPlan((prev) => prev.filter((p) => p.workoutId !== workoutId));
  };

  const toggleDone = (workoutId: number) => {
    setPlan((prev) =>
      prev.map((p) =>
        p.workoutId === workoutId ? { ...p, done: !p.done } : p
      )
    );
  };

  const toggleSaved = (workoutId: number) => {
    setSaved((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        toggleDone,
        toggleSaved,
        isInPlan,
        isSaved,
        planCount: plan.length,
        savedCount: saved.length,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const ctx = useContext(FitLogContext);
  if (!ctx) throw new Error("useFitLog must be used inside FitLogProvider");
  return ctx;
}