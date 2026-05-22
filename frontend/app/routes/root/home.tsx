import type { Route } from "../../+types/root";
import FeaturesSection from "@/components/LandingPage/features";
import  HeroSection  from "@/components/LandingPage/hero-section";
import Navbar from "@/components/LandingPage/navbar";
import HowItWorks from "@/components/LandingPage/how-it-works";
import CTASection from "@/components/LandingPage/cta-section";
import Footer from "@/components/LandingPage/footer";
import BenefitsSection from "@/components/LandingPage/benifit-section";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub - Modern Task Management" },
    { name: "description", content: "Welcome to TaskHub, the modern task management platform!" },
  ];
}


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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