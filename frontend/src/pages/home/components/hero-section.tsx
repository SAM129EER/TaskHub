import { ArrowRight, CheckCircle2, FolderKanban, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#FAF9F6] pt-14 pb-16 sm:pt-20 sm:pb-24">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_360px_at_10%_12%,rgba(233,53,123,0.08),transparent_65%),radial-gradient(640px_360px_at_90%_16%,rgba(24,22,22,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-black sm:text-7xl lg:text-8xl">
            Where focused teams <span className="font-serif-accent italic font-normal text-[#E9357B]">turn plans into shipped work.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-black/70 sm:text-2xl font-medium">
            TaskHub brings tasks, sprint ownership, deliverable verification, and team momentum into one clean workspace.
          </p>

          {/* Hero Buttons: Pink (#E9357B) & Pure White (#FFFFFF) */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/sign-up">
              <Button className="h-14 rounded-full bg-[#E9357B] px-9 text-lg font-bold text-white shadow-lg transition duration-200 hover:bg-[#d82b70] hover:shadow-xl">
                Start managing work free
                <ArrowRight className="ml-2.5 h-5 w-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button
                className="h-14 rounded-full border-2 border-[#E9357B] bg-white px-9 text-lg font-bold text-[#E9357B] shadow-md transition duration-200 hover:bg-[#FFF5F9]"
              >
                See how it works
              </Button>
            </a>
          </div>
        </div>

        {/* Dual Split Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Teams & Managers Card */}
          <Link
            to="/sign-up"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#221F20] to-[#141213] p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-9"
          >
            <div className="relative z-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
                For Teams & Project Leads
              </span>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl text-white">
                Coordinate sprints <span className="font-serif-accent italic text-[#E9357B]">without adding noise.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-md">
                Capture priorities, assign task owners, set clear deliverables, and keep every status visible before deadlines slip.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E9357B] px-6 py-2.5 text-sm font-bold text-white shadow-md transition group-hover:bg-[#d82b70]">
                Create team workspace →
              </div>
            </div>

            {/* Product Preview Board */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-mono tracking-wider text-white/60 uppercase">
                <span className="flex items-center gap-1.5 font-bold">
                  <FolderKanban className="h-4 w-4 text-[#E9357B]" /> Sprint Backlog
                </span>
                <span className="text-[#06D6A0] font-bold">8 Active Tasks</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl bg-white/[0.05] p-3 text-xs text-white/90">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <div>
                      <div className="font-bold text-white">Design Token Migration</div>
                      <div className="text-[11px] text-white/60">Assigned to Sarah · In Progress</div>
                    </div>
                  </div>
                  <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[10px] text-white/80 font-bold">
                    P1 High
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/[0.05] p-3 text-xs text-white/90">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#06D6A0]" />
                    <div>
                      <div className="font-bold text-white">Auth API Security Audit</div>
                      <div className="text-[11px] text-white/60">Assigned to Marcus · Verified</div>
                    </div>
                  </div>
                  <span className="rounded-md bg-[#06D6A0]/20 px-2.5 py-1 font-mono text-[10px] text-[#06D6A0] font-bold">
                    Done
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Individual Contributors Card */}
          <Link
            to="/dashboard"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E9357B]/20 bg-gradient-to-b from-[#FFF5F9] to-[#FCE8F0] p-7 text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-9"
          >
            <div className="relative z-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
                For Individual Contributors
              </span>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl text-black">
                Know what matters next <span className="font-serif-accent italic text-[#E9357B]">before the day starts.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/70 max-w-md">
                See your assigned work, pending verifications, and upcoming priorities without hunting through scattered notifications.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white border border-[#E9357B] text-[#E9357B] px-6 py-2.5 text-sm font-bold shadow-md transition group-hover:bg-[#E9357B] group-hover:text-white">
                View my task queue →
              </div>
            </div>

            {/* Product Preview Board */}
            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-black/5 pb-2.5 text-xs font-mono tracking-wider text-black/60 uppercase">
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckSquare className="h-4 w-4 text-[#E9357B]" /> My Daily Focus Queue
                </span>
                <span className="text-[#E9357B] font-bold">3 Tasks Left</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F6] p-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#E9357B]" />
                    <div>
                      <div className="font-bold text-black">Finalize Webhook Documentation</div>
                      <div className="text-[11px] text-black/60">Due Today at 2:00 PM</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-black/70 bg-black/5 px-2 py-0.5 rounded">
                    Docs
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-black/5 bg-[#FAF9F6] p-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-black/30" />
                    <div>
                      <div className="font-bold text-black">Review Pull Request #142</div>
                      <div className="text-[11px] text-black/60">Frontend Component Library</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#E9357B] bg-[#FFF5F9] px-2 py-0.5 rounded">
                    Urgent
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
