import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import LogoMarquee from "./components/logo-marquee";
import FeaturesSection from "./components/features";
import HowItWorks from "./components/how-it-works";
import FAQSection from "./components/faq-section";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black antialiased selection:bg-[#E9357B]/20 selection:text-[#E9357B]">
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <FeaturesSection />
      <HowItWorks />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
