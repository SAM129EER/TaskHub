import { CheckCircle2, ArrowRight, Layers, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Create & Organize Tasks",
      description: "Define task requirements, assign owners, add tags, and set clear priority levels (P0-P3).",
    },
    {
      num: "02",
      title: "Track Sprint Progress",
      description: "Move tasks across visual Kanban columns or list queues as work progresses in real time.",
    },
    {
      num: "03",
      title: "Verify & Complete Deliverables",
      description: "Perform deliverable checks against acceptance criteria before closing out the task.",
    },
  ];

  return (
    <section id="how-it-works" className="border-b border-black/10 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Text */}
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
              SIMPLE WORKFLOW
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Three steps to <span className="font-serif-accent italic font-normal text-[#E9357B]">uninterrupted focus.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/65">
              TaskHub strips away unnecessary process so your team can organize work in seconds and focus on execution.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link to="/sign-up">
                <Button className="h-12 rounded-full bg-[#E9357B] px-8 text-sm font-semibold text-white shadow-md hover:bg-[#d82b70]">
                  Get started free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Steps Card Stack */}
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-5 rounded-3xl border border-black/10 bg-[#FAF9F6] p-6 shadow-sm transition hover:border-[#E9357B]/40 hover:bg-white"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white font-bold font-mono text-sm">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-black/65">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
