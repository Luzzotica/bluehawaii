"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero-1.png",
    title: "Build Your Paradise",
    subtitle: "Quality plantation style homes on Maui",
  },
  {
    image: "/images/hero-2.png",
    title: "Island Living, Perfected",
    subtitle: "Designed for the Hawaiian lifestyle",
  },
  {
    image: "/images/hero-3.png",
    title: "From Ocean to Summit",
    subtitle: "Building dream homes across Maui",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [paused, advance]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  };

  const prev = () => goTo((activeIndex - 1 + slides.length) % slides.length);
  const next = () => goTo((activeIndex + 1) % slides.length);

  return (
    <section
      className="relative h-[80vh] overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured homes"
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative min-w-full h-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${slides.length}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-light drop-shadow-md">
                  {slide.subtitle}
                </p>
                <a
                  href="mailto:info@deepblue-hawaii.com"
                  className="inline-block mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full border border-white/40 transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 text-white text-2xl flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        &#8249;
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 text-white text-2xl flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        &#8250;
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === activeIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
