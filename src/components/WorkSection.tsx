import { useState, useEffect } from "react";
import { Flower, Sparkles, Gamepad2, Heart, Award, ArrowUpRight, TrendingUp, Users, Phone, ShieldAlert, Target, X, Maximize2, Star, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import roseCartValentinesBouquet from "../assets/images/rose_cart_valentines_bouquet.jpg";
import roseCartPetalCard from "../assets/images/rose_cart_petal_card.jpg";
import roseCartBouquetPurposes from "../assets/images/rose_cart_bouquet_purposes.jpg";
import roseCartValentinesGrid from "../assets/images/rose_cart_valentines_grid.jpg";
import imperfectionistSlide1 from "../assets/images/imperfectionist_slide_1.jpg";
import imperfectionistSlide2 from "../assets/images/imperfectionist_slide_2.jpg";
import imperfectionistSlide3 from "../assets/images/imperfectionist_slide_3.jpg";
import imperfectionistSlide4 from "../assets/images/imperfectionist_slide_4.jpg";
import imperfectionistSlide5 from "../assets/images/imperfectionist_slide_5.jpg";
import allcovePost1 from "../assets/images/allcove_post_1.jpg";
import allcovePost2 from "../assets/images/allcove_post_2.jpg";

const designImages = [
  roseCartValentinesBouquet,
  roseCartPetalCard,
  roseCartBouquetPurposes,
  roseCartValentinesGrid
];

export default function WorkSection() {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"rose-cart" | "imperfectionist" | "wayground" | "allcove" | "campaign" | "graystar">("imperfectionist");
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [activeImperfectionistSlide, setActiveImperfectionistSlide] = useState(0);
  const [activeAllcoveSlide, setActiveAllcoveSlide] = useState(0);

  const tabs = [
    {
      id: "imperfectionist",
      label: "The Imperfectionist",
      role: "Social Media Intern",
      date: "Feb 2026–Present",
      icon: Sparkles,
    },
    {
      id: "rose-cart",
      label: "Rose Cart",
      role: "Digital Marketing Intern",
      date: "Jan–Apr 2026",
      icon: Flower,
    },
    {
      id: "graystar",
      label: "Graystar Design",
      role: "Aesthetic Intern",
      date: "Dec 2024 & Oct 2025",
      icon: Star,
    },
    {
      id: "campaign",
      label: "Political Campaign",
      role: "Political Canvasser",
      date: "Aug–Nov 2024",
      icon: Award,
    },
    {
      id: "wayground",
      label: "Wayground",
      role: "Promotional Intern",
      date: "Jun–Aug 2024",
      icon: Gamepad2,
    },
    {
      id: "allcove",
      label: "FBLA x Allcove",
      role: "Marketing Committee",
      date: "Feb–Mar 2024",
      icon: Heart,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const staticTabsEl = document.getElementById("static-work-tabs");
      if (staticTabsEl) {
        const rect = staticTabsEl.getBoundingClientRect();
        // Show floating bar when the bottom of the static tab bar goes above the viewport
        if (rect.bottom < 0) {
          setShowFloatingBar(true);
        } else {
          setShowFloatingBar(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="work" className="w-full relative">
      
      {/* PAGE HEADER */}
      <div className="w-full bg-brand-cream border-t border-brand-navy/5 py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <AnimatedSection id="work-header" className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-brand-coral" />
            <span className="font-mono text-xs tracking-widest uppercase text-brand-sage font-bold">Case Studies</span>
          </div>
          <h1 id="work-title" className="font-serif font-bold text-5xl md:text-7xl text-brand-navy tracking-tight leading-none mb-6">
            Work
          </h1>
          <p id="work-subtitle" className="font-serif italic text-2xl md:text-3xl text-brand-navy/80 max-w-2xl font-light">
            "Real projects. Real results. Here's how I got there."
          </p>
        </AnimatedSection>
      </div>

      {/* STATIC SUB-TABS SELECTOR */}
      <div id="static-work-tabs" className="w-full bg-brand-cream border-b border-brand-navy/5 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    const el = document.getElementById("work-header");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-brand-navy border-brand-navy text-brand-cream shadow-md"
                      : "bg-white border-brand-navy/10 text-brand-navy hover:border-brand-coral/30 hover:bg-brand-navy/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl transition-colors duration-300 shrink-0 ${
                      isActive ? "bg-brand-coral text-brand-cream" : "bg-brand-navy/5 text-brand-navy"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm tracking-tight">
                        {tab.label}
                      </h4>
                      <p className={`font-sans text-[11px] mt-0.5 leading-tight ${
                        isActive ? "text-brand-cream/80" : "text-brand-navy/60"
                      }`}>
                        {tab.role}
                      </p>
                      <span className="font-mono text-[9px] mt-1.5 block uppercase tracking-wider font-semibold text-brand-sage leading-none">
                        {tab.date}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CASE STUDY 1: ROSE CART FLORIST */}
      {activeTab === "rose-cart" && (
        <div id="case-study-rose-cart" className="w-full bg-white border-y border-brand-navy/5 py-24 px-6 md:px-12 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Stats & Highlights */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
              <AnimatedSection id="rose-cart-stats" className="w-full">
                {/* Stat Callout Card */}
                <div className="bg-brand-navy text-brand-cream p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
                  {/* Decorative blob */}
                  <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-brand-coral/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-brand-coral/20 text-brand-coral rounded-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs tracking-wider uppercase text-brand-sage font-bold">Organic Impact</span>
                  </div>

                  <div className="font-serif font-extrabold text-5xl md:text-6xl text-brand-coral tracking-tight mb-4">
                    +2,317%
                  </div>
                  <h4 className="font-serif text-xl md:text-2xl text-brand-cream mb-2">
                    Organic social media viewership growth
                  </h4>
                  <p className="font-sans text-sm text-brand-cream/70 leading-relaxed">
                    No paid advertising or boosting. Purely driven by visual design overhauls and strategic, localized lifestyle positioning.
                  </p>

                  {/* Micro flower SVG decoration */}
                  <div className="absolute bottom-6 right-6 opacity-10">
                    <Flower className="w-16 h-16" />
                  </div>
                </div>

                {/* Extra micro-highlights */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-brand-cream p-5 rounded-2xl border border-brand-navy/5">
                    <span className="font-mono text-[10px] tracking-wider text-brand-sage font-bold uppercase block mb-1">Duration</span>
                    <p className="font-sans font-semibold text-brand-navy text-sm">Jan - Apr 2026</p>
                  </div>
                  <div className="bg-brand-cream p-5 rounded-2xl border border-brand-navy/5">
                    <span className="font-mono text-[10px] tracking-wider text-brand-sage font-bold uppercase block mb-1">Key Tool</span>
                    <p className="font-sans font-semibold text-brand-navy text-sm">Canva / Short Video</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Case Study Text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <AnimatedSection id="rose-cart-content" className="max-w-3xl">
                {/* Tag Label */}
                <span className="font-mono text-xs tracking-widest uppercase font-bold text-brand-coral block mb-4">
                  FEATURED · Digital Marketing Intern · Jan–Apr 2026
                </span>
                
                {/* Case Study Heading */}
                <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-navy tracking-tight leading-tight mb-8">
                  Growing a flower shop's audience by 2,317% — without spending a dollar on ads.
                </h2>

                <div className="space-y-6 text-brand-navy/90 font-sans text-base leading-relaxed">
                  <div>
                    <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">The Challenge</h3>
                    <p className="font-light">
                      Rose Cart Florist is a small, local flower shop in the Bay Area. When I joined, their social media presence was nearly invisible — posts weren't reaching anyone, and the visual style wasn't speaking to their actual target market. They also wanted to start attracting a younger demographic without losing their existing customer base.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">What I Did</h3>
                    <ul className="space-y-3 pl-4 list-disc marker:text-brand-coral">
                      <li>
                        <strong className="font-medium text-brand-navy">Visual Rebrand:</strong> Redesigned all social media posts using Canva, rebuilding the visual language from scratch to match the shop's target audience — warmer, more lifestyle-driven, and less stock-photo generic.
                      </li>
                      <li>
                        <strong className="font-medium text-brand-navy">Inclusive Copywriting:</strong> Reframed an email advertisement to feel more inclusive and speak to a broader, more diverse demographic without changing the brand's core identity.
                      </li>
                      <li>
                        <strong className="font-medium text-brand-navy">Short-Form Video Production:</strong> Produced short video content specifically to introduce the shop to younger audiences, since that demographic doesn't engage with static posts the same way.
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-brand-navy/5">
                    <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">The Result</h3>
                    <p className="font-light">
                      Social media viewership grew by <span className="font-semibold text-brand-coral">2,317%</span>. This wasn't boosted content — it was purely organic, driven by better design and more intentional targeting.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>

          {/* Design Showcase sub-block */}
          <div id="rose-cart-designs" className="mt-16 pt-16 border-t border-brand-navy/5">
            <AnimatedSection id="rose-cart-designs-gallery" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-brand-coral rounded-full"></span>
                    <h3 className="font-serif font-bold text-2xl text-brand-navy">Canva Portfolio: My Designs</h3>
                  </div>
                  <p className="font-sans text-sm text-brand-navy/60">
                    Actual social media and campaign content designed for Rose Cart during my internship.
                  </p>
                </div>
                <a
                  id="btn-rose-cart-canva"
                  href="https://canva.link/6hcdfqanvxerhrz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-coral text-brand-cream hover:bg-brand-coral-hover font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Open in Canva
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            {/* Grid of designs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Design 1 */}
              <div 
                onClick={() => setSelectedDesign(0)}
                className="group bg-brand-cream border border-brand-navy/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-brand-navy/5 border-b border-brand-navy/5">
                  <img
                    src={roseCartValentinesBouquet}
                    alt="Valentine's Day Bouquet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[1px] z-20">
                    <span className="px-4 py-2 bg-white text-brand-navy font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-coral" />
                      Expand Design
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-brand-navy text-brand-cream font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded z-10">
                    Promo Flyer
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-serif font-bold text-sm text-brand-navy group-hover:text-brand-coral transition-colors">
                    Valentine's Day Bouquet
                  </h4>
                  <p className="font-sans text-xs text-brand-navy/70 mt-1 leading-relaxed font-light">
                    Elegant olive-green serif layout featuring red rose arrangements and premium local positioning.
                  </p>
                </div>
              </div>

              {/* Design 2 */}
              <div 
                onClick={() => setSelectedDesign(1)}
                className="group bg-brand-cream border border-brand-navy/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-brand-navy/5 border-b border-brand-navy/5">
                  <img
                    src={roseCartPetalCard}
                    alt="Rose Bouquet Petal Card"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[1px] z-20">
                    <span className="px-4 py-2 bg-white text-brand-navy font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-coral" />
                      Expand Design
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-brand-navy text-brand-cream font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded z-10">
                    Brand Asset
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-serif font-bold text-sm text-brand-navy group-hover:text-brand-coral transition-colors">
                    Rose Bouquet Petal Card
                  </h4>
                  <p className="font-sans text-xs text-brand-navy/70 mt-1 leading-relaxed font-light">
                    Warm organic visual pairing a close-up petal texture with a minimalist cream card tickets interface.
                  </p>
                </div>
              </div>

              {/* Design 3 */}
              <div 
                onClick={() => setSelectedDesign(2)}
                className="group bg-brand-cream border border-brand-navy/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-brand-navy/5 border-b border-brand-navy/5">
                  <img
                    src={roseCartBouquetPurposes}
                    alt="A Bouquet To... Grid"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[1px] z-20">
                    <span className="px-4 py-2 bg-white text-brand-navy font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-coral" />
                      Expand Design
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-brand-navy text-brand-cream font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded z-10">
                    Infographic
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-serif font-bold text-sm text-brand-navy group-hover:text-brand-coral transition-colors">
                    "A Bouquet To..." Grid
                  </h4>
                  <p className="font-sans text-xs text-brand-navy/70 mt-1 leading-relaxed font-light">
                    High-retention educational infographic presenting distinct occasions and flower arrangements.
                  </p>
                </div>
              </div>

              {/* Design 4 */}
              <div 
                onClick={() => setSelectedDesign(3)}
                className="group bg-brand-cream border border-brand-navy/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-brand-navy/5 border-b border-brand-navy/5">
                  <img
                    src={roseCartValentinesGrid}
                    alt="Valentine's Day Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[1px] z-20">
                    <span className="px-4 py-2 bg-white text-brand-navy font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-coral" />
                      Expand Design
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-brand-navy text-brand-cream font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded z-10">
                    Catalog Grid
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-serif font-bold text-sm text-brand-navy group-hover:text-brand-coral transition-colors">
                    Valentine's Day Collection
                  </h4>
                  <p className="font-sans text-xs text-brand-navy/70 mt-1 leading-relaxed font-light">
                    Nostalgic textured product catalog styled with red dashed borders and hand-drawn outline hearts.
                  </p>
                </div>
              </div>
            </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
      )}

      {/* CASE STUDY 2: THE IMPERFECTIONIST */}
      {activeTab === "imperfectionist" && (
        <div id="case-study-imperfectionist" className="w-full bg-brand-navy text-brand-cream py-24 px-6 md:px-12 relative overflow-hidden animate-fade-in">
        {/* Decorative subtle ambient blob */}
        <div className="absolute top-[40%] left-[80%] w-[400px] h-[400px] bg-brand-sage/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Case Study Text */}
          <div className="lg:col-span-7">
            <AnimatedSection id="imperfectionist-content" className="max-w-3xl">
              {/* Tag Label */}
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-brand-sage block mb-4">
                Social Media Intern · Feb 2026 – Present
              </span>
              
              {/* Case Study Heading */}
              <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-cream tracking-tight leading-tight mb-8">
                Making eco-friendly cosmetics impossible to scroll past.
              </h2>

              <div className="space-y-6 text-brand-cream/85 font-sans text-base leading-relaxed">
                <div>
                  <h3 className="font-serif font-semibold text-xl text-brand-cream mb-2">Context</h3>
                  <p className="font-light">
                    The Imperfectionist is a cosmetics startup with a sustainability-first mission — their products are designed to be eco-friendly and refillable. My job is to make that story feel compelling and visual on social media, where beauty content is incredibly saturated.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif font-semibold text-xl text-brand-cream mb-2">What I Do</h3>
                  <ul className="space-y-3 pl-4 list-disc marker:text-brand-sage">
                    <li>
                      <strong className="font-medium text-brand-cream">Relatable Videos:</strong> Brainstorm and develop short-form video content ideas that show the product in real, relatable contexts — not just flat lays.
                    </li>
                    <li>
                      <strong className="font-medium text-brand-cream">Storytelling Carousels:</strong> Design carousel posts that walk the viewer through how the product works and why the eco-angle matters, without it feeling like a lecture.
                    </li>
                    <li>
                      <strong className="font-medium text-brand-cream">Conversion Optimization:</strong> Each carousel is built to educate and convert — the first slide stops the scroll, the middle slides build trust, and the last slide drives action.
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-brand-cream/10">
                  <h3 className="font-serif font-semibold text-xl text-brand-cream mb-2">The Challenge</h3>
                  <p className="font-light">
                    Eco-messaging can feel preachy if you're not careful. The goal is always to make sustainability feel like a bonus, not a burden — <span className="text-brand-gold italic">desirable, not obligatory</span>.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Interactive Instagram/Carousel Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatedSection id="imperfectionist-visuals" className="w-full max-w-md">
              <div className="bg-brand-navy-light border border-brand-cream/10 rounded-3xl p-5 shadow-2xl relative flex flex-col">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-coral animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-brand-sage uppercase font-bold">
                      Carousel Simulator
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-brand-cream/40 uppercase">
                    Slide {activeImperfectionistSlide + 1} of 5
                  </span>
                </div>

                {/* Slides Array definition inside the component render for modularity */}
                {(() => {
                  const slides = [
                    {
                      id: 1,
                      type: "Scroll Stopper",
                      image: imperfectionistSlide1,
                      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/20",
                      description: "Scroll stopper: Bold hook designed to capture attention immediately in crowded feeds.",
                    },
                    {
                      id: 2,
                      type: "Value Proposition",
                      image: imperfectionistSlide2,
                      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
                      description: "The core value proposition: Educating the consumer on both ecological and monetary savings.",
                    },
                    {
                      id: 3,
                      type: "Brand Identity",
                      image: imperfectionistSlide3,
                      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
                      description: "Aesthetic connection: Presenting product transparency and sustainable manufacturing design.",
                    },
                    {
                      id: 4,
                      type: "Education",
                      image: imperfectionistSlide4,
                      badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/20",
                      description: "How it works: A step-by-step interactive walkthrough detailing the simple refill process.",
                    },
                    {
                      id: 5,
                      type: "Call to Action",
                      image: imperfectionistSlide5,
                      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
                      description: "High-conversion prompt: Clear visual nudge with the active first-purchase discount code.",
                    }
                  ];

                  const currentSlide = slides[activeImperfectionistSlide];

                  return (
                    <div className="flex flex-col gap-4">
                      {/* Simulated Post Screen */}
                      <div className="bg-brand-navy border border-brand-cream/5 rounded-2xl overflow-hidden shadow-inner flex flex-col aspect-square relative select-none">
                        
                        {/* Simulated Post Header */}
                        <div className="p-3 bg-brand-navy-light/40 border-b border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-brand-sage flex items-center justify-center font-serif text-[10px] text-brand-navy font-black">
                              I
                            </div>
                            <div>
                              <p className="font-sans text-[10px] font-bold text-brand-cream leading-tight">theimperfectionist</p>
                              <p className="font-mono text-[8px] text-brand-sage uppercase tracking-wider font-semibold">Cupertino, CA</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full border text-[8px] font-semibold tracking-wider uppercase font-mono bg-brand-cream/5 text-brand-cream/60">
                            Instagram Post
                          </span>
                        </div>

                        {/* Interactive Slide Graphic Card Displaying Real Image */}
                        <div className="flex-grow bg-brand-navy-dark relative overflow-hidden flex items-center justify-center">
                          {currentSlide.image ? (
                            <img
                              src={currentSlide.image}
                              alt={`The Imperfectionist Slide ${currentSlide.id}`}
                              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="text-center p-6 text-brand-cream/40 font-sans text-xs">
                              Slide image not loaded
                            </div>
                          )}

                          {/* Top Left Indicator Tag */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold tracking-wider uppercase font-mono ${currentSlide.badgeColor}`}>
                              {currentSlide.type}
                            </span>
                          </div>

                          {/* Slide Count Indicator Tag */}
                          <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-bold text-white">
                            {currentSlide.id}/5
                          </div>
                        </div>
                      </div>

                      {/* Explanation details of the active slide */}
                      <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold text-brand-sage block mb-1">
                          Strategy Spotlight
                        </span>
                        <p className="font-sans text-xs text-brand-cream/90 leading-normal">
                          {currentSlide.description}
                        </p>
                      </div>

                      {/* Carousel Controls */}
                      <div className="flex items-center justify-between mt-1">
                        <button
                          onClick={() => setActiveImperfectionistSlide((prev) => (prev - 1 + 5) % 5)}
                          className="flex items-center gap-1 text-xs font-mono text-brand-cream/60 hover:text-brand-cream transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 border border-white/10 cursor-pointer"
                          aria-label="Previous Slide"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Prev</span>
                        </button>

                        {/* Interactive Dots */}
                        <div className="flex items-center gap-2">
                          {[0, 1, 2, 3, 4].map((idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImperfectionistSlide(idx)}
                              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                activeImperfectionistSlide === idx
                                  ? "w-6 bg-brand-coral"
                                  : "w-2.5 bg-brand-cream/20 hover:bg-brand-cream/40"
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setActiveImperfectionistSlide((prev) => (prev + 1) % 5)}
                          className="flex items-center gap-1 text-xs font-mono text-brand-cream/60 hover:text-brand-cream transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 border border-white/10 cursor-pointer"
                          aria-label="Next Slide"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
      )}

      {/* CASE STUDY: GRAYSTAR DESIGN */}
      {activeTab === "graystar" && (
        <div id="case-study-graystar" className="w-full bg-white border-y border-brand-navy/5 py-24 px-6 md:px-12 animate-fade-in">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Story */}
            <div className="lg:col-span-7">
              <AnimatedSection id="graystar-content" className="max-w-3xl">
                <span className="font-mono text-xs tracking-widest uppercase font-bold text-brand-sage block mb-4">
                  Graystar Design · Dec 2024 & Oct 2025
                </span>
                
                <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-navy tracking-tight leading-tight mb-8">
                  Creating unforgettable brand experiences from pop-ups to scale events.
                </h2>

                <div className="space-y-8 text-brand-navy/85 font-sans text-base leading-relaxed">
                  <div>
                    <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">The Context</h3>
                    <p className="font-light">
                      Graystar Design is known for its exquisite aesthetic curation and premium brand events. Across two separate internships, I worked behind the scenes to bridge physical space with creative branding, learning first-hand how touchpoints, presentation, and seamless team operations build real customer affinity.
                    </p>
                  </div>

                  {/* Dual Roles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Role 1 */}
                    <div className="bg-brand-cream/40 border border-brand-navy/5 p-6 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-coral/5 rounded-full blur-xl pointer-events-none" />
                      <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-brand-coral block mb-2">
                        Oct 2025
                      </span>
                      <h4 className="font-serif font-bold text-lg text-brand-navy mb-3">
                        Event Planner Intern
                      </h4>
                      <ul className="space-y-2.5 text-sm font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-brand-coral font-bold mt-0.5">•</span>
                          <span>Assisted with the execution of a launch party with over 300+ attendees to raise core brand awareness.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand-coral font-bold mt-0.5">•</span>
                          <span>Coordinated physical event setup, decorating 30 curated tables and organizing assorted presentation platters.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Role 2 */}
                    <div className="bg-brand-cream/40 border border-brand-navy/5 p-6 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-sage/5 rounded-full blur-xl pointer-events-none" />
                      <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-brand-sage block mb-2">
                        Dec 2024
                      </span>
                      <h4 className="font-serif font-bold text-lg text-brand-navy mb-3">
                        Pop-Up Shop Intern
                      </h4>
                      <ul className="space-y-2.5 text-sm font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-brand-sage font-bold mt-0.5">•</span>
                          <span>Collaborated with a team of 6 members to design and maintain an inviting, high-converting retail environment.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand-sage font-bold mt-0.5">•</span>
                          <span>Assisted walk-in customers with tailored product selection, answering questions with detailed catalog insights.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-navy/5">
                    <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">Strategic Takeaway</h3>
                    <p className="font-light italic text-brand-navy/80">
                      "Whether it is curating custom tablescapes or consulting pop-up retail shoppers, physical branding is an art of high-impact visual touchpoints. When spatial design matches a brand's narrative, engagement flows effortlessly."
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <AnimatedSection id="graystar-visuals" className="w-full max-w-md">
                <div className="bg-brand-navy text-brand-cream border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <span className="font-mono text-[9px] tracking-widest text-brand-sage uppercase block mb-4 font-semibold">
                    Experiential Blueprint & Flow
                  </span>

                  {/* Aesthetic Visual representations */}
                  <div className="space-y-4">
                    {/* Layout Design Checklist */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <h4 className="font-mono text-xs font-bold text-brand-coral uppercase mb-2">
                        01 / Event Layout Design (300+ Guests)
                      </h4>
                      <div className="space-y-2 text-xs font-sans text-brand-cream/80 font-light">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
                          <span>30 Custom Curated Table arrangements</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
                          <span>Assorted presentation platters placement</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
                          <span>High-traffic flow optimization</span>
                        </div>
                      </div>
                    </div>

                    {/* Pop-up Customer Consult Flow */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <h4 className="font-mono text-xs font-bold text-brand-sage uppercase mb-2">
                        02 / Pop-Up Customer Conversion
                      </h4>
                      <div className="space-y-2 text-xs font-sans text-brand-cream/80 font-light">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-sage" />
                          <span>Greeting & spatial onboarding</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-sage" />
                          <span>Aesthetic material & catalog storytelling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-sage" />
                          <span>Frictionless product selection consulting</span>
                        </div>
                      </div>
                    </div>

                    {/* Brand Affinity Stats */}
                    <div className="pt-2 flex justify-between items-center text-center">
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex-1 mr-2">
                        <span className="font-serif text-xl font-bold text-brand-gold">300+</span>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-brand-cream/60">Attendees</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex-1 ml-2">
                        <span className="font-serif text-xl font-bold text-brand-sage">6-Person</span>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-brand-cream/60">Core Team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      )}

      {/* CASE STUDY 3: WAYGROUND */}
      {activeTab === "wayground" && (
        <div id="case-study-wayground" className="w-full bg-brand-cream py-24 px-6 md:px-12 relative animate-fade-in">
        {/* Background grid accent */}
        <div className="absolute top-12 left-10 opacity-5 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-brand-navy">
            <rect width="10" height="10" x="0" y="0" />
            <rect width="10" height="10" x="30" y="0" />
            <rect width="10" height="10" x="60" y="0" />
            <rect width="10" height="10" x="0" y="30" />
            <rect width="10" height="10" x="60" y="30" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection id="wayground-content" className="w-full">
            {/* Tag Label */}
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-brand-sage block mb-4">
              Promotional Intern · Jun–Aug 2024
            </span>
            
            {/* Case Study Heading */}
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-navy tracking-tight leading-tight mb-8 max-w-4xl mx-auto">
              Building a brand strategy for a gamified learning platform — from research to presentation.
            </h2>

            <div className="bg-white border border-brand-navy/5 shadow-xl rounded-3xl p-8 md:p-12 text-left space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Gamepad2 className="w-5 h-5 text-brand-coral" />
                    <h3 className="font-serif font-semibold text-xl text-brand-navy">Context</h3>
                  </div>
                  <p className="font-sans text-brand-navy/80 font-light leading-relaxed text-sm md:text-base">
                    Wayground is a startup that makes learning feel like a game for students. When I joined as a promotional intern, they needed help understanding where they sat in the market and how to position themselves to stand out. I worked cross-functionally with teams based primarily in India.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-brand-sage" />
                    <h3 className="font-serif font-semibold text-xl text-brand-navy">What I Did</h3>
                  </div>
                  <p className="font-sans text-brand-navy/80 font-light leading-relaxed text-sm md:text-base">
                    Conducted market research into successful EdTech and youth-focused campaigns to identify what was working and where the gaps were. I then developed a strategic plan for how Wayground could strengthen its brand positioning and expand its market reach. Finally, I built and presented the full strategy as a Canva presentation deck to key stakeholders.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-navy/5 bg-brand-cream/40 -mx-8 -mb-8 p-8 rounded-b-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="p-3 bg-brand-sage-light text-brand-sage rounded-2xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm text-brand-navy">Global Team</h4>
                    <p className="text-xs font-mono text-brand-navy/60 uppercase">Remote Internship</p>
                  </div>
                </div>
                
                <div className="md:col-span-8">
                  <h4 className="font-serif font-semibold text-brand-navy mb-1 text-sm md:text-base">What I Learned</h4>
                  <p className="font-sans text-brand-navy/80 font-light text-sm">
                    This was my first experience working in a fully remote, international team. I learned to communicate clearly across time zones and adjust my presentation style for different stakeholders and audiences.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      )}

      {/* CASE STUDY 4: FBLA x ALLCOVE */}
      {activeTab === "allcove" && (
        <div id="case-study-allcove" className="w-full bg-brand-sage-light/30 border-y border-brand-navy/5 py-24 px-6 md:px-12 animate-fade-in">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual representation of Mental Health Posts */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatedSection id="allcove-visuals" className="w-full max-w-md">
              <div className="bg-white border border-brand-navy/5 shadow-xl rounded-3xl p-5 relative flex flex-col">
                <div className="flex items-center justify-between mb-3 border-b border-brand-navy/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-coral animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-brand-sage uppercase font-bold">
                      Allcove Campaign Posts
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-brand-navy/40 uppercase">
                    Slide {activeAllcoveSlide + 1} of 2
                  </span>
                </div>

                {(() => {
                  const slides = [
                    {
                      id: 1,
                      type: "Post 1",
                      image: allcovePost1,
                      badgeColor: "bg-brand-sage/10 text-brand-sage border-brand-sage/20",
                      description: "Approach-centered post highlighting youth support, belonging, and low-barrier mental health access.",
                    },
                    {
                      id: 2,
                      type: "Post 2",
                      image: allcovePost2,
                      badgeColor: "bg-brand-coral/10 text-brand-coral border-brand-coral/20",
                      description: "Informative high-aesthetic graphics detailing peer services, high school reach-out tips, and zero-judgment care.",
                    }
                  ];

                  const currentSlide = slides[activeAllcoveSlide];

                  return (
                    <div className="flex flex-col gap-4">
                      {/* Simulated Post Screen */}
                      <div className="bg-brand-navy border border-brand-cream/5 rounded-2xl overflow-hidden shadow-inner flex flex-col aspect-square relative select-none">
                        
                        {/* Simulated Post Header */}
                        <div className="p-3 bg-brand-navy-light/40 border-b border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-brand-sage flex items-center justify-center font-serif text-[10px] text-brand-navy font-black">
                              A
                            </div>
                            <div>
                              <p className="font-sans text-[10px] font-bold text-brand-cream leading-tight">allcove.cupertino</p>
                              <p className="font-mono text-[8px] text-brand-sage uppercase tracking-wider font-semibold">Homestead High FBLA</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full border text-[8px] font-semibold tracking-wider uppercase font-mono bg-brand-cream/5 text-brand-cream/60">
                            Instagram Post
                          </span>
                        </div>

                        {/* Interactive Slide Graphic Card Displaying Real Image */}
                        <div className="flex-grow bg-brand-navy-dark relative overflow-hidden flex items-center justify-center">
                          {currentSlide.image ? (
                            <img
                              src={currentSlide.image}
                              alt={`Allcove Campaign Slide ${currentSlide.id}`}
                              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="text-center p-6 text-brand-cream/40 font-sans text-xs">
                              Slide image not loaded
                            </div>
                          )}

                          {/* Top Left Indicator Tag */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold tracking-wider uppercase font-mono ${currentSlide.badgeColor}`}>
                              {currentSlide.type}
                            </span>
                          </div>

                          {/* Slide Count Indicator Tag */}
                          <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-bold text-white">
                            {currentSlide.id}/2
                          </div>
                        </div>
                      </div>

                      {/* Explanation details of the active slide */}
                      <div className="bg-brand-navy/5 border border-brand-navy/5 p-3 rounded-xl">
                        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold text-brand-sage block mb-1">
                          Campaign Design Focus
                        </span>
                        <p className="font-sans text-xs text-brand-navy/90 leading-normal">
                          {currentSlide.description}
                        </p>
                      </div>

                      {/* Carousel Controls */}
                      <div className="flex items-center justify-between mt-1">
                        <button
                          onClick={() => setActiveAllcoveSlide((prev) => (prev - 1 + 2) % 2)}
                          className="flex items-center gap-1 text-xs font-mono text-brand-navy/60 hover:text-brand-navy transition-colors py-1.5 px-3 rounded-lg hover:bg-brand-navy/5 border border-brand-navy/10 cursor-pointer"
                          aria-label="Previous Slide"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Prev</span>
                        </button>

                        {/* Interactive Dots */}
                        <div className="flex items-center gap-2">
                          {[0, 1].map((idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveAllcoveSlide(idx)}
                              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                activeAllcoveSlide === idx
                                  ? "w-6 bg-brand-coral"
                                  : "w-2.5 bg-brand-navy/20 hover:bg-brand-navy/40"
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setActiveAllcoveSlide((prev) => (prev + 1) % 2)}
                          className="flex items-center gap-1 text-xs font-mono text-brand-navy/60 hover:text-brand-navy transition-colors py-1.5 px-3 rounded-lg hover:bg-brand-navy/5 border border-brand-navy/10 cursor-pointer"
                          aria-label="Next Slide"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Case Study Text */}
          <div className="lg:col-span-7">
            <AnimatedSection id="allcove-content" className="max-w-3xl">
              {/* Tag Label */}
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-brand-coral block mb-4">
                Marketing Committee Member · Feb–Mar 2024
              </span>
              
              {/* Case Study Heading */}
              <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-navy tracking-tight leading-tight mb-8">
                Two Instagram posts for a mental health nonprofit — designed to actually reach teens.
              </h2>

              <div className="space-y-6 text-brand-navy/90 font-sans text-base leading-relaxed">
                <div>
                  <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">Context</h3>
                  <p className="font-light">
                    As a member of the FBLA Marketing Committee at Homestead High School, I was assigned to create social media content for Allcove, a real mental health service center that supports teens. This was a real client with real brand guidelines — not a class project.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">What I Did</h3>
                  <ul className="space-y-3 pl-4 list-disc marker:text-brand-coral">
                    <li>
                      <strong className="font-medium text-brand-navy">High-Aesthetic Designs:</strong> Designed 2 Instagram posts in Canva targeting a teen demographic, making mental health resources feel approachable rather than clinical or preachy.
                    </li>
                    <li>
                      <strong className="font-medium text-brand-navy">Client Relations:</strong> Communicated directly with the Allcove team to understand their voice, get approval on content, and stay within their strict brand guidelines.
                    </li>
                    <li>
                      <strong className="font-medium text-brand-navy">Balanced Messaging:</strong> Balanced the need to be engaging and visually interesting with the sensitivity the subject matter requires.
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-brand-navy/5">
                  <h3 className="font-serif font-semibold text-xl text-brand-navy mb-2">Why It Matters</h3>
                  <p className="font-light">
                    Marketing for a mental health organization to a teen audience means every design choice has weight. I'm proud of how this work balanced <span className="font-semibold text-brand-sage">creativity with care</span>.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
      )}

      {/* CASE STUDY 5: PATRICK AHRENS CAMPAIGN */}
      {activeTab === "campaign" && (
        <div id="case-study-campaign" className="w-full bg-brand-navy text-brand-cream py-24 px-6 md:px-12 relative animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection id="campaign-content" className="w-full">
            <div className="text-center mb-12">
              {/* Tag Label */}
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-brand-sage block mb-4">
                Political Canvasser · Aug–Nov 2024
              </span>
              
              {/* Case Study Heading */}
              <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-cream tracking-tight leading-tight mb-4">
                Door-to-door and phone banking for a California State Assembly campaign.
              </h2>
              <p className="font-sans font-light text-brand-cream/80 max-w-2xl mx-auto text-sm md:text-base">
                I canvassed for Patrick Ahrens' California State Assembly campaign, engaging directly with voters through door-to-door outreach and phone banking. This taught me real-world persuasion, audience reading, and data tracking under pressure.
              </p>
            </div>

            {/* Compact Metric Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-brand-navy-light border border-brand-cream/10 p-8 rounded-2xl flex flex-col items-center text-center hover:border-brand-coral/30 transition-colors">
                <div className="p-4 bg-brand-coral/15 text-brand-coral rounded-full mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-3xl mb-1">250+</h4>
                <p className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-3">Community engagement</p>
                <p className="font-sans text-xs text-brand-cream/70 font-light">
                  Engaged 250+ community members through direct door-to-door neighborhood outreach.
                </p>
              </div>

              <div className="bg-brand-navy-light border border-brand-cream/10 p-8 rounded-2xl flex flex-col items-center text-center hover:border-brand-coral/30 transition-colors">
                <div className="p-4 bg-brand-sage-light/20 text-brand-sage rounded-full mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-3xl mb-1">100+</h4>
                <p className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-3">Phone Conversations</p>
                <p className="font-sans text-xs text-brand-cream/70 font-light">
                  Conducted 100+ phone banking conversations explaining ballot options and campaign key goals.
                </p>
              </div>

              <div className="bg-brand-navy-light border border-brand-cream/10 p-8 rounded-2xl flex flex-col items-center text-center hover:border-brand-coral/30 transition-colors">
                <div className="p-4 bg-brand-gold/15 text-brand-gold rounded-full mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-3xl mb-1">PDI</h4>
                <p className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-3">Software Proficiency</p>
                <p className="font-sans text-xs text-brand-cream/70 font-light">
                  Used professional PDI (Campaign Data Software) to track door lists, results, and canvassing progress.
                </p>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </div>
      )}

      {/* HIGH-FIDELITY ZOOM LIGHTBOX MODAL */}
      {selectedDesign !== null && (
        <div id="design-lightbox-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-md animate-fade-in">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedDesign(null)} 
          />
          
          <div className="bg-brand-cream border border-brand-navy/10 rounded-3xl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] shadow-2xl relative overflow-hidden z-10 flex flex-col md:flex-row animate-scale-up">
            {/* Close Button */}
            <button
              id="close-lightbox"
              onClick={() => setSelectedDesign(null)}
              className="absolute top-4 right-4 p-2 bg-brand-navy/80 hover:bg-brand-coral text-brand-cream rounded-full transition-colors duration-300 z-30 cursor-pointer shadow-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Design Live Container */}
            <div className="w-full md:w-1/2 p-6 bg-brand-navy/5 flex items-center justify-center border-r border-brand-navy/5 select-none relative min-h-[350px] md:min-h-0">
              <div className="w-full max-w-[280px] md:max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 bg-white relative">
                <img
                  src={designImages[selectedDesign]}
                  alt={designDetails[selectedDesign].title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right: Design Metadata details */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs tracking-widest uppercase text-brand-sage font-bold block mb-1">
                    {designDetails[selectedDesign].type}
                  </span>
                  <h3 className="font-serif font-bold text-3xl text-brand-navy leading-tight">
                    {designDetails[selectedDesign].title}
                  </h3>
                </div>

                <div className="space-y-4 text-brand-navy/85">
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase font-bold text-brand-navy/40 mb-1">Design Overview</h4>
                    <p className="font-sans text-sm font-light leading-relaxed">
                      {designDetails[selectedDesign].description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase font-bold text-brand-navy/40 mb-1">Typography Strategy</h4>
                    <p className="font-mono text-xs font-semibold text-brand-navy">
                      {designDetails[selectedDesign].fontPairing}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase font-bold text-brand-navy/40 mb-1.5">Brand Color Palette</h4>
                    <div className="flex flex-wrap gap-2">
                      {designDetails[selectedDesign].colorPalette.map((color, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-brand-navy/5 border border-brand-navy/10 rounded-full font-mono text-[10px] text-brand-navy/80 font-medium"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 border-t border-brand-navy/5 flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href={designDetails[selectedDesign].canvaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-brand-coral hover:bg-brand-coral-hover text-brand-cream font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow hover:shadow-lg text-center flex items-center justify-center gap-2"
                >
                  Open in Canva
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="px-6 py-3 bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FLOATING MINIMIZED DOCK FOR SCROLLING */}
      {showFloatingBar && (
        <div 
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-brand-navy/95 border border-white/10 px-2.5 py-1.5 rounded-full shadow-2xl flex items-center gap-1 max-w-[95vw] md:max-w-full overflow-x-auto scrollbar-none animate-scale-up"
          style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  const el = document.getElementById("work-header");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-brand-coral text-white font-medium"
                    : "text-brand-cream/65 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="font-medium tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

    </section>
  );
}

// ==========================================
// CANVA DESIGN PORTFOLIO METADATA
// ==========================================
const designDetails = [
  {
    title: "Valentine's Day Bouquet Flyer",
    type: "Promo Flyer",
    description: "An elegant, olive-green layout designed to highlight Rose Cart's red rose bouquet offerings. It pairs sophisticated, high-contrast serif typography with organic spacing to appeal to premium Cupertino audiences.",
    canvaUrl: "https://canva.link/6hcdfqanvxerhrz",
    fontPairing: "Modern Serif & Clean Sans-Serif",
    colorPalette: ["#FAF9F5 (Cream)", "#556B2F (Olive Green)", "#4A5D2F (Forest Green)"]
  },
  {
    title: "Rose Bouquet Petal Card",
    type: "Brand Asset",
    description: "A signature brand card design featuring an immersive, high-resolution organic red rose petal background overlaid with a warm cream-colored ticket interface. Designed to emphasize the brand's 'love grows' tagline.",
    canvaUrl: "https://canva.link/6hcdfqanvxerhrz",
    fontPairing: "Classic Calligraphy Script & Clean Sans",
    colorPalette: ["#2C050B (Deep Wine)", "#FAF6EE (Warm Sand)", "#5C1A1E (Rich Burgundy)"]
  },
  {
    title: "A Bouquet To... Grid",
    type: "Infographic",
    description: "A high-retention social media infographic displaying specific flowers matched to occasions. Crafted to drive audience engagement and education in a neat, symmetrical visual table structure.",
    canvaUrl: "https://canva.link/6hcdfqanvxerhrz",
    fontPairing: "Elegant Editorial Serif & Minimal Italic",
    colorPalette: ["#FAF5F5 (Blush Sand)", "#FFFFFF (Pure White)", "#5C1A1E (Crimson Navy)"]
  },
  {
    title: "Valentine's Day Collection Catalog",
    type: "Catalog Grid",
    description: "A gorgeous boutique-style product catalog using a warm paper layout. Framed in nostalgic, red dashed borders with minimal floating hearts to create an inviting, handmade local neighborhood brand feel.",
    canvaUrl: "https://canva.link/6hcdfqanvxerhrz",
    fontPairing: "Chunky Display Serif & Modern Sans-Serif",
    colorPalette: ["#FAF7F2 (Parchment)", "#FFFFFF (Card White)", "#B91C1C (Rose Red)"]
  }
];


