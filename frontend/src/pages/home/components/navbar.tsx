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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold text-lg shadow-sm transition group-hover:bg-[#E9357B]">
            T
          </div>
          <span className="text-2xl font-bold tracking-tight text-black flex items-center">
            TaskHub<span className="text-[#E9357B] font-extrabold">.</span>
          </span>
        </Link>

        {/* Centered Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
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

        {/* Action Buttons */}
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
              <Link to="/sign-up">
                <Button className="rounded-full bg-[#E9357B] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#d82b70]">
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
