# FitLog

A dark, no-nonsense gym companion built with Next.js — browse a workout library, build today's plan, and track your progress without the clutter.

## Description

FitLog helps you pick a lift, add it to today's plan, and watch your daily stats (exercises, minutes, calories) add up. Workouts can also be saved for later, and every choice persists across page reloads using localStorage — no backend or login needed.

## Technologies Used

- **Next.js** (App Router) — routing and server components
- **TypeScript** — type safety across the app
- **Tailwind CSS** — styling and responsive design
- **React Context API** — global state for plan/saved workouts and toast notifications
- **localStorage** — client-side persistence

## Key Features

1. **Workout Library** — Browse all workouts in a responsive grid, sortable by Duration, Calories, or Rating.
2. **Workout Detail Page** — Full specs table (equipment, difficulty, sets/reps, duration, calories, rating) with step-by-step instructions.
3. **My Plan Page** — Track today's planned workouts with a 5-lift cap, mark workouts done, and view live stats (exercises, minutes, calories).
4. **Save for Later** — Bookmark workouts into a separate Saved tab, independent from today's plan.
5. **Persistent State & Toasts** — Plan and saved data survive page reloads via localStorage, with toast notifications confirming every add/remove/done action.
