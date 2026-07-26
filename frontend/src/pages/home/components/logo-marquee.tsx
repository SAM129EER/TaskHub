import { Layers, ShieldCheck, Cpu, Command, Globe, Code, Cloud, Terminal } from "lucide-react";

const logos = [
  { name: "Linear", icon: Command, tag: "Sprint Planning" },
  { name: "Vercel", icon: Globe, tag: "Edge Deployments" },
  { name: "Supabase", icon: Terminal, tag: "Database Tasks" },
  { name: "Raycast", icon: Cpu, tag: "Extensions & Plugins" },
  { name: "Resend", icon: Code, tag: "Transactional API" },
  { name: "Retool", icon: Layers, tag: "Internal Tools" },
  { name: "Cloudflare", icon: Cloud, tag: "Workers & Security" },
];

export default function LogoMarquee() {
  return (
    <div className="border-b border-black/10 bg-[#FAF9F6] py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 mb-8">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-black/50">
          Trusted by 15,000+ teams from seed-stage to enterprise
        </h2>
      </div>

      {/* Infinite Scrolling Logo Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee gap-12 items-center">
          {/* Double array for seamless loop */}
          {[...logos, ...logos, ...logos].map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-5 py-2.5 shadow-sm transition hover:border-[#E9357B]/40 hover:shadow-md cursor-pointer shrink-0"
              >
                <Icon className="h-5 w-5 text-black/75" />
                <span className="font-bold text-sm tracking-tight text-black">{logo.name}</span>
                <span className="rounded-md bg-black/5 px-2 py-0.5 font-mono text-[10px] text-black/50">
                  {logo.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
