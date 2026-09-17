import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, ArrowUpRight, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [lastSubmitted, setLastSubmitted] = useState<{ name: string; email: string; message: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before sending.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const currentSubmission = { ...formData };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentSubmission),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setLastSubmitted(currentSubmission);
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setLastSubmitted(currentSubmission);
      setStatus("error");
      setErrorMessage(
        err.message || "Unable to send right now. You can also email rotem.lubovitch@gmail.com directly."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const mailtoUrl = lastSubmitted
    ? `mailto:rotem.lubovitch@gmail.com?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${lastSubmitted.name}`
      )}&body=${encodeURIComponent(
        `Hi Rotem,\n\n${lastSubmitted.message}\n\nBest,\n${lastSubmitted.name}\n${lastSubmitted.email}`
      )}`
    : `mailto:rotem.lubovitch@gmail.com?subject=${encodeURIComponent(
        formData.name ? `Portfolio Inquiry from ${formData.name}` : "Portfolio Inquiry"
      )}&body=${encodeURIComponent(
        formData.message
          ? `${formData.message}\n\nFrom: ${formData.name || "Visitor"} (${formData.email || "No email provided"})`
          : "Hi Rotem,\n\nI'd love to connect with you about an opportunity!"
      )}`;

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
              className="font-sans font-semibold text-brand-cream hover:text-brand-coral transition-colors text-base flex items-center gap-1.5"
            >
              rotem.lubovitch@gmail.com
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
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

        {/* CONTACT FORM CONTAINER */}
        <div id="contact-form-container" className="bg-brand-navy-light/60 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="font-serif font-semibold text-2xl md:text-3xl text-brand-cream">Send Me a Message</h3>
            <p className="text-brand-cream/60 text-xs md:text-sm font-sans mt-2">
              Messages are sent directly to{" "}
              <a href="mailto:rotem.lubovitch@gmail.com" className="text-brand-coral hover:underline font-mono">
                rotem.lubovitch@gmail.com
              </a>
            </p>
          </div>
          
          {status === "success" ? (
            <div id="contact-form-success" className="flex flex-col items-center text-center py-6 max-w-lg mx-auto">
              <div className="p-4 bg-brand-sage/20 text-brand-sage rounded-full mb-4 animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h4 className="font-serif font-bold text-2xl md:text-3xl text-brand-cream mb-2">Message Dispatched!</h4>
              <p className="font-sans text-brand-cream/90 text-sm md:text-base leading-relaxed mb-4">
                Thank you, <strong>{lastSubmitted?.name}</strong>! Your message has been sent to{" "}
                <span className="text-brand-coral font-mono">rotem.lubovitch@gmail.com</span>. Rotem will get back to you promptly at{" "}
                <span className="text-brand-sage font-mono">{lastSubmitted?.email}</span>.
              </p>

              {lastSubmitted && (
                <div className="w-full bg-brand-navy/60 border border-white/10 rounded-2xl p-4 text-left mb-6 text-xs space-y-2">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-brand-cream/50 uppercase font-mono text-[9px]">From</span>
                    <span className="text-brand-cream font-medium">{lastSubmitted.name} ({lastSubmitted.email})</span>
                  </div>
                  <div>
                    <span className="text-brand-cream/50 uppercase font-mono text-[9px] block mb-1">Message Preview</span>
                    <p className="text-brand-cream/80 italic font-sans whitespace-pre-wrap line-clamp-3">
                      "{lastSubmitted.message}"
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <button
                  id="contact-form-reset-btn"
                  onClick={() => {
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-coral text-brand-cream font-sans font-semibold rounded-xl hover:bg-brand-coral-hover transition-colors text-sm cursor-pointer"
                >
                  Send another message
                </button>
                <a
                  id="contact-form-mailto-fallback"
                  href={mailtoUrl}
                  className="w-full sm:w-auto px-6 py-3 bg-white/5 text-brand-cream border border-white/15 rounded-xl hover:bg-white/10 transition-colors text-sm font-sans flex items-center justify-center gap-2"
                >
                  <span>Open in Mail App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>
          ) : (
            <form id="portfolio-contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name field */}
                <div className="flex flex-col">
                  <label htmlFor="contact-name-input" className="font-mono text-[10px] tracking-wider text-brand-sage uppercase font-bold mb-2">
                    Your Name *
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    name="name"
                    required
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
                    Email Address *
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    name="email"
                    required
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
                  Your Message *
                </label>
                <textarea
                  id="contact-message-input"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project, internship opportunity, or say hello..."
                  className="bg-brand-navy border border-white/15 rounded-xl px-4 py-3.5 text-brand-cream text-sm focus:outline-none focus:border-brand-coral transition-colors resize-none placeholder-white/30"
                  disabled={status === "submitting"}
                />
              </div>

              {status === "error" && (
                <div id="contact-form-error-banner" className="bg-brand-coral/10 border border-brand-coral/30 rounded-xl p-3.5 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
                  <div className="text-xs text-brand-cream/90 font-sans space-y-2">
                    <p className="font-medium text-brand-coral">{errorMessage}</p>
                    <div className="pt-1">
                      <a
                        href={mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-coral text-brand-cream font-medium rounded-lg hover:bg-brand-coral-hover transition-colors font-mono text-[11px]"
                      >
                        <span>Click to Send via Your Email Client Instead</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-coral text-brand-cream font-sans font-semibold rounded-xl hover:bg-brand-coral-hover disabled:bg-brand-coral/40 transition-all duration-300 shadow-lg shadow-brand-coral/15 hover:shadow-xl cursor-pointer w-full sm:w-auto justify-center"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending to Rotem...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <a
                  id="contact-quick-email-link"
                  href="mailto:rotem.lubovitch@gmail.com"
                  className="text-xs font-mono text-brand-cream/60 hover:text-brand-coral transition-colors flex items-center gap-1"
                >
                  <span>Or email directly via mailto</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

