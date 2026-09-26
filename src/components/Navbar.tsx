// Navigation bar for the FitLog application

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/90 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-bold tracking-wide">FITLOG</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/" className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${pathname === "/" ? "bg-white/10 text-white" : "text-muted hover:text-white"}`}>
            Workouts
          </Link>
          <Link href="/my-plan" className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${pathname === "/my-plan" ? "bg-accent/20 text-accent" : "text-muted hover:text-white"}`}>
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/my-plan" className="flex items-center gap-1.5 rounded-full bg-panel border border-line px-3 py-1.5 text-xs hover:border-accent/60 transition">
            Plan
            <span className="bg-accent text-black rounded-full px-1.5 font-semibold">{planCount}</span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5 rounded-full bg-panel border border-line px-3 py-1.5 text-xs hover:border-accent/60 transition">
            Saved
            <span className="bg-white/10 rounded-full px-1.5 font-semibold">{savedCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}