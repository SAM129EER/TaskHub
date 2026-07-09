import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import FeaturesSection from "./components/features";
import HowItWorks from "./components/how-it-works";
import BenefitsSection from "./components/benefit-section";
import CTASection from "./components/cta-section";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
