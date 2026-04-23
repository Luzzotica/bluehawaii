export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-4xl font-bold text-sky-900 mb-6">
            Building Dreams in Paradise
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Blue Hawaii Homes is a Maui-based home building company dedicated to
            creating exceptional residences that embrace the beauty and spirit of
            island living. With deep roots in the local community, we bring
            decades of experience building homes that withstand Hawaii&apos;s
            unique climate while celebrating its breathtaking surroundings.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            From oceanfront estates to hillside retreats, every home we build is
            designed to blend seamlessly with Maui&apos;s natural landscape. We
            use locally sourced materials whenever possible and incorporate
            sustainable building practices to protect the islands we call home.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our team of skilled craftsmen, architects, and designers work closely
            with each client to bring their vision to life &mdash; creating
            spaces that are as functional as they are beautiful.
          </p>
        </div>

        {/* Placeholder image */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sky-300 via-cyan-400 to-emerald-400 flex items-center justify-center shadow-xl">
            <div className="text-center text-white/80">
              <svg
                className="w-16 h-16 mx-auto mb-3 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                />
              </svg>
              <p className="text-sm font-medium">Company Photo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
