import { FolderKanban } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-16 bg-slate-50/50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {/* BRAND */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FolderKanban className="h-5 w-5" />
            </div>

            <h1 className="text-xl font-bold">
              Task<span className="text-blue-600">Hub</span>
            </h1>
          </div>

          <p className="mt-6 max-w-sm leading-7 text-black/60">
            Modern task management platform that helps teams
            organize, track, and complete work efficiently.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold text-slate-800">Product</h3>

          <ul className="mt-6 space-y-4 text-black/60">
            <li><a href="#features" className="hover:text-blue-600 transition">Features</a></li>
            <li><span className="cursor-not-allowed text-black/40">Pricing</span></li>
            <li><span className="cursor-not-allowed text-black/40">Integrations</span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">Company</h3>

          <ul className="mt-6 space-y-4 text-black/60">
            <li><span className="cursor-not-allowed text-black/40">About</span></li>
            <li><span className="cursor-not-allowed text-black/40">Careers</span></li>
            <li><span className="cursor-not-allowed text-black/40">Blog</span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">Legal</h3>

          <ul className="mt-6 space-y-4 text-black/60">
            <li><span className="cursor-not-allowed text-black/40">Privacy Policy</span></li>
            <li><span className="cursor-not-allowed text-black/40">Terms</span></li>
            <li><span className="cursor-not-allowed text-black/40">Cookies</span></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-16 border-t border-black/5 pt-8 text-center text-sm text-black/50">
        © {new Date().getFullYear()} TaskHub. All rights reserved.
      </div>
    </footer>
  );
}
