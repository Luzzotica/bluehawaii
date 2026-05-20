"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function FinishesGuidePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source: "finishes-guide" }),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/finishes-guide/download");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
            2026 Finishes Selection Guide
          </h1>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl">
            Tell us where to send your free copy of the DeepBlue Hawaii 2026
            Finishes Selection Guide &mdash; a curated look at the materials,
            fixtures, and palettes shaping our 2026 builds.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-sky-900 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sky-900 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send me the guide"}
            </button>
            <p className="text-xs text-gray-500">
              We&apos;ll only use your email to share this guide and occasional
              DeepBlue Hawaii updates.
            </p>
          </form>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-sky-900 mb-3">
              From frame to finished
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every selection in the guide is informed by the homes we build
              from the ground up.
            </p>
          </div>
          <BeforeAfterSlider
            beforeSrc="/images/about-construction.jpg"
            afterSrc="/images/about-finished.jpg"
            beforeAlt="Plantation style home under construction with steel framing on Maui"
            afterAlt="Completed plantation style home on Maui"
          />
        </div>
      </section>
    </main>
  );
}
