import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, User, ArrowUpRight } from "lucide-react";
import rotemImg from "../assets/images/rotem_profile.jpg";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hi! I'm Rotem's AI Assistant. 🌟 I can tell you about her marketing background, internships, skills, or help you download her resume. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "Tell me about Rotem",
    "What internships has she done?",
    "Where can I find her resume?",
    "How can I contact her?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message to assistant");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", content: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Oops! I ran into an error connecting to my servers. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="chatbot-container" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button (FAB) */}
      <button
        id="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer transition-all duration-300 transform select-none hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-brand-navy hover:bg-brand-navy-dark"
            : "bg-brand-coral hover:bg-brand-coral-hover animate-float"
        }`}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-scale-up" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 animate-scale-up" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-brand-sage rounded-full border-2 border-white animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          id="chatbot-panel"
          className="absolute bottom-18 right-0 w-[90vw] sm:w-[380px] h-[500px] bg-white border border-brand-navy/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-up max-w-[calc(100vw-2rem)]"
        >
          {/* Header */}
          <div className="bg-brand-navy p-4 flex items-center justify-between border-b border-white/5 relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark to-brand-navy-light opacity-50" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-cream/20 bg-brand-cream flex-shrink-0">
                <img
                  src={rotemImg}
                  alt="Rotem avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-brand-cream flex items-center gap-1.5">
                  Rotem's AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                </h3>
                <p className="font-mono text-[9px] tracking-wider text-brand-sage uppercase font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-sage rounded-full animate-ping" />
                  Online & Active
                </p>
              </div>
            </div>
            <button
              id="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              className="text-brand-cream/60 hover:text-brand-cream p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer relative z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div id="chatbot-messages" className="flex-grow p-4 overflow-y-auto space-y-4 bg-brand-cream/40">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 select-none overflow-hidden ${
                    msg.role === "user"
                      ? "bg-brand-coral text-white"
                      : "bg-brand-navy text-brand-cream"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <img
                      src={rotemImg}
                      alt="Rotem tiny"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-3 rounded-2xl font-sans text-xs md:text-sm leading-relaxed shadow-sm transition-card ${
                    msg.role === "user"
                      ? "bg-brand-coral text-white rounded-tr-none"
                      : "bg-white text-brand-navy border border-brand-navy/5 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <div className="w-6 h-6 rounded-full bg-brand-navy text-brand-cream flex items-center justify-center text-xs flex-shrink-0 overflow-hidden">
                  <img
                    src={rotemImg}
                    alt="Rotem loading"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-white text-brand-navy border border-brand-navy/5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-navy/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-brand-navy/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-brand-navy/40 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div
            id="chatbot-suggestions"
            className="px-3 py-2 border-t border-brand-navy/5 flex gap-1.5 overflow-x-auto bg-white whitespace-nowrap scrollbar-thin select-none flex-shrink-0"
          >
            {suggestionChips.map((chip, index) => (
              <button
                key={index}
                onClick={() => handleSend(chip)}
                className="inline-flex items-center gap-0.5 px-3 py-1 bg-brand-cream hover:bg-brand-coral/10 hover:text-brand-coral border border-brand-navy/5 hover:border-brand-coral/20 rounded-full text-[11px] font-sans font-medium text-brand-navy/70 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{chip}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            id="chatbot-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-brand-navy/5 bg-white flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-grow px-3 py-2 border border-brand-navy/10 rounded-xl font-sans text-xs md:text-sm focus:outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral placeholder-brand-navy/30"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-brand-coral hover:bg-brand-coral-hover disabled:bg-brand-navy/10 text-white rounded-xl transition-all cursor-pointer flex-shrink-0 disabled:cursor-not-allowed select-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
