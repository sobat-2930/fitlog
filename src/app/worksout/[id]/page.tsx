import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export default async function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  if (!workout) notFound();

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      <div className="relative h-80 md:h-[520px] rounded-2xl overflow-hidden border border-line">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold uppercase mb-3">{workout.name}</h1>
        <p className="text-muted text-sm mb-4 leading-relaxed">{workout.description}</p>

        <div className="flex gap-2 mb-6">
          {workout.muscleGroups.map((m) => (
            <span key={m} className="bg-accent text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
              {m}
            </span>
          ))}
        </div>

        <div className="rounded-2xl border border-line overflow-hidden mb-8">
          {specs.map((s, i) => (
            <div key={s.label} className={`flex items-center justify-between px-5 py-3.5 text-sm ${i !== specs.length - 1 ? "border-b border-line" : ""}`}>
              <span className="text-muted text-xs font-bold uppercase tracking-wide">{s.label}</span>
              <span className="font-semibold">{s.value}</span>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-bold uppercase tracking-wide mb-3">Instructions</h2>
        <ol className="list-decimal list-inside text-sm text-muted space-y-2 mb-8">
          {workout.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <WorkoutActions workoutId={workout.id} />
      </div>
    </div>
  );
}