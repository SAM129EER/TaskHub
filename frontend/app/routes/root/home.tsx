import HeroSection from "@/modules/LandingPage/hero-section";
import type { Route } from "./+types/home";
import Navbar from "@/modules/LandingPage/navbar";
import FeaturesSection from "@/modules/LandingPage/features";
import HowItWorks from "@/modules/LandingPage/how-it-works";
import BenefitsSection from "@/modules/LandingPage/benifit-section";
import Footer from "@/modules/LandingPage/footer";
import CTASection from "@/modules/LandingPage/cta-section";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub - Modern Task Management" },
    {
      name: "description",
      content: "Welcome to TaskHub, the modern task management platform!",
    },
  ];
}

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
