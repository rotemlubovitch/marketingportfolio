import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, ArrowUpRight, Loader2, Copy, Check, ExternalLink, RefreshCw } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [lastSubmitted, setLastSubmitted] = useState<{ name: string; email: string; message: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText("rotem.lubovitch@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

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

      if (response.ok && (data.success === true || data.success === "true")) {
        setLastSubmitted(currentSubmission);
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || data.message || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setLastSubmitted(currentSubmission);
      setStatus("error");
      setErrorMessage(
        err.message || "Unable to send right now. You can email rotem.lubovitch@gmail.com directly or open Gmail below."
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

  // Pre-filled email URLs (safe for browser webmail or desktop mail client)
  const activeSubmission = lastSubmitted || formData;
  const subjectText = activeSubmission.name
    ? `Portfolio Inquiry from ${activeSubmission.name}`
    : "Portfolio Inquiry for Rotem Lubovitch";
  const bodyText = activeSubmission.message
    ? `${activeSubmission.message}\n\nFrom: ${activeSubmission.name || "Visitor"} (${activeSubmission.email || "No email provided"})`
    : "Hi Rotem,\n\nI came across your portfolio and would love to connect!";

  const mailtoUrl = `mailto:rotem.lubovitch@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rotem.lubovitch@gmail.com&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

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
            <div className="flex items-center justify-center gap-2">
              <a
                id="contact-email-link"
                href="mailto:rotem.lubovitch@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-semibold text-brand-cream hover:text-brand-coral transition-colors text-base flex items-center gap-1.5"
              >
                rotem.lubovitch@gmail.com
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <button
                id="copy-email-top-btn"
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                className="p-1.5 bg-white/5 hover:bg-white/15 text-brand-cream/70 hover:text-brand-sage rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-brand-sage" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px] font-mono">{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>
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
                  id="contact-form-gmail-fallback"
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 bg-white/5 text-brand-cream border border-white/15 rounded-xl hover:bg-white/10 transition-colors text-sm font-sans flex items-center justify-center gap-2"
                >
                  <span>Open in Gmail</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
                <button
                  id="contact-form-copy-fallback"
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto px-5 py-3 bg-brand-sage/10 text-brand-sage border border-brand-sage/20 rounded-xl hover:bg-brand-sage/20 transition-colors text-sm font-sans flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
                </button>
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
                <div id="contact-form-error-banner" className="bg-brand-coral/10 border border-brand-coral/30 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start gap-4">
                  <div className="p-2 bg-brand-coral/20 text-brand-coral rounded-xl shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-brand-cream/90 font-sans space-y-3 flex-1">
                    <div>
                      <p className="font-semibold text-brand-coral text-sm">{errorMessage}</p>
                      <p className="text-brand-cream/70 text-xs mt-1">
                        Don't worry — your message is safe. You can send it directly using any of these guaranteed options:
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {/* 1. Direct Web Gmail (100% reliable in browser, no desktop app required) */}
                      <a
                        id="error-open-gmail-btn"
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-coral text-brand-cream font-medium rounded-lg hover:bg-brand-coral-hover transition-colors font-mono text-[11px] shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open & Send in Web Gmail</span>
                      </a>

                      {/* 2. Desktop Mail Client */}
                      <a
                        id="error-open-mailto-btn"
                        href={mailtoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 text-brand-cream hover:bg-white/20 border border-white/15 rounded-lg transition-colors font-mono text-[11px]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Desktop Mail App</span>
                      </a>

                      {/* 3. One-Click Copy Email Address */}
                      <button
                        id="error-copy-email-btn"
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-sage/20 text-brand-sage hover:bg-brand-sage/30 border border-brand-sage/30 rounded-lg transition-colors font-mono text-[11px] cursor-pointer"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? "rotem.lubovitch@gmail.com Copied!" : "Copy Email Address"}</span>
                      </button>

                      {/* 4. Retry */}
                      <button
                        id="error-retry-btn"
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/5 text-brand-cream/80 hover:bg-white/15 rounded-lg transition-colors font-mono text-[11px] cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit button and quick actions */}
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

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    id="contact-quick-gmail-link"
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-brand-cream/60 hover:text-brand-coral transition-colors flex items-center gap-1"
                  >
                    <span>Open in Gmail</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <span className="text-white/20 text-xs">•</span>

                  <button
                    id="contact-quick-copy-btn"
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs font-mono text-brand-cream/60 hover:text-brand-sage transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-brand-sage" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

