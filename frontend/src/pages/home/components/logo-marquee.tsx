import { Command, Globe, Terminal, Cpu, Code, Layers, Cloud, Layout } from "lucide-react";

const teams = [
  { name: "Linear", icon: Command, focus: "Sprint Workflows" },
  { name: "Vercel", icon: Globe, focus: "Edge Deployments" },
  { name: "Supabase", icon: Terminal, focus: "Database Tasks" },
  { name: "Raycast", icon: Cpu, focus: "Plugin Backlog" },
  { name: "Resend", icon: Code, focus: "API Features" },
  { name: "Retool", icon: Layers, focus: "Internal Tools" },
  { name: "Cloudflare", icon: Cloud, focus: "Security Sprints" },
  { name: "Figma", icon: Layout, focus: "Design Systems" },
];

export default function LogoMarquee() {
  return (
    <div className="border-b border-black/10 bg-[#FAF9F6] py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 mb-6">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-black/50">
          Powering task workflows for 15,000+ teams worldwide
        </h2>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee gap-10 items-center">
          {[...teams, ...teams, ...teams].map((team, index) => {
            const Icon = team.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-5 py-2.5 shadow-sm transition hover:border-[#E9357B]/40 hover:shadow-md cursor-pointer shrink-0"
              >
                <Icon className="h-4 w-4 text-black/75" />
                <span className="font-bold text-sm tracking-tight text-black">{team.name}</span>
                <span className="rounded-md bg-black/5 px-2 py-0.5 font-mono text-[10px] text-black/50">
                  {team.focus}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
