const fs = require("fs");
const path = require("path");

const blogDir = path.join(process.cwd(), "src/content/blog");
const categoriesFile = path.join(process.cwd(), "src/lib/categories.ts");

// We'll generate content based on the tools.
// Ideally we would parse categories.ts, but for the script we'll hardcode the data logic
// to ensure high quality specific content rather than generic loops.

const tools = [
  {
    slug: "cursed-text",
    name: "Cursed Text Generator",
    keywords: [
      "cursed text",
      "zalgo",
      "glitch text",
      "scary font",
      "void text",
    ],
    vibe: "chaos",
    history:
      'The concept of "cursed" text originates from the "Zalgo" internet meme of the late 2000s, where messy Unicode combining characters were used to simulate digital decay.',
    mechanism: "stacking multiple Unicode diacritics vertically",
  },
  {
    slug: "zalgo-text",
    name: "Zalgo Text Generator",
    keywords: [
      "zalgo text",
      "he comes",
      "glitch font",
      "creepypasta",
      "corrupted text",
    ],
    vibe: "horror",
    history:
      "Zalgo is a legend associated with madness and corruption. The text style mimics the visual representation of this corruption leaking into reality.",
    mechanism: "combining diacritical marks that span upwards and downwards",
  },
  {
    slug: "glitch-text",
    name: "Glitch Text Generator",
    keywords: [
      "glitch text",
      "cyberpunk font",
      "vaporwave text",
      "distorted text",
      "static noise",
    ],
    vibe: "tech-dystopia",
    history:
      "Glitch art emerged as an aestheticization of digital errors. It celebrates the artifacts, bugs, and crashes of modern technology.",
    mechanism: "randomizing unicode characters and adding noise symbols",
  },
  {
    slug: "weird-text",
    name: "Weird Text Generator",
    keywords: [
      "weird text",
      "funky font",
      "strange text",
      "unicode tricks",
      "bizarre fonts",
    ],
    vibe: "eccentric",
    history:
      "Weird text exploits the vast diversity of the Unicode standard, pulling symbols from obscure languages and mathematical sets to create alien-looking alphabets.",
    mechanism:
      "replacing Latin characters with look-alikes from other script systems",
  },
  {
    slug: "creepy-text",
    name: "Creepy Text Generator",
    keywords: [
      "creepy text",
      "scary writing",
      "horror font",
      "spooky text",
      "halloween font",
    ],
    vibe: "unsettling",
    history:
      "Used extensively in online horror storytelling (ARGs and Creepypastas) to denote insanity or supernatural communication.",
    mechanism: 'using widely spaced, jagged, or "shaky" looking Unicode glyphs',
  },
  {
    slug: "corrupted-text",
    name: "Corrupted Text Generator",
    keywords: [
      "corrupted text",
      "data rot",
      "bit rot",
      "file corruption",
      "broken text",
    ],
    vibe: "decay",
    history:
      'Simulates the visual effect of "bit rot" or data degradation in storage media, a primal fear of the digital age.',
    mechanism: 'injecting random "noise" characters and broken symbols',
  },
  {
    slug: "demonic-text",
    name: "Demonic Text Generator",
    keywords: [
      "demonic text",
      "satanic font",
      "hellish text",
      "evil writing",
      "dark fantasy",
    ],
    vibe: "evil",
    history:
      'Inspired by representations of possession and ancient evil in pop culture. It mimics the "clawed" or chaotic look of infernal scripts.',
    mechanism:
      "heavy use of sharp, downward-pointing diacritics and Fraktur bases",
  },
  {
    slug: "scary-text",
    name: "Scary Text Generator",
    keywords: [
      "scary text",
      "frightening font",
      "horror typography",
      "fear text",
      "uneasy font",
    ],
    vibe: "fear",
    history:
      'Scary text is about subtle wrongness—the "Uncanny Valley" of typography where letters look almost normal but "off" enough to cause unease.',
    mechanism: "mixing slight distortions with illegible characters",
  },
  {
    slug: "gothic-font",
    name: "Gothic Font Generator",
    keywords: [
      "gothic font",
      "old english",
      "blackletter",
      "medieval font",
      "calligraphy",
    ],
    vibe: "ancient",
    history:
      "Dating back to the 12th century, Blackletter was the script of medieval Europe. Today it signifies tradition, darkness, and authority.",
    mechanism:
      "mapping standard letters to the Mathematical Alphanumeric Symbols block for Fraktur",
  },
  {
    slug: "special-text",
    name: "Special Text Generator",
    keywords: [
      "special text",
      "unicode symbols",
      "fancy chars",
      "hidden characters",
      "text art",
    ],
    vibe: "unique",
    history:
      'Unicode was designed to support all world languages, but it inadvertently created a playground for designers to find "hidden" glyphs.',
    mechanism: "accessing the full 140,000+ character set of Unicode",
  },
  {
    slug: "extra-thicc-text",
    name: "Extra Thicc Text Generator",
    keywords: [
      "thicc text",
      "wide text",
      "bold font",
      "vaporwave wide",
      "fullwidth",
    ],
    vibe: "massive",
    history:
      "Originating from East Asian computing standards (Fullwidth), this style became a meme for emphasis and ironic loudness.",
    mechanism: "converting ASCII to Fullwidth forms (U+FF01 to U+FF5E)",
  },
  {
    slug: "glitter-text",
    name: "Glitter Text Generator",
    keywords: [
      "glitter text",
      "sparkle font",
      "cute text",
      "magic text",
      "starry font",
    ],
    vibe: "magical",
    history:
      "Popularized in the era of MySpace and early forums, glitter text adds a layer of fantasy and decoration to plain communication.",
    mechanism: 'appending "sparkle" diacritics and star symbols',
  },
  {
    slug: "square-text",
    name: "Square Text Generator",
    keywords: [
      "square text",
      "box font",
      "encased text",
      "block font",
      "pixel style",
    ],
    vibe: "rigid",
    history:
      "Reminiscent of old signage, scrabble tiles, and 8-bit user interfaces. It represents order and containment.",
    mechanism:
      "mapping characters to the Enclosed Alphanumeric Supplement block",
  },
];

