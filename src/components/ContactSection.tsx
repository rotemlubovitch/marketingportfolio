import React, { useState } from "react";
import { Mail, Compass, MapPin, Send, CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    // Simulate API submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="w-full bg-brand-navy text-brand-cream py-28 px-6 md:px-12 relative overflow-hidden">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-brand-coral/10 blur-[100px] pointer-events-none animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-brand-sage/10 blur-[80px] pointer-events-none animate-float-delayed" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <AnimatedSection id="contact-header">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-sage font-bold">Get In Touch</span>
            <h2 className="font-serif font-bold text-4xl md:text-6xl text-brand-cream tracking-tight leading-tight mt-3 mb-6">
              Let's work together.
            </h2>
            <p className="font-sans font-light text-brand-cream/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              I'm currently open to marketing internships, social media projects, and creative collaborations. If you think we'd be a good fit — reach out.
            </p>
          </AnimatedSection>
        </div>

        {/* DETAILS STRIP (Centered & Spaced) */}
        <div id="contact-details-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-20 border-y border-white/10 py-10">
          
          {/* Email Card */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white/5 text-brand-coral rounded-2xl mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-brand-sage uppercase font-bold block mb-1">Email Me Directly</span>
            <a
              id="contact-email-link"
              href="mailto:rotem.lubovitch@gmail.com"
              className="font-sans font-semibold text-brand-cream hover:text-brand-coral transition-colors text-base"
            >
              rotem.lubovitch@gmail.com
            </a>
          </div>

          {/* Location Card */}
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white/5 text-brand-sage rounded-2xl mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-brand-sage uppercase font-bold block mb-1">Location</span>
            <span className="font-sans font-semibold text-brand-cream text-base">
              Cupertino, CA (Bay Area)
            </span>
          </div>

        </div>

        {/* SIMPLE CONTACT FORM */}
        <div id="contact-form-container" className="bg-brand-navy-light/60 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
          <h3 className="font-serif font-semibold text-2xl text-brand-cream mb-8 text-center">Send Me a Message</h3>
          
          {status === "success" ? (
            <div id="contact-form-success" className="flex flex-col items-center text-center py-8">
              <div className="p-4 bg-brand-sage/20 text-brand-sage rounded-full mb-4 animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-brand-cream mb-2">Message Sent!</h4>
              <p className="font-sans text-brand-cream/80 text-sm max-w-sm">
                Thanks! Rotem will get back to you soon. Looking forward to connecting!
              </p>
              <button
                id="contact-form-reset-btn"
                onClick={() => setStatus("idle")}
                className="mt-6 font-mono text-xs text-brand-coral hover:underline focus:outline-none cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form id="portfolio-contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name field */}
                <div className="flex flex-col">
                  <label htmlFor="contact-name-input" className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Taylor Swift"
                    className="bg-brand-navy border border-white/15 rounded-xl px-4 py-3.5 text-brand-cream text-sm focus:outline-none focus:border-brand-coral transition-colors placeholder-white/30"
                    disabled={status === "submitting"}
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col">
                  <label htmlFor="contact-email-input" className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E.g. taylor@example.com"
                    className="bg-brand-navy border border-white/15 rounded-xl px-4 py-3.5 text-brand-cream text-sm focus:outline-none focus:border-brand-coral transition-colors placeholder-white/30"
                    disabled={status === "submitting"}
                  />
                </div>

              </div>

              {/* Message field */}
              <div className="flex flex-col">
                <label htmlFor="contact-message-input" className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-2">
                  Your Message
                </label>
                <textarea
                  id="contact-message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project, internship opportunity, or say hello..."
                  className="bg-brand-navy border border-white/15 rounded-xl px-4 py-3.5 text-brand-cream text-sm focus:outline-none focus:border-brand-coral transition-colors resize-none placeholder-white/30"
                  disabled={status === "submitting"}
                />
              </div>

              {status === "error" && (
                <p id="contact-form-error-msg" className="text-brand-coral text-xs font-mono">
                  * Please fill in all fields before submitting.
                </p>
              )}

              {/* Submit button */}
              <div className="text-center pt-2">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-coral text-brand-cream font-sans font-semibold rounded-xl hover:bg-brand-coral-hover disabled:bg-brand-coral/40 transition-all duration-300 shadow-lg shadow-brand-coral/10 hover:shadow-xl cursor-pointer w-full sm:w-auto justify-center"
                >
                  {status === "submitting" ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
