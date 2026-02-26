import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import AudienceSection from "@/components/landing/AudienceSection";
import TrainerSection from "@/components/landing/TrainerSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProofSection from "@/components/landing/ProofSection";
import VideoSection from "@/components/landing/VideoSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import NextDateSection from "@/components/landing/NextDateSection";
import MythSection from "@/components/landing/MythSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import FrameworkSection from "@/components/landing/FrameworkSection";
import ToolsSection from "@/components/landing/ToolsSection";
import WhyDay2Section from "@/components/landing/WhyDay2Section";
import DeliverablesSection from "@/components/landing/DeliverablesSection";
import KillerFeatureSection from "@/components/landing/KillerFeatureSection";
import AgendaSection from "@/components/landing/AgendaSection";
import PrinciplesSection from "@/components/landing/PrinciplesSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import RegistrationModal from "@/components/landing/RegistrationModal";
import PaymentSuccess from "@/components/landing/PaymentSuccess";
import TrackingScripts from "@/components/landing/TrackingScripts";
import AgendaObserver from "@/components/landing/AgendaObserver";
import CookieConsent from "@/components/landing/CookieConsent";
import { trackEvent } from "@/components/landing/TrackingScripts";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get('payment');

  const handleCTA = () => {
    trackEvent("InitiateCheckout");
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black font-mono antialiased text-white overflow-x-hidden">
      <TrackingScripts />
      <Navbar onCTA={handleCTA} />
      <HeroSection onCTA={handleCTA} />
      <ProblemSection />
      <AudienceSection />
      <TrainerSection />
      <SocialProofSection />
      <ProofSection onCTA={handleCTA} />
      <VideoSection />
      <TestimonialsSection onCTA={handleCTA} />
      <NextDateSection onCTA={handleCTA} />
      <MythSection />
      <UseCasesSection />
      <FrameworkSection />
      <ToolsSection onCTA={handleCTA} />
      <WhyDay2Section onCTA={handleCTA} />
      <DeliverablesSection />
      <KillerFeatureSection />
      <AgendaObserver>
        <AgendaSection />
      </AgendaObserver>
      <PrinciplesSection />
      <PricingSection onCTA={handleCTA} />
      <FAQSection />
      <Footer />
      <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      {paymentStatus === 'success' && <PaymentSuccess />}
      <CookieConsent />
    </div>
  );
}
