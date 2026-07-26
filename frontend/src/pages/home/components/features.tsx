import { FolderKanban, ShieldCheck, Zap, Users, CheckCircle2, Clock, Layers, Filter } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="border-b border-black/10 bg-[#FAF9F6] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
            PRODUCTIVITY PLATFORM
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Everything your team needs to <span className="font-serif-accent italic font-normal text-[#E9357B]">stay on track.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/65">
            Designed for clarity and velocity. TaskHub cuts out fluff so your team can focus on completing high-value tasks.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#E9357B]/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-bold transition group-hover:bg-[#E9357B]">
              <FolderKanban className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-black">Kanban & List Boards</h3>
            <p className="mt-2 text-xs leading-relaxed text-black/65">
              Visualize task progress across customizable columns or collapse into clean high-density list views.
            </p>
          </div>

          <div className="group rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#E9357B]/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9357B] text-white font-bold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-black">Deliverable Verification</h3>
            <p className="mt-2 text-xs leading-relaxed text-black/65">
              Enforce explicit acceptance criteria before any task is verified and marked as officially Done.
            </p>
          </div>

          <div className="group rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#E9357B]/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-bold transition group-hover:bg-[#E9357B]">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-black">Priorities & Deadlines</h3>
            <p className="mt-2 text-xs leading-relaxed text-black/65">
              Assign explicit task owners, priority badges (P0-P3), and clear due-date countdowns.
            </p>
          </div>

          <div className="group rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#E9357B]/40 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white font-bold transition group-hover:bg-[#E9357B]">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-black">Real-Time Sync</h3>
            <p className="mt-2 text-xs leading-relaxed text-black/65">
              Instant updates across all team members when task statuses, assignments, or comments change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
