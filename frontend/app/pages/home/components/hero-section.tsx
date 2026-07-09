import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        {/* LEFT CONTENT */}
        <div className="animate-in fade-in slide-in-from-left-5 duration-500">
          {/* BADGE */}
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Smarter project management for modern teams
          </div>

          {/* HEADING */}
          <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight sm:text-6xl text-slate-900">
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
              <Button className="h-12 rounded-xl bg-blue-600 px-8 text-base text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition duration-200">
                Try For Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <a href="#features">
              <Button
                variant="outline"
                className="h-12 rounded-xl px-8 text-base border-slate-200 hover:bg-slate-50 transition duration-200"
              >
                See Features
              </Button>
            </a>
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

        {/* RIGHT SIDE IMAGE */}
        <div className="relative animate-in fade-in slide-in-from-right-5 duration-500">
          {/* GLOW EFFECTS */}
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl" />

          {/* HIGH-FIDELITY MOCKUP */}
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-slate-900/5 shadow-2xl transition duration-300 hover:scale-[1.02]">
            <img
              src="/dashboard_mockup.png"
              alt="TaskHub Modern Dashboard Preview"
              className="w-full h-auto object-cover max-h-[350px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
