import { Link, Outlet } from "react-router-dom";
import { ThemeToggle } from './../components/theme-toggle';

export default function AuthLayout() {
  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="flex h-16 items-center justify-between px-6 sm:px-10">
        <Link to="/signin" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">T</span>
          </span>

          <span className="text-lg font-semibold tracking-tight">
            TaskHub
          </span>
        </Link>

        <ThemeToggle/>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </section>

      <footer className="px-6 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TaskHub. All rights reserved.
      </footer>
    </main>
  );
}