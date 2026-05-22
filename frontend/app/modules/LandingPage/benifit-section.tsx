import {
  Globe,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Easy to Use",
    description:
      "Intuitive interface that your team will love from day one.",
  },

  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security to keep your data safe.",
  },

  {
    icon: Globe,
    title: "Flexible & Scalable",
    description:
      "Grows with your team from small projects to big goals.",
  },

  {
    icon: Zap,
    title: "Integrations",
    description:
      "Works with your favorite tools and platforms.",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] bg-gradient-to-br from-slate-50 to-blue-50 p-10 md:p-16">
          {/* HEADER */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-medium text-blue-700 shadow-sm">
              Why Choose TaskHub
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
              Built for modern teams
            </h2>

            <p className="mt-6 text-lg leading-8 text-black/60">
              Everything you need to boost productivity and
              achieve more together.
            </p>
          </div>

          {/* BENEFIT GRID */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title}>
                  {/* ICON */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-6 text-xl font-bold">
                    {benefit.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-4 leading-7 text-black/60">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}