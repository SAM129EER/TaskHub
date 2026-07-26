import { FolderKanban, ShieldCheck, Zap, Users, Code, Lock, CheckCircle2, Clock } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="for-companies" className="border-b border-black/10 bg-[#FAF9F6] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Company Audience Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
              FOR COMPANIES & MANAGERS
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Ship software faster <span className="font-serif-accent italic font-normal text-[#E9357B]">without extra noise.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/65">
              TaskHub eliminates endless status meetings and email tag. Manage tasks, verify deliverables, and scale engineering output smoothly.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white font-bold">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Unlimited Free Task Posts</h3>
                  <p className="mt-1 text-sm text-black/65">Post as many task specs or bug bounties as you need with zero upfront fees.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9357B] text-white font-bold">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Built-in Deliverable Verification</h3>
                  <p className="mt-1 text-sm text-black/65">Automated pull-request checks and milestone verification before funds release.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white font-bold">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">Dedicated Autopilot Account Manager</h3>
                  <p className="mt-1 text-sm text-black/65">Optional managed recruiting and task delegation for complex enterprise sprints.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Feature Card Display */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition">
              <ShieldCheck className="h-8 w-8 text-[#E9357B]" />
              <h4 className="mt-4 text-lg font-bold text-black">Escrow Protection</h4>
              <p className="mt-2 text-xs text-black/60 leading-relaxed">
                Funds remain safely held in escrow until deliverables pass your acceptance criteria.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition">
              <Zap className="h-8 w-8 text-black" />
              <h4 className="mt-4 text-lg font-bold text-black">Instant Match</h4>
              <p className="mt-2 text-xs text-black/60 leading-relaxed">
                AI algorithms instantly match task requirements to available top-rated developers.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition">
              <Code className="h-8 w-8 text-black" />
              <h4 className="mt-4 text-lg font-bold text-black">GitHub Integration</h4>
              <p className="mt-2 text-xs text-black/60 leading-relaxed">
                Connect repos directly to auto-sync issues, PR merges, and task completion triggers.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition">
              <Users className="h-8 w-8 text-[#E9357B]" />
              <h4 className="mt-4 text-lg font-bold text-black">Verified Engineers</h4>
              <p className="mt-2 text-xs text-black/60 leading-relaxed">
                Over 10M+ opted-in contributors with transparent YOE and past project ratings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
