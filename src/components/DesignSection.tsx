import { PenTool, Layers, Camera, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function DesignSection() {
  const tools = [
    {
      name: "Canva",
      description: "My primary design tool. Used for social posts, carousels, presentations, and brand assets.",
      icon: <Layers className="w-6 h-6 text-brand-coral" />,
    },
    {
      name: "Adobe Illustrator",
      description: "Vector graphics, logo work, and custom design elements.",
      icon: <PenTool className="w-6 h-6 text-brand-sage" />,
    },
    {
      name: "Photography",
      description: "Canon camera and editing skills — I also shoot my own content where possible.",
      icon: <Camera className="w-6 h-6 text-brand-gold" />,
    },
  ];

  const styleTags = [
    "Social Media Design",
    "Carousel Posts",
    "Brand Presentations",
    "Email Design",
    "Video Thumbnails",
    "Infographics",
    "Logo Design",
  ];

  return (
    <section id="design" className="w-full bg-brand-cream py-24 border-t border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* PAGE HEADER */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-brand-coral" />
            <span className="font-mono text-xs tracking-widest uppercase text-brand-sage font-bold">Creative Assets</span>
          </div>
          <h1 id="design-title" className="font-serif font-bold text-5xl md:text-7xl text-brand-navy tracking-tight leading-none mb-6">
            Design
          </h1>
          <p id="design-subtitle" className="font-serif italic text-2xl md:text-3xl text-brand-navy/80 font-light mb-6">
            "The visual side of the work."
          </p>
          <p id="design-intro" className="font-sans text-brand-navy/80 font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Most of my content strategy lives or dies in the design phase. Here's a look at the visual work I've built — from social posts to brand presentations. All design work was created in Canva and Adobe Illustrator.
          </p>
        </div>

        {/* PRIMARY CTA - LARGE CARD */}
        <AnimatedSection id="canva-portfolio-promo" className="mb-20">
          <div className="relative w-full bg-brand-navy text-brand-cream rounded-3xl p-8 md:p-16 overflow-hidden shadow-2xl border border-white/5">
            
            {/* Soft background floating shapes */}
            <div className="absolute top-[-30%] right-[-10%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-brand-coral/25 blur-[60px] md:blur-[100px] pointer-events-none animate-float" />
            <div className="absolute bottom-[-20%] left-[40%] w-[200px] md:w-[350px] h-[200px] md:h-[350px] rounded-full bg-brand-sage/20 blur-[60px] md:blur-[80px] pointer-events-none animate-float-delayed" />
            
            {/* Dot grid decoration */}
            <div className="absolute top-10 left-10 opacity-10 hidden md:block">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="30" cy="10" r="1.5" />
                <circle cx="50" cy="10" r="1.5" />
                <circle cx="70" cy="10" r="1.5" />
                <circle cx="10" cy="30" r="1.5" />
                <circle cx="30" cy="30" r="1.5" />
                <circle cx="50" cy="30" r="1.5" />
                <circle cx="70" cy="30" r="1.5" />
                <circle cx="10" cy="50" r="1.5" />
                <circle cx="30" cy="50" r="1.5" />
                <circle cx="50" cy="50" r="1.5" />
                <circle cx="70" cy="50" r="1.5" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl text-left">
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-brand-sage bg-white/5 border border-white/10 px-3 py-1 rounded-full inline-block mb-6">
                External Link · Interactive Deck
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl text-brand-cream tracking-tight mb-4 leading-tight">
                View Full Canva Portfolio
              </h2>
              <p className="font-sans font-light text-brand-cream/80 text-sm md:text-lg mb-8 leading-relaxed">
                Social posts, carousel designs, brand presentations, and more. Dive deep into the high-retention slides and graphic blueprints I customized.
              </p>
              
              <a
                id="design-canva-btn"
                href="https://www.canva.com/design/DAG-ctiZ7F0/1Km41CS7PE2qEnyPeINXXw/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-coral text-brand-cream font-sans font-semibold rounded-xl hover:bg-brand-coral-hover shadow-lg shadow-brand-coral/20 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                Open Portfolio
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Asymmetric overlapping graphic cards placeholder */}
            <div className="absolute right-12 bottom-[-40px] w-80 h-80 bg-brand-navy-light/40 border border-brand-cream/10 rounded-2xl transform rotate-6 hidden lg:flex items-center justify-center backdrop-blur-sm pointer-events-none">
              <div className="text-center p-6">
                <span className="font-serif text-brand-cream/30 text-8xl block select-none">R</span>
                <span className="font-mono text-[9px] text-brand-cream/40 tracking-widest uppercase">Canva Slide Deck #1</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* DESIGN STYLE TAGS (chip row) */}
        <div id="design-style-chips-wrapper" className="mb-20 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-brand-cream to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-brand-cream to-transparent z-10" />
          <div 
            id="design-style-chips-scroll" 
            className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none snap-x"
            style={{ scrollbarWidth: "none" }}
          >
            {styleTags.map((tag, index) => (
              <span
                key={index}
                className="flex-shrink-0 snap-center px-4 py-2.5 bg-white border border-brand-navy/5 text-brand-navy rounded-full font-mono text-[11px] tracking-wider font-semibold shadow-sm hover:border-brand-coral transition-colors"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>

        {/* TOOLS SECTION */}
        <div id="design-tools-section" className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            <h3 className="font-serif font-bold text-2xl text-brand-navy">Core Creative Toolkit</h3>
          </div>

          <div id="design-tools-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <AnimatedSection
                key={tool.name}
                id={`design-tool-card-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                delay={index * 100}
                className="flex"
              >
                <div className="group w-full bg-white rounded-2xl p-6 md:p-8 border border-brand-navy/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start">
                  <div className="p-4 bg-brand-cream rounded-xl mb-6 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h4 className="font-serif font-bold text-xl text-brand-navy mb-3">
                    {tool.name}
                  </h4>
                  <p className="font-sans font-light text-brand-navy/70 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
