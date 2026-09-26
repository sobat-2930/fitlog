import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <p className="text-accent text-xs font-semibold tracking-widest mb-4">
        404
      </p>
      <h1 className="text-3xl font-bold mb-3">Workout not found</h1>
      <p className="text-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-accent text-black font-semibold px-5 py-3 rounded-lg"
      >
        Back to Library
      </Link>
    </div>
  );
}