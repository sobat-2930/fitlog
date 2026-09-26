"use client";

import { useFitLog } from "@/context/FitLogContext";
import { useToast } from "@/context/ToastContext";

export default function WorkoutActions({ workoutId }: { workoutId: number }) {
  const { addToPlan, removeFromPlan, toggleSaved, isInPlan, isSaved } = useFitLog();
  const { showToast } = useToast();

  const handlePlan = () => {
    if (isInPlan(workoutId)) {
      removeFromPlan(workoutId);
      showToast("Removed from plan");
    } else {
      const ok = addToPlan(workoutId);
      showToast(ok ? "Added to today's plan" : "Plan is full (5 max)");
    }
  };

  const handleSave = () => {
    toggleSaved(workoutId);
    showToast(isSaved(workoutId) ? "Removed from saved" : "Saved for later");
  };

  return (
    <div className="flex gap-3">
      <button onClick={handlePlan} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition ${isInPlan(workoutId) ? "bg-white/10 text-white" : "bg-accent text-black hover:brightness-95"}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="M12 14v4M10 16h4" />
        </svg>
        {isInPlan(workoutId) ? "Remove from Plan" : "Add to today's plan"}
      </button>

      <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border border-line hover:border-accent/60 transition">
        <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved(workoutId) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
        </svg>
        {isSaved(workoutId) ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}