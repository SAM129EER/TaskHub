import {
  BarChart3,
  FolderKanban,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with shared workspaces and real-time updates.",
  },

  {
    icon: FolderKanban,
    title: "Task Management",
    description:
      "Organize tasks with priorities, due dates, and smart workflows.",
  },

  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Visualize productivity with beautiful charts and insights.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Our Features
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            Everything you need to manage tasks effectively
          </h2>

          <p className="mt-6 text-lg leading-8 text-black/60">
            Powerful tools that help teams stay organized and
            deliver projects faster.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group rounded-3xl border-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardContent className="p-8">
                  {/* ICON */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition group-hover:bg-blue-600">
                    <Icon className="h-8 w-8 text-blue-600 transition group-hover:text-white" />
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-6 text-2xl font-bold">
                    {feature.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-4 leading-7 text-black/60">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}