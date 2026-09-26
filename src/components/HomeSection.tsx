import { ArrowRight, ArrowUpRight, TrendingUp, Sparkles, Compass, Target, Palette } from "lucide-react";
import Counter from "./Counter";
import AnimatedSection from "./AnimatedSection";

interface HomeSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function HomeSection({ onScrollToSection }: HomeSectionProps) {
  const latestProjects = [
    {
      id: "imperfectionist",
      initial: "I",
      colorClass: "bg-brand-coral text-brand-cream",
      company: "The Imperfectionist",
      role: "Social Media Intern",
      tagline: "Eco-friendly storytelling through carousels and short-form content.",
      icon: <Sparkles className="w-5 h-5" />,
      isExternal: false,
    },
    {
      id: "rose-cart",
      initial: "R",
      colorClass: "bg-brand-navy text-brand-cream",
      company: "Rose Cart Florist",
      role: "Digital Marketing Intern",
      tagline: "2,317% viewership increase. No paid ads.",
      icon: <TrendingUp className="w-5 h-5" />,
      isExternal: false,
    },
    {
      id: "wayground",
      initial: "W",
      colorClass: "bg-brand-sage text-brand-cream",
      company: "Wayground",
      role: "Promotional Intern",
      tagline: "Brand positioning strategy for a global EdTech startup.",
      icon: <Compass className="w-5 h-5" />,
      isExternal: false,
    },
    {
      id: "canva-portfolio-card",
      initial: "C",
      colorClass: "bg-brand-gold text-brand-navy",
      company: "Canva Design Portfolio",
      role: "Graphic Design Deck",
      tagline: "Explore my full aesthetic content decks, brand kits, and active social templates.",
      icon: <Palette className="w-5 h-5" />,
      isExternal: true,
      url: "https://www.canva.com/design/DAG-ctiZ7F0/1Km41CS7PE2qEnyPeINXXw/edit",
    },
  ];

