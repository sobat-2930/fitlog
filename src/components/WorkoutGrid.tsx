// Grid component for displaying workout cards

"use client";

import { useMemo } from "react";
import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutGrid({ workouts }: { workouts: Workout[] }) {
  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => b.rating - a.rating);
  }, [workouts]);

  return (
    <section id="library" className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold uppercase">The Library</h2>
        <p className="text-muted text-sm mt-1">Twelve lifts covering every major muscle group.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((w) => (
          <WorkoutCard key={w.id} workout={w} />
        ))}
      </div>
    </section>
  );
}