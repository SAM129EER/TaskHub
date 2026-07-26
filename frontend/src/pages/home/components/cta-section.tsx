import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#181616] py-28 text-center text-white">
      {/* Bottom Radial Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_100%,rgba(233,53,123,0.3),transparent_65%)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-white">
          <Sparkles className="h-3.5 w-3.5 text-[#E9357B]" /> Get Started Today
        </div>

        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Where modern product teams <br />
          <span className="font-serif-accent italic font-normal text-[#E9357B]">turn plans into shipped work.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          Join 15,000+ startups and engineering teams deploying AI agents, assigning tasks, and shipping software faster.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/sign-up?role=company">
            <Button className="h-13 rounded-full bg-[#E9357B] px-9 text-base font-semibold text-white shadow-xl hover:bg-[#d82b70]">
              Post a task free →
            </Button>
          </Link>
          <Link to="/sign-up?role=contributor">
            <Button
              variant="outline"
              className="h-13 rounded-full border-white/30 bg-transparent px-9 text-base font-semibold text-white hover:bg-white/10"
            >
              Browse open tasks
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
