const steps = [
  {
    step: "01",
    title: "Create the workspace",
    description:
      "Start with a clean team space, verified account, and the categories that match how your team ships.",
  },
  {
    step: "02",
    title: "Shape the queue",
    description:
      "Add work, set priority, assign status, and keep the active queue understandable at a glance.",
  },
  {
    step: "03",
    title: "Review and move",
    description:
      "Use the dashboard to see progress, clear stale work, and keep the next handoff visible.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 border-b border-black/10 bg-[#f3efe7] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E9357B]">
              Workflow
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
              A simpler way to keep work in motion.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-black/60">
            Each step is intentionally visible, with enough space for teams to
            scan the work instead of decoding it.
          </p>
        </div>

        <div className="grid gap-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="grid rounded-xl border border-black/10 bg-white p-5 sm:grid-cols-[120px_1fr] sm:items-center lg:p-6"
            >
              <div className="text-3xl font-semibold tracking-tight text-[#E9357B]">
                {item.step}
              </div>
              <div className="mt-3 sm:mt-0">
                <h3 className="text-2xl font-semibold tracking-tight text-black">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-3xl leading-7 text-black/60">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
