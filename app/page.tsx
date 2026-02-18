"use client";

import Script from "next/script";
import AllProfiles from "./Pages/components/AllProfiles";
import FeaturedProfiles from "./Pages/components/FeaturedProfiles";
import Footer from "./Pages/components/Footer";
import Hero from "./Pages/components/Hero";
import Navbar from "./Pages/components/Navbar";
import PopularLocations from "./Pages/components/PopularLocations";
import AlertMarquee from "./Pages/components/WarningScroll";
import GrowingPresenceSection from "./Pages/Seo/section_four";
import PremiumEscortSection from "./Pages/Seo/section_one";
import AllEscortsSection from "./Pages/Seo/section_three";
import WhyChooseDezirexx from "./Pages/Seo/section_two";
import ContactPage from "./profiles/contact/page";

export default function Home() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JWR0RR7V61"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JWR0RR7V61');
        `}
      </Script>
      <Navbar />
      <Hero />
      <AlertMarquee />
      <FeaturedProfiles onSelect={() => null} />
      <AllProfiles onSelect={() => null} />
      <PopularLocations />
      <div className="p-2 sm:p-20 gap-2 sm:gap-20 grid grid-cols-1 sm:grid-cols-2">
        <PremiumEscortSection />
        <WhyChooseDezirexx />
        <AllEscortsSection />
        <GrowingPresenceSection />
      </div>
      <ContactPage />
      <Footer />
    </>
  );
}
