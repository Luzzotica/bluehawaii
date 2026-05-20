import Image from "next/image";

const PDF_PATH = "/downloads/deepblue-hawaii-2026-finishes-guide.pdf";

export default function FinishesGuideDownloadPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-orange-600 mb-3">
              Mahalo &mdash; your guide is ready
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-6 leading-tight">
              Start designing the home you&apos;ve been dreaming of.
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
              Inside the 2026 Finishes Selection Guide you&apos;ll find the
              materials, fixtures, and palettes we&apos;re bringing to this
              year&apos;s builds. Use it to sketch out the look and feel of
              your future home on Maui &mdash; then let&apos;s build it
              together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={PDF_PATH}
                download
                className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                Download the guide (PDF)
              </a>
              <a
                href="mailto:info@deepblue-hawaii.com"
                className="inline-flex items-center justify-center border border-sky-900 text-sky-900 font-semibold py-3 px-8 rounded-lg hover:bg-sky-900 hover:text-white transition-colors"
              >
                Talk to our team
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Ready to take the next step? Bring the finishes you love to a
              conversation with our team and we&apos;ll help shape them into
              your home.
            </p>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/about-finished.jpg"
              alt="Completed plantation style home on Maui"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
