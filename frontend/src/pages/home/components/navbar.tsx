import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, UserCheck, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "#for-companies", label: "For Companies" },
  { href: "#for-contributors", label: "For Contributors" },
  { href: "#ai-reach", label: "AI Sourcing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signupMenuOpen, setSignupMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, logout } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSignupMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold text-lg shadow-sm transition group-hover:bg-[#E9357B]">
            T
          </div>
          <span className="text-2xl font-bold tracking-tight text-black flex items-center">
            TaskHub<span className="text-[#E9357B] font-extrabold">.</span>
          </span>
        </Link>

        {/* Centered Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-black/70 transition hover:text-black hover:underline underline-offset-4 decoration-[#E9357B]/40"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Auth CTA Controls */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="rounded-full text-sm font-medium text-black hover:bg-black/5">
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => logout()}
                className="rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/85"
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" className="rounded-full text-sm font-medium text-black hover:bg-black/5">
                  Log in
                </Button>
              </Link>

              {/* Wellfound Style Interactive Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  onClick={() => setSignupMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 rounded-full bg-[#E9357B] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#d82b70]"
                >
                  Sign up
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${signupMenuOpen ? "rotate-180" : ""}`} />
                </Button>

                {signupMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-black/10 bg-white p-2 shadow-xl ring-1 ring-black/5 transition-all z-50">
                    <div className="px-3 py-2 text-[11px] font-mono font-semibold tracking-wider text-black/40 uppercase">
                      Select Account Type
                    </div>
                    <Link
                      to="/sign-up?role=contributor"
                      onClick={() => setSignupMenuOpen(false)}
                      className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#FAF9F6] text-left group"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E9357B]/10 text-[#E9357B] group-hover:bg-[#E9357B] group-hover:text-white transition">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-black">I'm looking to work</div>
                        <div className="text-xs text-black/55">Complete tasks & earn</div>
                      </div>
                    </Link>

                    <Link
                      to="/sign-up?role=company"
                      onClick={() => setSignupMenuOpen(false)}
                      className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-[#FAF9F6] text-left group"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/5 text-black group-hover:bg-black group-hover:text-white transition">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-black">I'm looking to hire</div>
                        <div className="text-xs text-black/55">Post tasks & manage teams</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-black/10 bg-[#FAF9F6] px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-black/80"
              >
                {item.label}
              </a>
            ))}
            <div className="grid gap-2 border-t border-black/10 pt-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="h-11 w-full rounded-full border-black/20">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="h-11 rounded-full bg-black text-white"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="h-11 w-full rounded-full border-black/20 text-black">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="h-11 w-full rounded-full bg-[#E9357B] text-white font-semibold">
                      Sign up free
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
