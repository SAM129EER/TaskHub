import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import LogoMarquee from "./components/logo-marquee";
import InteractiveSearch from "./components/interactive-search";
import FeaturesSection from "./components/features";
import AIReachSection from "./components/ai-reach-section";
import FAQSection from "./components/faq-section";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black antialiased selection:bg-[#E9357B]/20 selection:text-[#E9357B]">
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <InteractiveSearch />
      <FeaturesSection />
      <AIReachSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
