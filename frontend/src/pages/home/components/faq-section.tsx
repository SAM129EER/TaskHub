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
      "TaskHub is the AI task marketplace and project workspace for modern startups. Teams post tasks, deploy AI sourcing agents, or assign work to verified contributors with automated deliverable verification.",
  },
  {
    question: "Is TaskHub free to post tasks?",
    answer:
      "Yes! Posting unlimited tasks, receiving proposals, and managing your team workspace is $0 forever. Optional paid features include promoted task listings, AI Reach sourcing agents, and Autopilot managed recruiting.",
  },
  {
    question: "Is TaskHub free for contributors & freelancers?",
    answer:
      "Yes. Creating a profile, browsing open tasks, submitting proposals, and getting paid directly is always free for candidates and contributors.",
  },
  {
    question: "How does AI Task Sourcing work?",
    answer:
      "TaskHub Reach uses AI agents to continuously scan candidate portfolios, parse GitHub activity, and match exact technical requirements to available talent, sending personalized pitches on autopilot.",
  },
  {
    question: "How are payments and deliverable verification handled?",
    answer:
      "All task payments are protected in secure escrow. Funds are automatically verified and released once PR acceptance criteria or milestone checks pass.",
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
            Questions & Answers
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Everything you need <span className="font-serif-accent italic font-normal text-[#E9357B]">to know.</span>
          </h2>
        </div>

        {/* Interactive FAQ Accordion List */}
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
