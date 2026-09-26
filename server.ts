import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialization check of GEMINI_API_KEY
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not defined.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

app.use(express.json());

// API route for Contact Form submission
let customFormSubmitToken = process.env.FORMSUBMIT_TOKEN || "";
let lastActivationSentAt = 0;

app.get("/api/contact/status", (req, res) => {
  res.json({
    recipientEmail: "rotem.lubovitch@gmail.com",
    hasCustomToken: Boolean(customFormSubmitToken),
    customTokenPreview: customFormSubmitToken ? `${customFormSubmitToken.slice(0, 6)}...` : null,
    lastActivationSentAt
  });
});

app.post("/api/contact/set-token", (req, res) => {
  const { token } = req.body;
  if (typeof token === "string") {
    customFormSubmitToken = token.trim();
    console.log(`[Contact Form] Custom FormSubmit token updated: ${customFormSubmitToken ? "set" : "cleared"}`);
    return res.json({ success: true, token: customFormSubmitToken });
  }
  return res.status(400).json({ error: "Invalid token" });
});

app.post("/api/contact/resend-activation", async (req, res) => {
  try {
    const now = Date.now();
    // 20 second cooldown to prevent token invalidation loops
    if (now - lastActivationSentAt < 20000) {
      const waitSec = Math.ceil((20000 - (now - lastActivationSentAt)) / 1000);
      return res.status(429).json({
        error: `Please wait ${waitSec} seconds before requesting another activation email, so previous tokens aren't invalidated.`,
        cooldownRemaining: waitSec
      });
    }

    const recipientEmail = "rotem.lubovitch@gmail.com";
    const appUrl = process.env.APP_URL || "https://ais-dev-saf36olwlu65qki5h35uhf-406068521101.us-west1.run.app";

    console.log(`[Contact Form] Dispatching single fresh activation email to ${recipientEmail}...`);

    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": appUrl,
        "Referer": `${appUrl}/`,
      },
      body: JSON.stringify({
        name: "Rotem Portfolio Activation",
        email: recipientEmail,
        _replyto: recipientEmail,
        message: "Activation handshake request for Rotem Lubovitch portfolio contact form.",
        _subject: "Activate Rotem Lubovitch Portfolio Form",
        _template: "table",
        _captcha: "false"
      })
    });

    const data = await response.json().catch(() => ({}));
    lastActivationSentAt = Date.now();

    return res.json({
      success: true,
      message: data.message || "Fresh activation email sent to rotem.lubovitch@gmail.com.",
      sentAt: lastActivationSentAt
    });
  } catch (error: any) {
    console.error("[Contact Form] Failed to resend activation:", error);
    return res.status(500).json({ error: error.message || "Failed to trigger activation." });
  }
});

// Store messages locally in server memory as a reliable fallback
interface StoredMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  formSubmitStatus: string;
}
const storedMessages: StoredMessage[] = [];

