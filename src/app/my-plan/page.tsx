"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFitLog } from "@/context/FitLogContext";
import { getWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/types/workout";
import Loading from "@/components/Loading";

export default function MyPlanPage() {
  const { plan, saved, toggleDone, removeFromPlan, toggleSaved } = useFitLog();
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [tab, setTab] = useState<"today" | "saved">("today");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  useEffect(() => {
    getWorkouts().then(setWorkouts);
  }, []);

  const byId = (id: number) => workouts?.find((w) => w.id === id);

  const planned = useMemo(() => {
    if (!workouts) return [];
    return plan
      .map((p) => ({ ...p, workout: byId(p.workoutId) }))
      .filter((p) => p.workout)
      .sort((a, b) => (b.workout![sortKey] as number) - (a.workout![sortKey] as number));
  }, [plan, workouts, sortKey]);

  const savedWorkouts = useMemo(() => {
    if (!workouts) return [];
    return saved
      .map((id) => byId(id))
      .filter(Boolean)
      .sort((a, b) => (b![sortKey] as number) - (a![sortKey] as number)) as Workout[];
  }, [saved, workouts, sortKey]);

  if (!workouts) return <Loading />;

  const totalMinutes = planned.reduce((sum, p) => sum + (p.workout?.duration ?? 0), 0);
  const totalCalories = planned.reduce((sum, p) => sum + (p.workout?.caloriesBurned ?? 0), 0);

  const list = tab === "today" ? planned : savedWorkouts;
  const isEmpty = list.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold uppercase mb-2">My Plan</h1>
      <p className="text-muted text-sm mb-8">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="rounded-2xl border border-line bg-panel/40 px-8 py-6 grid grid-cols-3 divide-x divide-line mb-8">
        <div className="px-4 first:pl-0">
          <p className="text-muted text-xs mb-1">Exercises</p>
          <p className="text-2xl font-extrabold text-accent">{plan.length}</p>
        </div>
        <div className="px-4">
          <p className="text-muted text-xs mb-1">Minutes</p>
          <p className="text-2xl font-extrabold">{totalMinutes}</p>
        </div>
        <div className="px-4">
          <p className="text-muted text-xs mb-1">Calories</p>
          <p className="text-2xl font-extrabold">{totalCalories}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="inline-flex rounded-full bg-panel border border-line p-1">
          <button onClick={() => setTab("today")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${tab === "today" ? "bg-white text-black" : "text-muted hover:text-white"}`}>
            Today&apos;s Plan
          </button>
          <button onClick={() => setTab("saved")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${tab === "saved" ? "bg-white text-black" : "text-muted hover:text-white"}`}>
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted">Sort By</span>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className="bg-panel border border-line rounded-lg px-3 py-1.5 text-sm outline-none focus:border-accent">
            <option value="duration">Duration</option>
            <option value="caloriesBurned">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-dashed border-line py-24 text-center">
          <p className="font-extrabold uppercase tracking-wide mb-2">Nothing Here Yet</p>
          <p className="text-muted text-sm mb-6">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="inline-block bg-accent text-black text-sm font-bold px-5 py-2.5 rounded-full hover:brightness-95 transition">
            Go to workouts
          </Link>
        </div>
      ) : tab === "today" ? (
        <ul className="space-y-3">
          {planned.map((p) => (
            <li key={p.workoutId} className="flex items-center justify-between bg-card border border-line rounded-xl2 p-4 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={p.workout!.image} alt={p.workout!.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className={`font-semibold uppercase text-sm ${p.done ? "line-through text-muted" : ""}`}>{p.workout!.name}</p>
                  <p className="text-xs text-muted mb-1">{p.workout!.equipment}</p>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{p.workout!.duration} min</span>
                    <span>{p.workout!.caloriesBurned} kcal</span>
                    <span>{p.workout!.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/worksout/${p.workoutId}`} className="px-4 py-2 rounded-full text-xs font-semibold border border-line hover:border-accent/60 transition">
                  View Details
                </Link>
                <button onClick={() => toggleDone(p.workoutId)} className={`px-4 py-2 rounded-full text-xs font-semibold transition ${p.done ? "bg-white/10 text-white" : "bg-accent text-black hover:brightness-95"}`}>
                  {p.done ? "Done" : "Mark as Done"}
                </button>
                <button onClick={() => removeFromPlan(p.workoutId)} className="text-muted hover:text-white px-2">
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-3">
          {savedWorkouts.map((w) => (
            <li key={w.id} className="flex items-center justify-between bg-card border border-line rounded-xl2 p-4 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={w.image} alt={w.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold uppercase text-sm">{w.name}</p>
                  <p className="text-xs text-muted mb-1">{w.equipment}</p>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{w.duration} min</span>
                    <span>{w.caloriesBurned} kcal</span>
                    <span>{w.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/worksout/${w.id}`} className="px-4 py-2 rounded-full text-xs font-semibold border border-line hover:border-accent/60 transition">
                  View Details
                </Link>
                <button onClick={() => toggleSaved(w.id)} className="text-muted hover:text-white px-2">
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
