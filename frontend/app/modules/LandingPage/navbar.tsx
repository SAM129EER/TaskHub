import { FolderKanban, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FolderKanban className="h-5 w-5" />
          </div>

          <h1 className="text-xl font-bold tracking-tight">
            Task<span className="text-blue-600">Hub</span>
          </h1>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="#features"
            className="text-md text-black/70 transition hover:text-black"
          >
            Features
          </Link>

          <Link
            to="#how-it-works"
            className="text-md text-black/70 transition hover:text-black"
          >
            How It Works
          </Link>

          <Link
            to="#benefits"
            className="text-md text-black/70 transition hover:text-black"
          >
            Benefits
          </Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/sign-in">
            <Button variant="ghost" size="lg">Log in</Button>
          </Link>

          <Link to="/sign-up">
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg" size="lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* MOBILE MENU */}
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
