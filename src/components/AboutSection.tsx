import { useState } from "react";
import { GraduationCap, Award, BookOpen, Clock, Heart, Users, FileText, Download } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { generateResumePDF } from "../utils/resumeGenerator";
import rotemImg from "../assets/images/rotem_profile.jpg";

export default function AboutSection() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateResumePDF();
      } catch (err) {
        console.error("PDF generation failed:", err);
      } finally {
        setIsDownloading(false);
      }
    }, 800);
  };
  const platformSkills = ["Canva", "Adobe Illustrator", "Wix", "Google Sheets", "PDI", "Scratch"];
  const strategySkills = [
    "Instagram",
    "TikTok",
    "Short-Form Video",
    "Carousel Design",
    "Email Marketing",
    "Market Research",
    "Brand Positioning",
  ];
  const softSkills = [
    "Cross-Cultural Collaboration",
    "Client Communication",
    "Data Tracking",
    "Event Planning",
    "Community Outreach",
  ];

  const leadership = [
    {
      role: "Board Member",
      organization: "Sunnyvale Library Teen Advisory Board",
      duration: "Sep 2025 – Present",
      description: "Leads monthly meetings, organizes engaging teen events, and champions local literacy initiatives.",
      icon: <Users className="w-5 h-5 text-brand-gold" />,
    },
    {
      role: "Member",
      organization: "National Honor Society",
      duration: "Sep 2024 – Present",
      description: "Accumulated 45+ dedicated volunteer hours; actively contributes to community organic garden work.",
      icon: <Heart className="w-5 h-5 text-brand-coral" />,
    },
    {
      role: "Marketing Committee Member",
      organization: "Future Business Leaders of America",
      duration: "Feb – Mar 2024",
      description: "Collaborated on non-profit initiatives (Allcove mental health services) and analyzed teen marketing trends.",
      icon: <Award className="w-5 h-5 text-brand-sage" />,
    },
  ];

  return (
    <section id="about" className="w-full bg-white relative">
      
      {/* HEADER BANNER (Navy Background) */}
      <div className="w-full bg-brand-navy py-20 text-brand-cream relative overflow-hidden border-b border-brand-cream/10">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark to-brand-navy-light opacity-50" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <AnimatedSection id="about-banner-anim">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-sage font-bold">Behind the Strategist</span>
            <h1 id="about-title" className="font-serif font-bold text-5xl md:text-7xl tracking-tight leading-none mt-2">
              About
            </h1>
          </AnimatedSection>
        </div>
      </div>

      {/* SPLIT LAYOUT BIO SECTION */}
      <div className="w-full bg-brand-cream py-24 px-6 md:px-12 border-b border-brand-navy/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Profile Photo Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="bg-white border border-brand-navy/5 shadow-xl p-4 rounded-3xl max-w-[280px] sm:max-w-[320px] transform hover:rotate-1 hover:scale-102 transition-all duration-300 relative group">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-cream relative">
                <img
                  src={rotemImg}
                  alt="Rotem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="font-mono text-[9px] tracking-widest text-brand-sage uppercase font-bold block mb-0.5">Based In</span>
                <p className="font-serif font-bold text-brand-navy text-sm">Cupertino, California</p>
                <p className="font-sans text-[10px] text-brand-navy/60 font-light mt-0.5">Silicon Valley Hub</p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio text */}
          <div className="lg:col-span-8">
            <AnimatedSection id="about-bio-content">
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-navy tracking-tight leading-tight mb-6">
                Hi, I'm Rotem — a 17-year-old senior at Homestead High School with an outstanding GPA and a genuine obsession with how brands communicate.
              </h2>
              
              <div className="space-y-6 text-brand-navy/85 font-sans font-light text-base md:text-lg leading-relaxed">
                <p>
                  I started doing marketing internships at 14 because I wanted to learn by doing — not just reading about it in a textbook. Since then, I've worked with a flower shop, a cosmetics startup, an EdTech platform, a political campaign, and a local mental health nonprofit. 
                </p>
                <p>
                  Each one of these roles taught me something different about what it actually takes to connect with an audience. From tracking voters on PDI to optimizing social conversion funnels, I love decoding consumer behavior under pressure.
                </p>
                <p className="italic font-normal text-brand-sage font-serif text-base">
                  When I'm not designing or strategizing, I'm reading fantasy novels, watching Formula 1 races, doing color guard, or volunteering at Grassroots Ecology. I'm also slowly learning French.
                </p>
              </div>

              {/* Resume Download Action Card */}
              <div id="resume-download-box" className="mt-8 p-6 bg-white border border-brand-navy/5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-brand-navy">Professional Resume</h4>
                  <p className="font-sans text-xs text-brand-navy/60">
                    Get an elegant, single-page printable PDF of Rotem's academic and marketing experience.
                  </p>
                </div>
                <button
                  id="btn-download-resume"
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-coral hover:bg-brand-coral-hover text-brand-cream rounded-xl font-sans font-semibold text-sm transition-all duration-300 shadow-md shadow-brand-coral/10 hover:shadow-lg hover:shadow-brand-coral/20 cursor-pointer select-none active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed group self-start sm:self-auto"
                >
                  {isDownloading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-brand-cream/30 border-t-brand-cream rounded-full animate-spin"></span>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Download Resume (PDF)</span>
                      <Download className="w-3.5 h-3.5 opacity-60 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>

      {/* EDUCATION SECTION */}
      <div id="about-education-section" className="w-full bg-white py-24 px-6 md:px-12 border-b border-brand-navy/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center gap-2 mb-12">
            <GraduationCap className="w-6 h-6 text-brand-coral" />
            <h3 className="font-serif font-bold text-3xl text-brand-navy">Education</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Homestead */}
            <AnimatedSection id="edu-card-hhs">
              <div className="bg-brand-cream border border-brand-navy/5 shadow-sm hover:shadow-md transition-shadow p-8 rounded-3xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="font-serif font-bold text-2xl text-brand-navy">Homestead High School</h4>
                      <p className="font-sans text-brand-navy/60 text-sm">Cupertino, CA</p>
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-brand-coral bg-brand-coral/10 px-3 py-1.5 rounded-full font-bold">
                      Aug 2023 – Jun 2027
                    </span>
                  </div>

                  <div className="border-t border-brand-navy/5 pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-sans text-sm text-brand-navy/60">Academic Standing:</span>
                      <strong className="font-mono text-sm text-brand-navy bg-brand-sage/10 px-2 py-0.5 rounded font-bold">GPA: 3.97 / 4.0</strong>
                    </div>
                    
                    <h5 className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-2">Relevant Coursework</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {["AP Psychology", "Accounting", "Principles of Business", "Law", "Photography"].map((course) => (
                        <span key={course} className="text-xs font-sans text-brand-navy bg-white border border-brand-navy/5 px-2.5 py-1 rounded-lg">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Card 2: De Anza */}
            <AnimatedSection id="edu-card-deanza">
              <div className="bg-brand-cream border border-brand-navy/5 shadow-sm hover:shadow-md transition-shadow p-8 rounded-3xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="font-serif font-bold text-2xl text-brand-navy">De Anza College</h4>
                      <p className="font-sans text-brand-navy/60 text-sm">Cupertino, CA</p>
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-brand-coral bg-brand-coral/10 px-3 py-1.5 rounded-full font-bold">
                      Oct – Dec 2025
                    </span>
                  </div>

                  <div className="border-t border-brand-navy/5 pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-sans text-sm text-brand-navy/60">Completed Course:</span>
                      <strong className="font-mono text-sm text-brand-navy bg-brand-sage/10 px-2 py-0.5 rounded font-bold">Grade: A (4.0)</strong>
                    </div>

                    <h5 className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-2">Advanced Coursework</h5>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-sans text-brand-navy bg-white border border-brand-navy/5 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-brand-coral" />
                        Principles of Microeconomics
                      </span>
                    </div>
                    <p className="text-xs text-brand-navy/60 font-sans mt-4 font-light italic">
                      * Rigorous collegiate level economics completed successfully at 16 years old.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>

      {/* SKILLS MATRIX SECTION */}
      <div id="about-skills-matrix" className="w-full bg-brand-cream py-24 px-6 md:px-12 border-b border-brand-navy/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-sage font-bold">Competency Overview</span>
            <h3 className="font-serif font-bold text-3xl md:text-4xl text-brand-navy tracking-tight leading-none mt-2">
              Skills & Toolkit
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Category 1: Platforms */}
            <AnimatedSection id="skills-cat-platforms">
              <div className="bg-white p-8 rounded-2xl border border-brand-navy/5 h-full">
                <span className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold block mb-4 border-b border-brand-navy/5 pb-2">
                  Platforms & Tools
                </span>
                <div className="flex flex-wrap gap-2">
                  {platformSkills.map((skill) => (
                    <span key={skill} className="px-3.5 py-2 bg-brand-cream text-brand-navy rounded-xl font-sans text-sm font-semibold hover:bg-brand-coral hover:text-brand-cream transition-all duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Category 2: Strategy */}
            <AnimatedSection id="skills-cat-strategy">
              <div className="bg-white p-8 rounded-2xl border border-brand-navy/5 h-full">
                <span className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold block mb-4 border-b border-brand-navy/5 pb-2">
                  Content & Strategy
                </span>
                <div className="flex flex-wrap gap-2">
                  {strategySkills.map((skill) => (
                    <span key={skill} className="px-3.5 py-2 bg-brand-cream text-brand-navy rounded-xl font-sans text-sm font-semibold hover:bg-brand-coral hover:text-brand-cream transition-all duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Category 3: Soft Skills */}
            <AnimatedSection id="skills-cat-soft">
              <div className="bg-white p-8 rounded-2xl border border-brand-navy/5 h-full">
                <span className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold block mb-4 border-b border-brand-navy/5 pb-2">
                  Soft Skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span key={skill} className="px-3.5 py-2 bg-brand-cream text-brand-navy rounded-xl font-sans text-sm font-semibold hover:bg-brand-coral hover:text-brand-cream transition-all duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>

      {/* LEADERSHIP SECTION (timeline) */}
      <div id="about-leadership-timeline" className="w-full bg-white py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-sage font-bold">Community & Responsibility</span>
            <h3 className="font-serif font-bold text-3xl md:text-4xl text-brand-navy tracking-tight leading-none mt-2">
              Leadership & Volunteering
            </h3>
          </div>

          {/* Timeline Stack */}
          <div className="relative border-l border-brand-navy/10 pl-6 md:pl-10 space-y-12">
            
            {leadership.map((item, index) => (
              <AnimatedSection 
                key={item.organization} 
                id={`timeline-item-${index}`}
                className="relative"
              >
                {/* Bullet circle accent */}
                <span className="absolute -left-[35px] md:-left-[51px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-brand-cream border-2 border-brand-navy/10 text-brand-navy z-10">
                  {item.icon}
                </span>

                <div className="bg-brand-cream border border-brand-navy/5 p-6 md:p-8 rounded-2xl hover:border-brand-coral/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-serif font-bold text-xl text-brand-navy">
                        {item.role}
                      </h4>
                      <p className="font-sans font-semibold text-brand-sage text-sm">
                        {item.organization}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wider text-brand-navy/50 font-bold bg-brand-navy/5 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-brand-coral" />
                      {item.duration}
                    </span>
                  </div>
                  
                  <p className="font-sans text-sm text-brand-navy/70 leading-relaxed font-light">
                    {item.description}
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
