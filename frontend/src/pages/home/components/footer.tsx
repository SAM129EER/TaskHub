import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#FAF9F6] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white font-bold text-sm">
              T
            </div>
            <span className="text-xl font-bold tracking-tight text-black">
              TaskHub<span className="text-[#E9357B] font-extrabold">.</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-8 text-xs font-mono font-medium text-black/60 uppercase tracking-wider">
            <a href="#for-companies" className="hover:text-black transition">
              For Companies
            </a>
            <a href="#for-contributors" className="hover:text-black transition">
              For Contributors
            </a>
            <a href="#ai-reach" className="hover:text-black transition">
              AI Sourcing
            </a>
            <a href="#interactive-search" className="hover:text-black transition">
              Marketplace
            </a>
            <a href="#faq" className="hover:text-black transition">
              FAQ
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-black/50">
            © {new Date().getFullYear()} TaskHub Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
