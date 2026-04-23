import BeforeAfterSlider from "./BeforeAfterSlider";

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
            Deep Blue Hawaii is a Maui-based home building company dedicated to
            creating quality, affordable residences that embrace the beauty and
            spirit of island living. With deep roots in the local community, we bring
            decades of experience building homes that withstand Hawaii&apos;s
            unique climate while celebrating its breathtaking surroundings.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Specializing in plantation style homes, every residence we build is
            designed to blend seamlessly with Maui&apos;s natural landscape. We
            use locally sourced materials whenever possible and incorporate
            sustainable building practices to protect the islands we call home.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our team of skilled craftsmen, architects, and designers work closely
            with each client to deliver quality homes at an affordable price
            &mdash; proving that beautiful island living doesn&apos;t have to
            break the bank.
          </p>
        </div>

        {/* Before / After slider */}
        <BeforeAfterSlider
          beforeSrc="/images/about-construction.jpg"
          afterSrc="/images/about-finished.jpg"
          beforeAlt="Plantation style home under construction with steel framing on Maui"
          afterAlt="Completed plantation style home on Maui"
        />
      </div>
    </section>
  );
}
