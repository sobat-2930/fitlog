import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/worksout/${workout.id}`} className="group rounded-xl2 overflow-hidden bg-card border border-line hover:border-accent/60 transition block">
      <div className="relative h-40 w-full">
        <Image src={workout.image} alt={workout.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-3">
          {workout.muscleGroups.map((m) => (
            <span key={m} className="bg-accent text-black px-2.5 py-1 rounded-full text-[11px] font-bold uppercase">
              {m}
            </span>
          ))}
        </div>
        <h3 className="font-semibold mb-1">{workout.name}</h3>
        <p className="text-muted text-xs mb-3">{workout.equipment}</p>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span>{workout.duration} min</span>
          <span>{workout.caloriesBurned} kcal</span>
          <span>{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}