  return (
    <section id="home" className="relative w-full overflow-hidden pt-20">
      {/* 1. HERO SECTION */}
      <div className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto noise-bg">
        
        {/* Ambient Gradient Blur Blobs */}
        {/* Soft coral blob top right */}
        <div className="absolute top-10 right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-brand-coral/15 blur-[80px] md:blur-[120px] pointer-events-none animate-float" />
        {/* Soft navy blob bottom left */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-brand-navy/10 blur-[80px] md:blur-[150px] pointer-events-none animate-float-delayed" />

        {/* Small geometric accent shapes */}
        <div className="absolute top-[15%] left-[5%] w-3 h-3 rounded-full bg-brand-sage opacity-60 animate-float" />
        <div className="absolute bottom-[20%] right-[8%] w-4 h-4 rounded-sm bg-brand-gold rotate-45 opacity-60 animate-float-delayed" />
        
        {/* Floating Dot Grid Graphic */}
        <div className="absolute top-[20%] right-[15%] opacity-30 hidden lg:block">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor" className="text-brand-navy">
            <circle cx="10" cy="10" r="2" />
            <circle cx="30" cy="10" r="2" />
            <circle cx="50" cy="10" r="2" />
            <circle cx="70" cy="10" r="2" />
            <circle cx="10" cy="30" r="2" />
            <circle cx="30" cy="30" r="2" />
            <circle cx="50" cy="30" r="2" />
            <circle cx="70" cy="30" r="2" />
            <circle cx="10" cy="50" r="2" />
            <circle cx="30" cy="50" r="2" />
            <circle cx="50" cy="50" r="2" />
            <circle cx="70" cy="50" r="2" />
            <circle cx="10" cy="70" r="2" />
            <circle cx="30" cy="70" r="2" />
            <circle cx="50" cy="70" r="2" />
            <circle cx="70" cy="70" r="2" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl text-left md:ml-6">
          {/* Accent Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy/5 rounded-full mb-6 border border-brand-navy/10">
            <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-brand-navy/80">
              Rotem Lubovitch · Portfolio
            </span>
          </div>

          {/* Heading with Squiggly Underline SVG */}
          <h1 id="hero-title" className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-brand-navy leading-[1.08] mb-6">
            Marketing that<br />
            <span className="relative inline-block text-brand-coral">
              moves
              {/* Hand-drawn style squiggly underline SVG */}
              <svg 
                viewBox="0 0 100 20" 
                className="absolute left-0 bottom-[-4px] md:bottom-[-8px] w-full h-3 md:h-4 text-brand-gold pointer-events-none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M 2,13 C 25,2 35,22 55,10 C 72,1 85,18 98,11" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </span>{" "}
            people.
          </h1>

          {/* Subheading */}
          <p id="hero-subheading" className="font-mono text-xs md:text-sm tracking-wider uppercase text-brand-sage font-bold mb-6">
            Social media · Content strategy · Graphic design · Brand storytelling
          </p>

          {/* Bio sentence */}
          <p id="hero-bio" className="font-sans text-lg md:text-2xl text-brand-navy/90 font-light max-w-2xl leading-relaxed mb-10">
            I'm Rotem — a 17-year-old marketing intern turning small businesses into scroll-stoppers.
          </p>

          {/* Actions */}
          <div id="hero-cta-group" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="cta-see-work"
              onClick={() => onScrollToSection("work")}
              className="px-8 py-4 bg-brand-coral text-brand-cream font-sans font-semibold rounded-xl hover:bg-brand-coral-hover shadow-lg shadow-brand-coral/15 hover:shadow-xl transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-2 group"
            >
              See My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              id="cta-canva-portfolio"
              href="https://www.canva.com/design/DAG-ctiZ7F0/1Km41CS7PE2qEnyPeINXXw/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent text-brand-navy border-2 border-brand-navy font-sans font-semibold rounded-xl hover:bg-brand-navy hover:text-brand-cream transition-all duration-300 text-center flex items-center justify-center gap-2 group"
            >
              View Design Portfolio
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. STATS STRIP */}
      <div id="stats-strip" className="relative w-full bg-brand-navy text-brand-cream py-16 px-6 md:px-12 overflow-hidden border-y border-brand-cream/10">
        {/* Subtle geometric lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-coral/20 to-transparent" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 relative z-10">
          
          <div id="stat-card-growth" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Counter value="2,317%" id="stat-number-growth" />
            <span className="font-sans font-medium text-brand-cream text-base mt-2">
              Social Media Growth
            </span>
          </div>

          <div id="stat-card-brands" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Counter value="4+" id="stat-number-brands" />
            <span className="font-sans font-medium text-brand-cream text-base mt-2">
              Brands Worked With
            </span>
          </div>

          <div id="stat-card-members" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Counter value="250+" id="stat-number-members" />
            <span className="font-sans font-medium text-brand-cream text-base mt-2">
              Community Members Reached
            </span>
          </div>

          <div id="stat-card-formats" className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Counter value="3" id="stat-number-formats" />
            <span className="font-sans font-medium text-brand-cream text-base mt-2">
              Content Formats Mastered
            </span>
          </div>

        </div>
      </div>

      {/* 3. LATEST WORK PREVIEW */}
      <div id="latest-work-preview" className="w-full bg-brand-cream px-6 md:px-12 py-24 max-w-7xl mx-auto relative">
        
        {/* Decorative Shapes */}
        <div className="absolute top-[10%] right-10 w-20 h-20 bg-brand-sage-light rounded-full mix-blend-multiply filter blur-md pointer-events-none hidden md:block" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10">
          <div>
            {/* Header label & shape */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-brand-sage rounded-sm rotate-45" />
              <span className="font-mono text-xs tracking-wider uppercase text-brand-sage font-bold">Featured Preview</span>
            </div>
            <h2 id="latest-work-title" className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-brand-navy tracking-tight">
              Latest Work
            </h2>
          </div>
          <p id="latest-work-subtitle" className="font-serif italic text-lg md:text-xl text-brand-navy/70 mt-4 md:mt-0 max-w-sm">
            A few things I'm proud of.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div id="latest-work-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {latestProjects.map((project, index) => {
            const isExternal = project.isExternal;
            const CardElement = isExternal ? "a" : "button";
            const elementProps = isExternal
              ? {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  id: `featured-card-${project.id}`,
                  className: "group w-full flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left cursor-pointer relative",
                }
              : {
                  onClick: () => onScrollToSection("work"),
                  id: `featured-card-${project.id}`,
                  className: "group w-full flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left cursor-pointer relative",
                };

            return (
              <AnimatedSection
                key={project.id}
                id={`featured-card-wrapper-${project.id}`}
                delay={index * 150}
                className="flex"
              >
                <CardElement {...(elementProps as any)}>
                  {/* Dot Grid accent inside card */}
                  <div className="absolute top-4 right-4 opacity-5 pointer-events-none group-hover:opacity-15 transition-opacity">
                    <svg width="40" height="40" viewBox="0 0 50 50" fill="currentColor">
                      <circle cx="5" cy="5" r="1.5" />
                      <circle cx="15" cy="5" r="1.5" />
                      <circle cx="25" cy="5" r="1.5" />
                      <circle cx="5" cy="15" r="1.5" />
                      <circle cx="15" cy="15" r="1.5" />
                      <circle cx="25" cy="15" r="1.5" />
                      <circle cx="5" cy="25" r="1.5" />
                      <circle cx="15" cy="25" r="1.5" />
                      <circle cx="25" cy="25" r="1.5" />
                    </svg>
                  </div>

                  {/* Color-block top section */}
                  <div className={`h-24 px-6 flex items-center justify-between ${project.colorClass}`}>
                    <span className="font-serif font-extrabold text-4xl opacity-90 select-none">
                      {project.initial}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/10 text-white group-hover:scale-110 transition-transform">
                      {project.icon}
                    </div>
                  </div>

                  {/* Card details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-brand-sage block mb-1">
                        {project.role}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-brand-navy mb-3 group-hover:text-brand-coral transition-colors line-clamp-2">
                        {project.company}
                      </h3>
                      <p className="font-sans text-xs text-brand-navy/70 leading-relaxed line-clamp-4">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-brand-navy/5 flex items-center justify-between">
                      <span className="font-sans font-semibold text-xs text-brand-navy group-hover:text-brand-coral transition-colors flex items-center gap-1.5">
                        {isExternal ? "View Deck" : "Read more"}
                        {isExternal ? (
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </span>
                    </div>
                  </div>
                </CardElement>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="mt-12 text-center md:text-right">
          <button
            id="view-all-work-trigger"
            onClick={() => onScrollToSection("work")}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase font-bold text-brand-coral hover:text-brand-navy transition-colors cursor-pointer group"
          >
            Explore All Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
