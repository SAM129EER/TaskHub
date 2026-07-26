import { Globe2, LockKeyhole, MessageSquareText, Zap } from "lucide-react";

const benefits = [
  {
    icon: LockKeyhole,
    title: "Session-aware security",
    description:
      "Verification, refresh, and logout flows are reflected directly in the workspace experience.",
  },
  {
    icon: MessageSquareText,
    title: "Less status theater",
    description:
      "Work cards show the essentials so conversations can move from reporting to deciding.",
  },
  {
    icon: Globe2,
    title: "Local now, API-ready later",
    description:
      "Task pages can run locally today and map cleanly to backend task endpoints when they land.",
  },
  {
    icon: Zap,
    title: "Fast daily flow",
    description:
      "Create, filter, complete, and review work without digging through nested project screens.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="scroll-mt-16 border-b border-black/10 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E9357B]">
              Security and focus
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
              A control room for the work that matters.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-black/60">
            TaskHub keeps account and work signals visible: who is signed in,
            whether email is verified, and what needs attention next.
          </p>
        </div>

        <div className="grid gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="grid rounded-xl border border-black/10 bg-[#fbfaf7] p-5 sm:grid-cols-[64px_240px_1fr] sm:items-center"
              >
                <Icon className="h-6 w-6 text-[#E9357B]" />
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-black sm:mt-0">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-black/60 sm:mt-0">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
