
// Main FitLog page for displaying workouts
import Hero from "@/components/Hero";
import WorkoutGrid from "@/components/WorkoutGrid";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />
      <WorkoutGrid workouts={workouts} />
    </>
  );
}