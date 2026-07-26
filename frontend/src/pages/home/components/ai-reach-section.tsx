import { useState } from "react";
import { Sparkles, Bot, CheckCircle2, ArrowRight, RefreshCw, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const samplePrompts = [
  "Source Sr React Engineer with Canvas & WebGL experience",
  "Find AI ML Engineer with vLLM & RAG pipeline focus",
  "Match QA Tester with Cypress & Playwright automation",
];

const mockMatches = [
  { name: "Elena Rostova", role: "Sr Frontend Architect", score: "99% Fit Match", yoe: "8 YOE", status: "AI Sourced" },
  { name: "David Kim", role: "AI Systems Engineer", score: "96% Fit Match", yoe: "6 YOE", status: "Active Now" },
  { name: "Sarah Jenkins", role: "Staff Fullstack Lead", score: "94% Fit Match", yoe: "10 YOE", status: "Verified" },
];

export default function AIReachSection() {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = (index: number) => {
    setActivePromptIndex(index);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };

  return (
    <section id="ai-reach" className="relative overflow-hidden bg-[#181616] py-24 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,rgba(233,53,123,0.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Description Column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#E9357B]">
              <Bot className="h-4 w-4" /> TaskHub Reach AI
            </div>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Deploy AI sourcing agents <span className="font-serif-accent italic font-normal text-[#E9357B]">in seconds.</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-white/70">
              TaskHub Reach continuously scans 10M+ opted-in contributors, parses technical verified portfolios, and engages the top 1% candidates on autopilot.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#E9357B]" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Autonomous Technical Scoring</h4>
                  <p className="text-xs text-white/60">Calculates exact skill match, commit frequency, and availability score.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#E9357B]" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Automated Personalized Outreach</h4>
                  <p className="text-xs text-white/60">Sends tailored task pitches based on candidate open-source contributions.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <Link to="/sign-up?role=company">
                <Button className="h-12 rounded-full bg-[#E9357B] px-7 text-sm font-semibold text-white shadow-lg hover:bg-[#d82b70]">
                  Deploy AI Agent Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Interactive Simulator Dashboard Widget */}
          <div className="rounded-3xl border border-white/10 bg-[#221F20] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E9357B]/20 text-[#E9357B]">
                  <Cpu className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                  AI Agent Simulator
                </span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#06D6A0]">
                <span className="h-2 w-2 rounded-full bg-[#06D6A0] animate-pulse" />
                Agent Active
              </span>
            </div>

            {/* Prompt Selector Buttons */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block">
                Select Prompt Trigger:
              </span>
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunSimulation(idx)}
                  className={`w-full text-left rounded-xl p-3 text-xs font-medium transition flex items-center justify-between ${
                    activePromptIndex === idx
                      ? "bg-[#E9357B]/15 border border-[#E9357B]/40 text-white"
                      : "bg-white/5 border border-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <span className="truncate pr-2">"{prompt}"</span>
                  {activePromptIndex === idx && <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#E9357B]" />}
                </button>
              ))}
            </div>

            {/* Live Matched Stream Card */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-2.5">
                <span>Simulation Stream</span>
                {isSimulating ? (
                  <span className="flex items-center gap-1 text-[#E9357B]">
                    <RefreshCw className="h-3 w-3 animate-spin" /> Matching...
                  </span>
                ) : (
                  <span className="text-white/60">3 Candidates Identified</span>
                )}
              </div>

              <div className="mt-3 space-y-2.5">
                {mockMatches.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl bg-white/5 p-3 text-xs transition duration-300 ${
                      isSimulating ? "opacity-40" : "opacity-100"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        {m.name}
                        <span className="rounded-md bg-[#E9357B]/20 px-2 py-0.5 font-mono text-[10px] text-[#E9357B]">
                          {m.score}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/50">{m.role} · {m.yoe}</div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 rounded-full text-xs font-semibold text-[#E9357B] hover:bg-[#E9357B]/15 hover:text-white"
                    >
                      Pitch →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
