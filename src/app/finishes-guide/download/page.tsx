import Link from "next/link";

const PDF_PATH = "/downloads/deepblue-hawaii-2026-finishes-guide.pdf";

export default function FinishesGuideDownloadPage() {
  return (
    <main className="min-h-screen bg-sky-50 py-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            Mahalo!
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your 2026 Finishes Selection Guide is ready. Click below to
            download your copy &mdash; we&apos;ve also kept your email on file
            so we can share future updates from DeepBlue Hawaii.
          </p>

          <a
            href={PDF_PATH}
            download
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            Download the guide (PDF)
          </a>

          <div className="mt-10">
            <Link
              href="/"
              className="text-sm text-sky-700 hover:text-sky-900 underline"
            >
              ← Back to DeepBlue Hawaii
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
