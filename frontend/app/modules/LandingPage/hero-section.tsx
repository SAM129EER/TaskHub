import { ArrowRight, CheckCircle2, FolderKanban} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        {/* LEFT CONTENT */}
        <div>
          {/* BADGE */}
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Smarter project management for modern teams
          </div>

          {/* HEADING */}
          <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
            Get more done with
            <span className="text-blue-600"> TaskHub</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
            Organize projects, collaborate with your team, and track progress in
            one powerful productivity platform.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/sign-up">
              <Button className="h-12 rounded-xl bg-blue-600 px-8 text-base hover:bg-blue-700">
                Try For Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              className="h-12 rounded-xl px-8 text-base"
            >
              See Features
            </Button>
          </div>

          {/* SMALL POINTS */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-black/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              No credit card required
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Free plan available
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Cancel anytime
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE PLACEHOLDER */}
        <div className="relative">
          {/* GLOW EFFECTS */}
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl" />

          {/* IMAGE PLACEHOLDER */}
          <div className="relative flex h-[500px] items-center justify-center rounded-3xl border border-black/5 bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg">
                <FolderKanban className="h-10 w-10 text-blue-600" />
              </div>

              <p className="text-lg font-semibold text-black/70">
                Dashboard Image Here
              </p>

              <p className="mt-2 text-sm text-black/50">Add screenshot later</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