function generateContent(tool) {
  const intro = `
In the digital landscape, standing out is a war for attention. Every day, billions of messages are sent in the same default fonts: Arial, Helvetica, Roboto. They are clean, functional, and utterly boring. This is where the **${tool.name}** enters the battlefield.

Whether you are a horror writer looking to induce dread, a gamer wanting a username that dominates the lobby, or a social media manager aiming to stop the scroll, standard text is not enough. You need text that carries emotion, texture, and impact.

This comprehensive guide will explore the depths of **${tool.keywords[0]}**, explaining how it works, where to use it, and how to master the art of typographic disruption using TypeWarp.
  `.trim();

  const technical = `
To understand **${tool.name}**, you must first understand the underlying technology: **Unicode**.

Most users assume that the keyboard determines what can be typed. In reality, the keyboard is just a limited interface for a vast library of over 140,000 characters.

${tool.name} works by ${tool.mechanism}. Unlike traditional fonts (like .ttf or .otf files) which change the *design* of the characters but require the user to have the font file installed, our generator uses **Unicode mapping**.

This means we take your input (e.g., "A") and mathematically swap it for a different character that looks like a stylized "A" (e.g., "𝘈" or "𝔸" or "A̶"). Because these are standard text characters, they can be copied and pasted almost anywhere—Instagram bios, Twitter threads, Discord usernames, and more.
  `.trim();

  const history = `
### The Origins of ${tool.vibe.charAt(0).toUpperCase() + tool.vibe.slice(1)} Typography

${tool.history}

In the early days of the internet, users were limited to ASCII—a small set of 128 characters. As the web became global, Unicode was introduced to support every language on Earth. This expansion inadvertently opened the door for creative misuse.

Creators realized that by combining certain marks or using obscure mathematical symbols, they could create text that looked "broken" or "cursed." This was the birth of the aesthetic you see today in the ${tool.name}.
  `.trim();

  const guide = `
### How to Use the ${tool.name} on TypeWarp

We have designed our tool to be the most powerful and customizable on the market. Here is your step-by-step workflow:

1.  **Input Your Text**: Type or paste your desired phrase into the "Input Buffer" on the tool page. The system processes text in real-time.
2.  **Adjust the Parameters**:
    *   **Intensity**: Control how "heavy" the effect is. Lower settings are more readable; higher settings are more chaotic.
    *   **Style Mode**: Toggle between different algorithms (e.g., specific to ${tool.vibe}).
3.  **Preview**: Use our live preview box to see how the text will look.
4.  **Copy**: Hit the "Copy Result" button.
5.  **Deploy**: Paste it into your destination (Discord, TikTok, etc.).

> **Pro Tip:** Combine this tool with our "Decoration" options to add surrounding symbols for extra flair.
  `.trim();

  const useCases = `
### Top Creative Use Cases for ${tool.keywords[0]}

#### 1. Social Media Dominance
On platforms like TikTok and Instagram, the algorithm reads text, but human eyes scan for novelty. A caption written in **${tool.keywords[1]}** creates a "pattern interrupt." When a user is doom-scrolling, the sudden appearance of strange typography forces their brain to pause and process the image, increasing your engagement metrics.

#### 2. Gaming Identity
In competitive games (Valorant, CS:GO, Fortnite), your username is your brand. Using the ${tool.name} allows you to create a handle that looks intimidating or elite. It shows you aren't just a casual player; you understand the culture of the internet.

#### 3. Digital Art & Design
Graphic designers can use this tool to mock up "glitch" aesthetics without needing heavy software like After Effects for simple text layers. It's perfect for album covers, poster art, and brutalist web design.

#### 4. Narrative Storytelling
For writers of fiction—especially horror, sci-fi, or fantasy—typography is a narrative device. Use ${tool.keywords[0]} to represent:
*   Corrupted data logs
*   Alien transmissions
*   Demonic possession
*   System failures
  `.trim();

  const platformSafety = `
### Platform Compatibility & Safety

"Will this text work everywhere?" This is the most common question we get.

**Works Perfectly On:**
*   Twitter / X (Bio, Tweets, Username)
*   Instagram (Bio, Captions, Comments)
*   Discord (Chat, Nicknames, Channel Names)
*   TikTok (Bio, Comments)
*   YouTube (Titles, Descriptions)

**Use With Caution On:**
*   **Official Documents:** Do not use for legal names or banking data.
*   **Screen Readers:** Heavily modified text (like Zalgo or Cursed text) is unreadable to screen readers used by the visually impaired. It will be read as "combining character, combining character..." which is a terrible user experience. **Always provide a plain text version** or use alt text if possible when accessibility is a concern.
  `.trim();

  const faq = `
### Frequently Asked Questions

**Q: Is using ${tool.keywords[0]} free?**
A: Yes, TypeWarp is completely free to use. We believe in open access to digital creativity.

**Q: Can I use this for commercial projects?**
A: Absolutely. The text you generate is just Unicode. You own the creative output and can use it in logos, ads, and merchandise.

**Q: Why does the text sometimes look like boxes (□□□)?**
A: This is called "tofu." It happens when a device or browser is too old to recognize specific Unicode characters. However, 99.9% of modern devices (iPhone, Android, Windows 10/11) support these characters natively.

**Q: Will this get me banned from games?**
A: Generally, no. Most anti-cheat systems ignore text formatting. However, some games may restrict "special characters" in nicknames to prevent confusion. Always check the specific game's naming policy.

**Q: How do I type ${tool.keywords[0]} on a mobile keyboard?**
A: You can't type it directly because standard keyboards don't have these keys. That's why tools like TypeWarp are essential—we map the characters for you.
  `.trim();

  return `---
title: "The Ultimate Guide to ${tool.name}: Mastering ${tool.vibe.charAt(0).toUpperCase() + tool.vibe.slice(1)} Typography"
date: "${new Date().toISOString().split("T")[0]}"
description: "Discover the secrets of the ${tool.name}. Learn how to create ${tool.keywords.join(", ")} for Discord, Instagram, and more with our comprehensive guide."
image: "/blog/${tool.slug}.png"
category: "Dark & Horror"
author: "TypeWarp Team"
tags: [${tool.keywords.map((k) => `"${k}"`).join(", ")}]
---

## Table of Contents
1.  [Introduction](#introduction)
2.  [What is ${tool.name}?](#what-is-${tool.slug})
3.  [History & Origins](#history--origins)
4.  [Why Use ${tool.keywords[0]}?](#why-use-${toSlug(tool.keywords[0])})
5.  [Step-by-Step Guide](#step-by-step-guide)
6.  [Creative Use Cases](#top-creative-use-cases-for-${toSlug(tool.keywords[0])})
7.  [Platform Compatibility](#platform-compatibility--safety)
8.  [FAQ](#frequently-asked-questions)

${intro}

## What is ${tool.name}?

${technical}

## History & Origins

${history}

## Step-by-Step Guide

${guide}

${useCases}

${platformSafety}

${faq}

## Conclusion

The digital world is crowded. To be seen, you must be different. The **${tool.name}** is not just a utility; it is a weapon of expression. It allows you to break the mold of standard typography and assert your identity in a way that is visual, visceral, and impossible to ignore.

Start experimenting today. Warp your text, warp your reality.

[**Try the ${tool.name} Now**](/dark-horror/${tool.slug})
`;
}

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

tools.forEach((tool) => {
  const fileName = `${tool.slug}-guide.mdx`;
  const filePath = path.join(blogDir, fileName);
  const content = generateContent(tool);
  fs.writeFileSync(filePath, content);
  console.log(`Generated enhanced blog: ${fileName}`);
});
