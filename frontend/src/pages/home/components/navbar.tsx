import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-extrabold text-xl shadow-sm transition group-hover:bg-[#E9357B]">
            T
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-black flex items-center">
            TaskHub<span className="text-[#E9357B] font-extrabold">.</span>
          </span>
        </Link>

        {/* Centered Nav Links - Made Text Bigger */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base font-semibold text-black/80 transition hover:text-[#E9357B] underline-offset-4 decoration-[#E9357B]/50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons - Made Login & Sign Up Buttons Bigger */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="rounded-full text-base font-bold text-black hover:bg-black/5 px-5 py-2">
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => logout()}
                className="rounded-full bg-black px-6 py-2 text-base font-bold text-white hover:bg-black/85 shadow-sm"
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" className="rounded-full text-base font-bold text-black hover:bg-black/5 px-5 py-2">
                  Log in
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="rounded-full bg-[#E9357B] px-6 py-2.5 text-base font-bold text-white shadow-md transition hover:bg-[#d82b70] hover:shadow-lg">
                  Get started free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="rounded-full p-2 text-black hover:bg-black/5 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-black/10 bg-[#FAF9F6] px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-black/80"
              >
                {item.label}
              </a>
            ))}
            <div className="grid gap-2 border-t border-black/10 pt-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="h-11 w-full rounded-full border-black/20 text-base font-bold">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="h-11 rounded-full bg-black text-white text-base font-bold"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="h-11 w-full rounded-full border-black/20 text-black text-base font-bold">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="h-11 w-full rounded-full bg-[#E9357B] text-white font-bold text-base">
                      Get started free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
