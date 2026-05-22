export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create account",
      description:
        "Sign up and set up your workspace in seconds.",
    },

    {
      step: "02",
      title: "Invite your team",
      description:
        "Collaborate together using shared workspaces.",
    },

    {
      step: "03",
      title: "Track progress",
      description:
        "Manage tasks and monitor productivity in real time.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-slate-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            How It Works
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            Simple process, powerful results
          </h2>

          <p className="mt-6 text-lg text-black/60">
            Get started in minutes and improve team productivity.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative text-center"
            >
              {/* CIRCLE */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-500/30">
                {item.step}
              </div>

              {/* TITLE */}
              <h3 className="mt-8 text-2xl font-bold">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-4 leading-7 text-black/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}