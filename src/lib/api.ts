
// API functions for FitLog workout data
import { Workout } from "@/types/workout";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load workouts");
  return res.json();
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && "id" in data) {
        return data as Workout;
      }
    }
  } catch {
    
  }

  const all = await getWorkouts();
  return all.find((w) => String(w.id) === String(id)) ?? null;
}
