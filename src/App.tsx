import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import WorkSection from "./components/WorkSection";
import DesignSection from "./components/DesignSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Handle switching pages and resetting scroll to the top
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const footerLinks = [
    { name: "Home", id: "home" },
    { name: "Work", id: "work" },
    { name: "Design", id: "design" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div id="root-container" className="min-h-screen bg-brand-cream text-brand-navy font-sans antialiased flex flex-col justify-between selection:bg-brand-coral selection:text-brand-cream">
      
      {/* 1. STICKY SMART-HIDE NAVBAR */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 2. MAIN CORE CONTENT VIEWS */}
      <main id="main-content" className="flex-grow">
        {/* Page 1: Home (Hero, Stats, Latest Work Preview) */}
        {activeSection === "home" && (
          <HomeSection onScrollToSection={handleNavigate} />
        )}

        {/* Page 2: Work (Featured, detailed alternating case studies) */}
        {activeSection === "work" && (
          <WorkSection />
        )}

        {/* Page 3: Design Portfolio & Tool Blueprints */}
        {activeSection === "design" && (
          <DesignSection />
        )}

        {/* Page 4: About, Education, Skills Grid, Leadership Timeline */}
        {activeSection === "about" && (
          <AboutSection />
        )}

        {/* Page 5: Contact Form & Details Section */}
        {activeSection === "contact" && (
          <ContactSection />
        )}
      </main>

      {/* 3. MINIMAL CREATIVE FOOTER */}
      <footer id="app-footer" className="w-full bg-brand-navy-dark text-brand-cream py-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Name / Branding */}
          <div className="text-center md:text-left">
            <span className="font-serif font-bold text-lg tracking-tight hover:text-brand-coral transition-colors duration-300">
              Rotem Lubovitch
            </span>
            <p className="font-mono text-[9px] tracking-widest text-brand-sage uppercase mt-1 font-medium">
              Cupertino, CA · 17-Year-Old Marketer
            </p>
          </div>

          {/* Center: Repeated Navigation Links */}
          <div id="footer-navigation" className="flex flex-wrap justify-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <button
                key={link.id}
                id={`footer-link-${link.id}`}
                onClick={() => handleNavigate(link.id)}
                className="font-sans text-xs font-semibold text-brand-cream/70 hover:text-brand-coral transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right: Slogan */}
          <div className="text-center md:text-right font-light">
            <p className="font-serif italic text-xs text-brand-cream/60">
              "Designed with intention. Built with ambition."
            </p>
            <p className="font-mono text-[8px] text-white/20 uppercase tracking-wider mt-1.5 font-bold">
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </div>

        </div>
      </footer>

      {/* 4. AI PORTFOLIO ASSISTANT CHATBOT */}
      <Chatbot />

    </div>
  );
}
