export default function Footer() {
  return (
    <footer id="contact" className="bg-sky-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Blue Hawaii Homes</h3>
            <p className="text-sky-200 text-sm leading-relaxed">
              Building exceptional homes on Maui, Hawaii. Crafted with care,
              designed for island living.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#about"
                className="text-sky-200 hover:text-white transition-colors text-sm"
              >
                About Us
              </a>
              <a
                href="#services"
                className="text-sky-200 hover:text-white transition-colors text-sm"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-sky-200 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="text-sky-200 text-sm space-y-2 mb-6">
              <p>123 Aloha Street</p>
              <p>Kahului, Maui, HI 96732</p>
              <p>(808) 555-0123</p>
            </div>
            <a
              href="mailto:info@bluehawaiihomes.com"
              className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2.5 px-6 rounded-full transition-colors text-sm"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sky-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-sky-300 text-xs text-center">
            &copy; {new Date().getFullYear()} Blue Hawaii Homes. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
