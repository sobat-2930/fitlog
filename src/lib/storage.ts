import { PlanItem } from "@/types/workout";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getPlan: () => read<PlanItem[]>(PLAN_KEY, []),
  setPlan: (plan: PlanItem[]) => write(PLAN_KEY, plan),
  getSaved: () => read<number[]>(SAVED_KEY, []),
  setSaved: (saved: number[]) => write(SAVED_KEY, saved),
};