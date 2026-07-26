import { useState } from "react";
import { Search, Filter, Sparkles, MapPin, DollarSign, ArrowUpRight, CheckCircle, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TaskItem {
  id: string;
  title: string;
  category: string;
  company: string;
  budget: string;
  type: string;
  location: string;
  tags: string[];
  description: string;
  postedTime: string;
}

const mockTasks: TaskItem[] = [
  {
    id: "1",
    title: "Build Real-Time Collaborative Canvas Plugin",
    category: "Engineering & Dev",
    company: "Figma Community Team",
    budget: "$4,500",
    type: "Contract Task",
    location: "Remote",
    tags: ["React", "Canvas API", "WebSockets"],
    description: "Looking for an expert React developer to engineer a high-throughput collaborative canvas engine supporting 50+ concurrent users with OT/CRDT synchronization.",
    postedTime: "10 minutes ago",
  },
  {
    id: "2",
    title: "Train Fine-Tuned Llama-3 Sourcing Agent",
    category: "AI & Machine Learning",
    company: "Wellfound Reach AI",
    budget: "$6,000",
    type: "Milestone Task",
    location: "Remote",
    tags: ["PyTorch", "vLLM", "RAG Pipeline"],
    description: "Fine-tune open-weights models for high-precision resume parsing, candidate scoring, and automated personalized outreach generation.",
    postedTime: "25 minutes ago",
  },
  {
    id: "3",
    title: "Design Modern Glassmorphic Dashboard Design System",
    category: "Design & UI/UX",
    company: "Linear Design Guild",
    budget: "$3,200",
    type: "Fixed Scope",
    location: "Remote",
    tags: ["Figma", "Tailwind CSS", "Design Tokens"],
    description: "Craft a comprehensive light & dark mode design token library and interactive component set for next-generation developer tools.",
    postedTime: "1 hour ago",
  },
  {
    id: "4",
    title: "High-Throughput Stripe Webhook Queue Microservice",
    category: "Engineering & Dev",
    company: "PayFlow Startup",
    budget: "$2,800",
    type: "Contract Task",
    location: "Remote",
    tags: ["Go", "Redis", "Kafka"],
    description: "Build an ultra-resilient payment event processing pipeline capable of handling 5,000 requests/sec with zero drop rate.",
    postedTime: "2 hours ago",
  },
  {
    id: "5",
    title: "AI Project Manager Workflow Agent",
    category: "Product & Ops",
    company: "TaskHub Labs",
    budget: "$5,000",
    type: "Milestone Task",
    location: "Remote",
    tags: ["Python", "LangChain", "PostgreSQL"],
    description: "Construct an autonomous triage agent that categorizes incoming client bug reports, estimates story points, and assigns owners automatically.",
    postedTime: "3 hours ago",
  },
];

const categories = ["All Categories", "Engineering & Dev", "AI & Machine Learning", "Design & UI/UX", "Product & Ops"];

export default function InteractiveSearch() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const filteredTasks = mockTasks.filter((task) => {
    const matchesCategory = selectedCategory === "All Categories" || task.category === selectedCategory;
    const matchesQuery =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="interactive-search" className="border-b border-black/10 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E9357B]">
            Interactive Task Marketplace
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Browse live tasks <span className="font-serif-accent italic font-normal text-[#E9357B]">& verified talent.</span>
          </h2>
          <p className="mt-4 text-base text-black/65">
            Filter through high-impact tasks posted by top engineering teams and startups.
          </p>
        </div>

        {/* Wellfound Style Interactive Search Bar Controls */}
        <div className="mt-10 rounded-2xl border border-black/10 bg-[#FAF9F6] p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
              <input
                type="text"
                placeholder="Search by skill, role, or company (e.g. React, AI, Stripe)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 py-2.5 text-sm text-black placeholder-black/40 outline-none transition focus:border-[#E9357B] focus:ring-1 focus:ring-[#E9357B]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? "bg-black text-white shadow-sm"
                      : "bg-white border border-black/10 text-black/70 hover:bg-black/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task Cards Results Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#E9357B]/40 hover:shadow-lg cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-black/50 mb-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#E9357B] font-semibold">
                      {task.category}
                    </span>
                    <span>{task.postedTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-black group-hover:text-[#E9357B] transition line-clamp-2">
                    {task.title}
                  </h3>

                  <div className="mt-2 text-xs font-semibold text-black/70 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                    {task.company}
                  </div>

                  <p className="mt-3 text-xs text-black/60 line-clamp-3 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-black/5 pt-3">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#FFF5F9] px-2 py-0.5 font-mono text-[10px] font-medium text-[#E9357B]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-black/40 block uppercase tracking-wider">Budget</span>
                      <span className="font-mono text-base font-bold text-black">{task.budget}</span>
                    </div>

                    <Button
                      size="sm"
                      className="rounded-full bg-black px-4 text-xs font-semibold text-white group-hover:bg-[#E9357B]"
                    >
                      View task <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-black/20 p-12 text-center">
              <p className="text-base text-black/60 font-medium">No tasks found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-semibold text-[#E9357B] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Detail Modal Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl border border-black/10 bg-white p-7 shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-black/50 hover:bg-black/5 hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#E9357B]">
              <Tag className="h-3.5 w-3.5" /> {selectedTask.category}
            </div>

            <h3 className="mt-2 text-2xl font-bold text-black">{selectedTask.title}</h3>
            <div className="mt-1 text-sm font-medium text-black/70">{selectedTask.company} · {selectedTask.location}</div>

            <div className="mt-4 rounded-2xl bg-[#FAF9F6] p-4 text-sm text-black/80 leading-relaxed border border-black/5">
              {selectedTask.description}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
              <div>
                <span className="text-xs text-black/40 block uppercase tracking-wider">Estimated Payout</span>
                <span className="font-mono text-2xl font-bold text-black">{selectedTask.budget}</span>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setSelectedTask(null)} className="rounded-full">
                  Close
                </Button>
                <Link to="/sign-up">
                  <Button className="rounded-full bg-[#E9357B] text-white hover:bg-[#d82b70] px-6 font-semibold">
                    Submit Proposal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
