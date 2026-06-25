import { jsPDF } from "jspdf";

export function generateResumePDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  // Color Palette - Sleek Professional Dark Navy and Warm Accent
  const primaryColor = [27, 42, 74];    // #1B2A4A (Dark Navy)
  const accentColor = [139, 92, 246];  // #8B5CF6 (Violet Theme Accent)
  const textColor = [51, 65, 85];      // Slate 700 for body text
  const mutedColor = [100, 116, 139];   // Slate 500 for secondary text
  const lightGray = [226, 232, 240];    // Divider lines

  const marginX = 15;
  const maxWidth = 185.9; // 215.9 (Letter width) - 30 (Margins)
  let y = 15; // Starting Y coordinate

  const addHeader = () => {
    // Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("ROTEM LUBOVITCH", marginX, y);
    y += 5.5;

    // Contact details line
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const contactText = "Sunnyvale, CA  |  rotem.lubovitch@gmail.com  |  www.linkedin.com/in/rotem-lubovitch-019l";
    doc.text(contactText, marginX, y);
    y += 5;

    // Horizontal divider
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, y, marginX + maxWidth, y);
    y += 6;
  };

  const addSectionHeader = (title: string) => {
    y += 2.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(title, marginX, y);
    
    // Draw an elegant underlying bar for sections
    y += 1.2;
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, marginX + 15, y);
    y += 4.5;
  };

  const addBullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    
    // Bullet point character
    doc.text("•", marginX + 3, y);
    
    // Wrapped bullet text
    const lines = doc.splitTextToSize(text, maxWidth - 8);
    doc.text(lines, marginX + 6, y);
    y += lines.length * 3.6 + 0.8;
  };

  const addExperienceHeader = (company: string, title: string, date: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(company, marginX, y);

    doc.text(date, marginX + maxWidth, y, { align: "right" });
    y += 4;

    doc.setFont("helvetica", "oblique");
    doc.setFontSize(8.5);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text(title, marginX, y);
    y += 4.5;
  };

  // 1. HEADER
  addHeader();

  // 2. EDUCATION
  addSectionHeader("EDUCATION");
  
  // De Anza College
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("De Anza College, Cupertino, CA", marginX, y);
  doc.text("Oct. - Dec. 2025", marginX + maxWidth, y, { align: "right" });
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("Principles of Microeconomics (A)", marginX, y);
  y += 6;

  // Homestead High School
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Homestead High School, Cupertino, CA", marginX, y);
  doc.text("Aug. 2023 - Jun. 2027", marginX + maxWidth, y, { align: "right" });
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("GPA: 3.97/4.0", marginX, y);
  y += 4;
  doc.setFont("helvetica", "oblique");
  doc.setFontSize(8);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Relevant coursework: AP Psychology (A), Accounting (A), Principles of Business (A), Law (A), Photography (A)", marginX, y);
  y += 7;

  // 3. EXPERIENCE
  addSectionHeader("EXPERIENCE");

  // The Imperfectionist
  addExperienceHeader("The Imperfectionist - StandOut Connect Program", "Social Media Intern", "Feb. 2026 - Present");
  addBullet("Making multiple creative short-form content ideas for social media to showcase the company’s product");
  addBullet("Designing carousel posts to demonstrate the usability and eco-friendliness of the product to consumers");
  y += 2;

  // Rose Cart Florist
  addExperienceHeader("Rose Cart Florist", "Digital Marketing Intern", "Jan. - Apr. 2026");
  addBullet("Increased social media viewership by 2,317% by designing posts on Canva, adhering to the target market");
  addBullet("Reframed email campaigns and created video content to better engage diverse and younger audiences");
  y += 2;

  // Graystar Design - Event Planner Intern
  addExperienceHeader("Graystar Design", "Event Planner Intern", "Oct. 2025");
  addBullet("Assisted with the execution of a party with 300 attendees to raise brand awareness");
  addBullet("Helped with event setup, including the decoration of 30 tables and organizing assorted platters");
  y += 2;

  // Graystar Design - Pop-Up Shop Intern
  addExperienceHeader("Graystar Design", "Pop-Up Shop Intern", "Dec. 2024");
  addBullet("Collaborated with 6 team members to create a positive shopping experience");
  addBullet("Assisted customers with product selection and provided detailed information");
  y += 2;

  // Patrick Ahrens Campaign
  addExperienceHeader("Patrick Ahrens Campaign", "Political Canvasser", "Aug. - Nov. 2024");
  addBullet("Engaged over 250 community members through door-to-door outreach efforts");
  addBullet("Connected with potential supporters for the candidate's campaign through over 100 phone banking conversations with voters");
  y += 2;

  // Wayground
  addExperienceHeader("Wayground", "Promotional Intern", "Jun. - Aug. 2024");
  addBullet("Identified market trends and customer preferences by analyzing successful marketing campaigns");
  addBullet("Developed strategic plans to enhance brand positioning and market reach, then presented these strategies using Canva presentation");
  y += 4;

  // 4. LEADERSHIP & ACTIVITIES
  addSectionHeader("LEADERSHIP & ACTIVITIES");

  // FBLA
  addExperienceHeader("Future Business Leaders of America, Homestead High School", "Marketing Committee Member", "Feb. - Mar. 2024");
  addBullet("Created three Instagram posts using Canva for Allcove, a mental health service center, to engage teens");
  addBullet("Communicated directly with Allcove for social media guidelines");
  y += 2;

  // Sunnyvale Library Teen Advisory Board
  addExperienceHeader("Sunnyvale Library’s Teen Advisory Board", "Board Member", "Sep. 2025 - Present");
  addBullet("Leading monthly meetings with a leadership team and librarians to share teen voices with the library and create teen events");
  addBullet("Organized a teen event in the library for academic preparation");
  y += 4;

  // 5. SKILLS
  addSectionHeader("SKILLS");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Social Media: ", marginX, y);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("TikTok, Instagram, and Pinterest.", marginX + 22, y);
  y += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Graphic Design: ", marginX, y);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("Canva, Adobe Illustrator, and Wix.", marginX + 22, y);

  // Save the PDF
  doc.save("Rotem_Lubovitch_Resume.pdf");
}
