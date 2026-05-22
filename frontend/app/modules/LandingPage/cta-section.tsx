import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router";
export default function CTASection() {
  return (
    <section className="pb-24 mt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[40px] bg-blue-600 px-8 py-16 text-white md:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Ready to boost your team productivity?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                Join thousands of teams already using TaskHub.
              </p>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/sign-up">
                  <Button className="h-12 rounded-xl bg-white px-8 text-base text-blue-600 hover:bg-white/90">
                    Start For Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10"
                >
                  Book Demo
                </Button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:block">
              <div className="flex h-[260px] items-center justify-center rounded-3xl border border-white/20 bg-white/10">
                <p className="text-lg font-medium text-white/80">
                  Add Product Screenshot Here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
