import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted">
        <div className="flex items-center gap-2 text-white">
          <Image src="/images/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-bold">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout library, train hard, log honest.</p>
      </div>
    </footer>
  );
}