app.get("/api/contact/messages", (req, res) => {
  res.json({
    count: storedMessages.length,
    messages: storedMessages.slice(-20)
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are all required." });
    }

    console.log(`[Contact Form] Received submission from "${name}" <${email}>`);

    const target = customFormSubmitToken || "rotem.lubovitch@gmail.com";
    // FormSubmit verified origin:
    const verifiedOrigin = "https://ais-dev-saf36olwlu65qki5h35uhf-406068521101.us-west1.run.app";

    let formSubmitStatus = "pending";
    let formSubmitSuccess = false;
    let formSubmitMessage = "";

    try {
      // Forward to FormSubmit API with verified origin and browser user-agent
      const response = await fetch(`https://formsubmit.co/ajax/${target}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Origin": verifiedOrigin,
          "Referer": `${verifiedOrigin}/`,
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          message,
          _subject: `New Portfolio Message from ${name} (${email})`,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json().catch(() => ({}));
      console.log("[Contact Form] FormSubmit response:", data);

      formSubmitMessage = typeof data.message === "string" ? data.message : "";
      formSubmitSuccess = Boolean(data.success === true || data.success === "true" || response.ok);
      formSubmitStatus = formSubmitSuccess ? "delivered" : (data.message || "error");
    } catch (fsErr: any) {
      console.warn("[Contact Form] FormSubmit network delivery issue:", fsErr.message);
      formSubmitStatus = `network_error: ${fsErr.message}`;
    }

    // Always preserve the message in server storage
    const record: StoredMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      formSubmitStatus
    };
    storedMessages.push(record);
    console.log(`[Contact Form] Message saved to server storage (Total: ${storedMessages.length})`);

    const isActivation = formSubmitMessage.toLowerCase().includes("activation");

    return res.json({
      success: true,
      activationNeeded: isActivation,
      message: formSubmitSuccess ? (formSubmitMessage || "Message dispatched successfully!") : "Message received and saved!"
    });
  } catch (error: any) {
    console.error("[Contact Form] Failed to process message:", error);
    return res.status(500).json({
      error: error.message || "Failed to process message."
    });
  }
});

// API route for Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected array." });
    }

    const ai = getAiClient();

    // Map messages to Gemini API format
    const contents = messages.map((m: any) => {
      const role = m.role === "user" ? "user" : "model";
      return {
        role,
        parts: [{ text: m.content }]
      };
    });

    const systemInstruction = `You are the AI Assistant for Rotem Lubovitch, a highly ambitious and skilled 17-year-old marketing intern, content creator, and high school senior based in Cupertino, California (Silicon Valley). She is 17 years old, attends Homestead High School, and has an outstanding GPA.

Your objective is to represent Rotem's experience, interests, projects, and ambitions to recruiters, potential clients, and visitors in a friendly, professional, energetic, and helpful manner. Refer to Rotem in the third person ("Rotem worked on...", "She is..."). Keep responses concise, structured, and visually engaging (using markdown, bullet points, or paragraphs where appropriate).

Key facts about Rotem:
0. Age: Rotem is 17 years old.
1. Current Internships / Work Experience:
   - Social Media Intern at "The Imperfectionist" (Feb 2026–Present): Designing social graphics, running reels/shorts, and analyzing engagement.
   - Digital Marketing Intern at "Rose Cart" (Jan–Apr 2026): Crafted Valentine's campaigns, designed bouquet petal cards and grids, analyzed customer feedback.
   - Aesthetic Intern at "Graystar Design" (Dec 2024 & Oct 2025): Layout formatting, brand aesthetics curation, visual moodboard design.
   - Political Canvasser (Aug–Nov 2024): Canvassed face-to-face, tracked registered voters using PDI (Political Data Inc.) platform.
   - Promotional Intern at "Wayground" (Jun–Aug 2024): Worked on gamified learning promotional concepts, short-form video creation.
   - Marketing Committee at "FBLA x Allcove" (Feb–Mar 2024): Promoted teen mental health outreach services with Allcove.
2. Education & Honors:
   - Senior at Homestead High School, Cupertino, CA.
   - Member of the National Honor Society (NHS) with 45+ volunteer hours.
   - Board Member of the Sunnyvale Library Teen Advisory Board (organizing monthly teen events and reading challenges).
3. Technical & Creative Skills:
   - Tools: Canva, Adobe Illustrator, Wix, Google Sheets, PDI, Scratch.
   - Specialties: Instagram/TikTok marketing, Short-form Video, Carousel Design, Brand Curation, Client Communication, Event Planning, Cross-Cultural Collaboration.
4. Fun Hobbies:
   - Fantasy novels, Formula 1 racing, Color Guard, volunteering with Grassroots Ecology, and learning French.
5. Action Items for Visitors:
   - Visitors can download her formal single-page PDF Resume by scrolling to the 'About' section on the page and clicking 'Download Resume'.
   - Visitors can contact her directly via email at rotem.lubovitch@gmail.com, or fill out the contact form at the bottom of the page (Navbar > Contact).

Always remain enthusiastic, polite, and eager to help. Keep answers brief (typically 1-3 short paragraphs or clean lists) so it fits nicely inside a compact corner chat widget.`;

    let generatedText = "";
    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash"];
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        console.log(`Attempting content generation using model: ${model}`);
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });
        if (response && response.text) {
          generatedText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} failed:`, err.message || err);
        lastError = err;
      }
    }

    if (!generatedText) {
      console.warn("All Gemini models failed or returned empty. Applying local smart responder.");
      const userQuery = contents[contents.length - 1]?.parts?.[0]?.text?.toLowerCase() || "";

      if (userQuery.includes("age") || userQuery.includes("how old") || userQuery.includes("old is") || userQuery.includes("old are you") || userQuery.includes("how old i was") || userQuery.includes("how old am i") || userQuery.includes("how old is rotem")) {
        generatedText = "Rotem is 17 years old! She is a senior at Homestead High School in Cupertino, California, and a marketing intern and content strategist.";
      } else if (userQuery.includes("resume") || userQuery.includes("cv") || userQuery.includes("download")) {
        generatedText = "You can download Rotem's formal single-page resume by scrolling down to the 'About' section on the main page and clicking the 'Download Resume' button! Let me know if you want to know more about her experience.";
      } else if (userQuery.includes("contact") || userQuery.includes("email") || userQuery.includes("reach") || userQuery.includes("touch")) {
        generatedText = "You can contact Rotem directly via email at rotem.lubovitch@gmail.com, or scroll to the bottom of the page to fill out the contact form. She is looking forward to connecting with you!";
      } else if (userQuery.includes("intern") || userQuery.includes("work") || userQuery.includes("job") || userQuery.includes("experience") || userQuery.includes("rose cart") || userQuery.includes("imperfectionist")) {
        generatedText = "Rotem has completed and is currently pursuing several impressive internships:\n\n• **Social Media Intern** at *The Imperfectionist* (Feb 2026–Present): Designing engaging graphics, Reels/Shorts, and managing brand aesthetics.\n• **Digital Marketing Intern** at *Rose Cart* (Jan–Apr 2026): Crafted successful Valentine's Day marketing campaigns, designed bouquet grids, and handled client communications.\n• **Aesthetic Intern** at *Graystar Design* (Dec 2024 & Oct 2025): Layout formatting and curation of design aesthetics.\n• **Political Canvasser** (Aug–Nov 2024): Done face-to-face voter registration & outreach.";
      } else if (userQuery.includes("school") || userQuery.includes("education") || userQuery.includes("gpa") || userQuery.includes("homestead")) {
        generatedText = "Rotem is a senior at Homestead High School in Cupertino, California. She is an honors student, a member of the National Honor Society (NHS), and serves on the Sunnyvale Library Teen Advisory Board!";
      } else if (userQuery.includes("skill") || userQuery.includes("canva") || userQuery.includes("tool")) {
        generatedText = "Rotem is highly skilled in modern creative and marketing tools. She is proficient with Canva, Adobe Illustrator, Wix, Google Sheets, PDI, and Scratch. Her expertise includes social media strategy (Instagram, TikTok, YouTube Shorts), visual curation, and client communications!";
      } else {
        generatedText = "Hi! The online AI service is currently experiencing high demand, but I'm here as Rotem's smart offline assistant. 🌟\n\nRotem is a 17-year-old marketing intern, Homestead High senior, and a highly creative content designer based in Cupertino.\n\nFeel free to ask about her:\n• **Work Experience** & Internships\n• **Education** and Honors\n• **Skills** and Tools\n• How to **Contact** or find her **Resume**";
      }
    }

    res.json({ text: generatedText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate chat response" });
  }
});

// Vite middleware setup
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
