import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-8">
      <div className="rounded-2xl border border-line bg-gradient-to-br from-[#14171a] via-[#111316] to-[#171b14] px-8 py-14 md:px-14 md:py-16 grid md:grid-cols-2 gap-10 items-center overflow-hidden">
        <div>
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Workout Library</p>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-[1.05] mb-5">
            Train with intent. Log
            <br />
            every set.
          </h1>
          <p className="text-muted text-sm max-w-md mb-8 leading-relaxed">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <a href="#library" className="inline-block bg-accent text-black text-sm font-bold uppercase tracking-wide px-6 py-3 rounded-lg hover:brightness-95 transition">Browse Workouts</a>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image src="/images/banner.png" alt="Athlete training on gym equipment" width={420} height={420} className="w-full max-w-[380px] h-auto object-contain" priority />
        </div>
      </div>
    </section>
  );
}