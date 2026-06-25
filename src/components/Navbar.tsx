import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prevScrollY = useRef(0);

  // Smart hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        // Always show near the very top of the page
        setVisible(true);
      } else if (currentScrollY > prevScrollY.current) {
        // Scrolling down -> hide
        if (visible && !mobileMenuOpen) {
          setVisible(false);
        }
      } else {
        // Scrolling up -> show
        if (!visible) {
          setVisible(true);
        }
      }
      
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, mobileMenuOpen]);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Work", id: "work" },
    { name: "Design", id: "design" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-transform duration-500 ease-in-out border-b border-brand-navy/5 bg-brand-cream/80 backdrop-blur-md ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick("home")}
            className="group flex flex-col items-start cursor-pointer text-left"
          >
            <span className="font-serif font-bold text-2xl tracking-tight text-brand-navy group-hover:text-brand-coral transition-colors duration-300">
              Rotem Lubovitch
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-brand-sage font-medium">
              Cupertino, CA · Marketing
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div id="desktop-nav-menu" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`desktop-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-2 font-sans font-medium text-sm transition-colors duration-300 cursor-pointer ${
                  activeSection === link.id
                    ? "text-brand-coral font-semibold"
                    : "text-brand-navy/80 hover:text-brand-navy"
                }`}
              >
                {link.name}
                {/* Active Underline Indicator */}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-coral rounded-full" />
                )}
              </button>
            ))}

            {/* Quick Contact CTA Button */}
            <button
              id="desktop-nav-cta"
              onClick={() => handleLinkClick("contact")}
              className="ml-2 px-4 py-2 bg-brand-navy text-brand-cream font-sans font-medium text-xs rounded-full hover:bg-brand-coral hover:text-brand-cream transition-all duration-300 shadow-sm cursor-pointer flex items-center gap-1"
            >
              Let's Talk
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-brand-navy hover:text-brand-coral transition-colors focus:outline-none cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-drawer-overlay"
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-brand-navy/30 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-drawer-container"
        className={`fixed top-0 right-0 bottom-0 z-50 w-3/4 max-w-sm bg-brand-cream border-l border-brand-navy/10 shadow-2xl p-8 md:hidden flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div id="mobile-drawer-header">
          {/* Drawer Close Button */}
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif font-bold text-lg text-brand-navy">Menu</span>
            <button
              id="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-brand-navy hover:text-brand-coral transition-colors focus:outline-none cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links stack */}
          <div id="mobile-drawer-links" className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                id={`mobile-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left font-serif font-bold text-2xl py-2 border-b border-brand-navy/5 ${
                  activeSection === link.id ? "text-brand-coral" : "text-brand-navy"
                } transition-all duration-300`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Drawer footer details */}
        <div id="mobile-drawer-footer" className="flex flex-col gap-4 border-t border-brand-navy/10 pt-8">
          <p className="font-mono text-xs tracking-wider text-brand-sage uppercase">
            Let's build something epic
          </p>
          <a
            id="mobile-drawer-email"
            href="mailto:rotem.lubovitch@gmail.com"
            className="font-sans text-sm font-semibold text-brand-navy hover:text-brand-coral transition-colors"
          >
            rotem.lubovitch@gmail.com
          </a>
          <p className="text-xs text-brand-navy/50 font-sans">
            © {new Date().getFullYear()} Rotem Lubovitch.
          </p>
        </div>
      </div>
    </>
  );
}
