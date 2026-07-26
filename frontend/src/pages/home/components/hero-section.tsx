import { ArrowRight, Sparkles, CheckCircle2, Zap, MessageSquare, Clock, UserCheck, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#FAF9F6] pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Background Radial Glow Effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_360px_at_10%_12%,rgba(233,53,123,0.07),transparent_65%),radial-gradient(640px_360px_at_90%_16%,rgba(24,22,22,0.06),transparent_65%)]" />

      {/* Flanking Floating Marketplace Heartbeat Chips */}
      <div className="hidden xl:block">
        {/* Left Floating Chips */}
        <div className="absolute left-[3%] top-[22%] z-10 flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-lg animate-drift-slow">
          <span className="h-2 w-2 rounded-full bg-[#06D6A0] shadow-[0_0_8px_rgba(6,214,160,0.6)]" />
          <span>Sprint QA Passed</span>
          <span className="font-normal text-black/50">· 2m ago</span>
        </div>

        <div className="absolute left-[5%] top-[55%] z-10 flex items-center gap-2 rounded-full border border-[#E9357B]/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-lg animate-drift-fast">
          <Zap className="h-3.5 w-3.5 text-[#E9357B]" />
          <span>AI Agent matched 14 contributors</span>
          <span className="font-normal text-black/50">· just now</span>
        </div>

        {/* Right Floating Chips */}
        <div className="absolute right-[3%] top-[25%] z-10 flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-lg animate-drift-fast">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 font-bold text-[10px]">
            $
          </span>
          <span>High Priority Auth API</span>
          <span className="font-mono text-xs font-bold text-[#E9357B]">$2,400</span>
        </div>

        <div className="absolute right-[6%] top-[58%] z-10 flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-lg animate-drift-slow">
          <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
          <span>5 proposals submitted</span>
          <span className="font-normal text-black/50">· 10m ago</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#E9357B]/20 bg-white px-4 py-1.5 text-xs font-medium text-black/80 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#E9357B] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#E9357B] font-semibold">Live Marketplace</span>
            <span className="text-black/30">|</span>
            <span>Over 12,000 tasks completed this month</span>
          </div>

          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-black sm:text-7xl lg:text-8xl">
            Where great teams <span className="font-serif-accent italic font-normal text-[#E9357B]">ship great work.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-black/65 sm:text-xl">
            The AI task & project marketplace for modern startups. Post tasks free, deploy AI sourcing agents, or get verified contributors instantly.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/sign-up">
              <Button className="h-12 rounded-full bg-[#E9357B] px-8 text-base font-semibold text-white shadow-md transition hover:bg-[#d82b70] hover:shadow-lg">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#interactive-search">
              <Button
                variant="outline"
                className="h-12 rounded-full border-black/15 bg-white px-8 text-base font-semibold text-black transition hover:bg-black/5"
              >
                Explore live marketplace
              </Button>
            </a>
          </div>
        </div>

        {/* Wellfound Style Dual Split Entrance Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Company / Hiring Side Card (Dark Theme) */}
          <Link
            to="/sign-up?role=company"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#221F20] to-[#141213] p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-9"
          >
            <div className="relative z-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
                For Companies & Managers
              </span>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl text-white">
                Find your <span className="font-serif-accent italic text-[#E9357B]">next contributor.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-md">
                Post tasks for free, deploy AI agents to source top talent, or delegate to verified product teams.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E9357B] px-5 py-2 text-xs font-semibold text-white shadow-md transition group-hover:bg-[#d82b70]">
                Post a task free →
              </div>
            </div>

            {/* Product Preview Card Anchor */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-[11px] font-mono tracking-wider text-white/50 uppercase">
                <span>AI Reach Agent · Active</span>
                <span className="flex items-center gap-1 text-[#06D6A0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#06D6A0]" />
                  Live Match
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl bg-white/[0.05] p-2.5 text-xs text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9357B]/20 font-semibold text-[#E9357B]">
                      PS
                    </div>
                    <div>
                      <div className="font-semibold text-white">Priya Shah</div>
                      <div className="text-[11px] text-white/50">Sr React Lead · 7 YOE</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#06D6A0]/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#06D6A0]">
                    Replied
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/[0.05] p-2.5 text-xs text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 font-semibold text-blue-400">
                      MB
                    </div>
                    <div>
                      <div className="font-semibold text-white">Marcus Bennett</div>
                      <div className="text-[11px] text-white/50">Backend & AI Specialist · 9 YOE</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-white/70">
                    Pitched
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Candidate / Contributor Side Card (Light Pink Tint Theme) */}
          <Link
            to="/sign-up?role=contributor"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E9357B]/15 bg-gradient-to-b from-[#FFF5F9] to-[#FCE8F0] p-7 text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-9"
          >
            <div className="relative z-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
                For Contributors & Talent
              </span>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl text-black">
                Find your <span className="font-serif-accent italic text-[#E9357B]">next project.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65 max-w-md">
                Apply directly to founders and engineering leads at 15,000+ startups building the future.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-xs font-semibold text-white shadow-md transition group-hover:bg-black/85">
                Browse open tasks →
              </div>
            </div>

            {/* Product Preview Card Anchor */}
            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-black/5 pb-2.5 text-[11px] font-mono tracking-wider text-black/50 uppercase">
                <span>Matched Tasks · Recommended</span>
                <span className="text-[#E9357B] font-semibold">Updated Today</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F6] p-2.5 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold text-xs">
                      N
                    </div>
                    <div>
                      <div className="font-semibold text-black">Notion Inc.</div>
                      <div className="text-[11px] text-black/55">Real-time Sync Engine · High Priority</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#E9357B] text-xs">$3,500</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F6] p-2.5 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-xs">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-black">Stripe</div>
                      <div className="text-[11px] text-black/55">Webhook Dispatcher Microservice</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#E9357B] text-xs">$2,800</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
