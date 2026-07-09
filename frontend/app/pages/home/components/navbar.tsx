import { useState } from "react";
import { FolderKanban, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <FolderKanban className="h-5 w-5" />
          </div>

          <h1 className="text-xl font-bold tracking-tight">
            Task<span className="text-blue-600">Hub</span>
          </h1>
        </div>

        {/* NAV LINKS (DESKTOP) */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-md font-medium text-black/70 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-md font-medium text-black/70 transition hover:text-blue-600"
          >
            How It Works
          </a>

          <a
            href="#benefits"
            className="text-md font-medium text-black/70 transition hover:text-blue-600"
          >
            Benefits
          </a>
        </nav>

        {/* ACTION BUTTONS (DESKTOP) */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/sign-in">
            <Button variant="ghost" size="lg" className="hover:bg-slate-100 rounded-xl transition duration-200">
              Log in
            </Button>
          </Link>

          <Link to="/sign-up">
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition duration-200 text-white" size="lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 text-black/70 hover:text-black focus:outline-none transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-white py-4 px-6 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-4">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-md font-medium text-black/70 hover:text-blue-600 py-1 transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-md font-medium text-black/70 hover:text-blue-600 py-1 transition"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="text-md font-medium text-black/70 hover:text-blue-600 py-1 transition"
            >
              Benefits
            </a>
            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-black/5">
              <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl">
                  Log in
                </Button>
              </Link>
              <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
