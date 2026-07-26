import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is TaskHub?",
    answer:
      "TaskHub is a calm, focused task management workspace for modern product teams and individuals. It brings task organization, sprint tracking, ownership, and deliverable verification into one clean interface.",
  },
  {
    question: "Is TaskHub free to use?",
    answer:
      "Yes! Creating workspaces, managing task boards, assigning owners, and tracking progress is completely free.",
  },
  {
    question: "How does deliverable verification work?",
    answer:
      "When a task is marked ready, TaskHub allows project leads or reviewers to check acceptance criteria before officially closing out the task as Done.",
  },
  {
    question: "Can I switch between Kanban and List views?",
    answer:
      "Yes. You can toggle between column-based Kanban boards and high-density list views depending on how you prefer to view your sprint work.",
  },
  {
    question: "How does TaskHub help reduce team noise?",
    answer:
      "TaskHub keeps status, priority, ownership, and deliverable notes right on the task card, eliminating the need for constant check-in meetings or fragmented chat threads.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="border-b border-black/10 bg-[#FAF9F6] py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Everything you need <span className="font-serif-accent italic font-normal text-[#E9357B]">to know.</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-black/10 bg-white shadow-sm transition overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 text-left font-semibold text-lg text-black hover:text-[#E9357B] transition"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#E9357B] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-black/40 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#E9357B]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-black/5 px-6 pb-6 pt-3 text-base text-black/65 leading-relaxed animate-in fade-in-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
