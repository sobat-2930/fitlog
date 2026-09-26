
import { Workout } from "@/types/workout";
import localWorkouts from "@/data/workouts.json";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(BASE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("API not ok");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data as Workout[];
    throw new Error("Empty API response");
  } catch {
    return localWorkouts as Workout[];
  }
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
    // ignore, fall back below
  }

  const all = await getWorkouts();
  return all.find((w) => String(w.id) === String(id)) ?? null;
}
