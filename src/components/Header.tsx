"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sky-900/85 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Deep Blue Hawaii logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-white text-xl font-bold tracking-wide">
            DEEP BLUE HAWAII
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          <a
            href="#about"
            className="text-sky-100 hover:text-white transition-colors text-sm font-medium"
          >
            About
          </a>
          <a
            href="#services"
            className="text-sky-100 hover:text-white transition-colors text-sm font-medium"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-sky-100 hover:text-white transition-colors text-sm font-medium"
          >
            Contact
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-sky-900/95 border-t border-sky-800 px-6 py-4 flex flex-col gap-4">
          <a
            href="#about"
            className="text-sky-100 hover:text-white transition-colors text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#services"
            className="text-sky-100 hover:text-white transition-colors text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-sky-100 hover:text-white transition-colors text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
