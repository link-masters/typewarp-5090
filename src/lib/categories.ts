export interface Tool {
  name: string;
  slug: string;
  icon?: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
  description: string;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    name: "Dark & Horror",
    slug: "dark-horror",
    count: 13,
    icon: "💀",
    description: "Unleash chaos with cursed, zalgo, and glitch text",
    tools: [
      { name: "Cursed Text Generator", slug: "cursed-text", icon: "👻" },
      { name: "Zalgo Text Generator", slug: "zalgo-text", icon: "🔯" },
      { name: "Glitch Text Generator", slug: "glitch-text", icon: "⚡" },
      { name: "Weird Text Generator", slug: "weird-text", icon: "👾" },
      { name: "Creepy Text Generator", slug: "creepy-text", icon: "🕷️" },
      { name: "Corrupted Text Generator", slug: "corrupted-text", icon: "💥" },
      { name: "Demonic Text Generator", slug: "demonic-text", icon: "😈" },
      { name: "Scary Text Generator", slug: "scary-text", icon: "🎃" },
      { name: "Gothic Font Generator", slug: "gothic-font", icon: "🦇" },
      { name: "Special Text Generator", slug: "special-text", icon: "✨" },
      {
        name: "Extra Thicc Text Generator",
        slug: "extra-thicc-text",
        icon: "💪",
      },
      { name: "Glitter Text Generator", slug: "glitter-text", icon: "✨" },
      { name: "Square Text Generator", slug: "square-text", icon: "⬛" },
    ],
  },
  {
    name: "Social Fonts",
    slug: "social-fonts",
    count: 8,
    icon: "📱",
    description: "Perfect fonts for Instagram, Discord, TikTok & more",
    tools: [
      { name: "Instagram Font Generator", slug: "instagram-font", icon: "📷" },
      { name: "Discord Font Generator", slug: "discord-font", icon: "💬" },
      { name: "TikTok Font Generator", slug: "tiktok-font", icon: "🎵" },
      { name: "Facebook Font Generator", slug: "facebook-font", icon: "👍" },
      { name: "Twitter Font Generator", slug: "twitter-font", icon: "🐦" },
      { name: "Gaming Font Generator", slug: "gaming-font", icon: "🎮" },
      { name: "Fortnite Font Generator", slug: "fortnite-font", icon: "🎯" },
      { name: "Clan Tag Generator", slug: "clan-tag", icon: "🏷️" }, // Added for 404
      { name: "Fancy Font Generator", slug: "fancy-font", icon: "💎" }, // Added to fix 404
    ],
  },
  {
    name: "Style & Fancy",
    slug: "style-fancy",
    count: 13,
    icon: "✨",
    description: "Aesthetic, vaporwave, and stylish text designs",
    tools: [
      { name: "Fancy Font Generator", slug: "fancy-font", icon: "💎" },
      { name: "Aesthetic Font Generator", slug: "aesthetic-font", icon: "🌸" },
      { name: "Stylish Font Generator", slug: "stylish-font", icon: "👑" },
      { name: "Vaporwave Text Generator", slug: "vaporwave-text", icon: "🌊" },
      { name: "Aesthetic Text Generator", slug: "aesthetic-text", icon: "🦋" },
      { name: "Cute Font Generator", slug: "cute-font", icon: "🐰" },
      {
        name: "Calligraphy Font Generator",
        slug: "calligraphy-font",
        icon: "🖋️",
      },
      { name: "Cursive Font Generator", slug: "cursive-font", icon: "📝" },
      { name: "Bubble Text Generator", slug: "bubble-text", icon: "🫧" },
      { name: "Wide Text Generator", slug: "wide-text", icon: "↔️" },
      { name: "Scary Text Generator", slug: "scary-text", icon: "🎃" }, // Added duplication for 404
      { name: "Monospace Text Generator", slug: "monospace-text", icon: "💻" }, // Added for 404
      { name: "Premium Font Generator", slug: "premium-font", icon: "💎" }, // Added for 404
      {
        name: "Typewriter Font Generator",
        slug: "typewriter-font",
        icon: "⌨️",
      }, // Added for 404
    ],
  },
  {
    name: "Text Tools",
    slug: "text-tools",
    count: 21,
    icon: "🔧",
    description: "Essential text formatting and manipulation tools",
    tools: [
      { name: "Bold Text Generator", slug: "bold-text", icon: "𝐁" },
      { name: "Italic Text Generator", slug: "italic-text", icon: "𝐼" },
      { name: "Underline Text Generator", slug: "underline-text", icon: "U̲" },
      {
        name: "Strikethrough Text Generator",
        slug: "strikethrough-text",
        icon: "S̶",
      },
      { name: "Small Text Generator", slug: "small-text", icon: "ˢ" },
      { name: "Tiny Text Generator", slug: "tiny-text", icon: "ᵗ" },
      { name: "Big Text Generator", slug: "big-text", icon: "🔠" },
      { name: "Superscript Generator", slug: "superscript", icon: "ˣ" },
      {
        name: "Upside Down Text Generator",
        slug: "upside-down-text",
        icon: "🙃",
      },
      { name: "Mirror Text Generator", slug: "mirror-text", icon: "🪞" },
      { name: "Space Remover", slug: "space-remover", icon: "🗜️" },
      { name: "Text Cleaner", slug: "text-cleaner", icon: "🧹" },
      { name: "Sentence Case Converter", slug: "sentence-case", icon: "Aa" },
      { name: "Character Counter", slug: "character-counter", icon: "🔢" },
      { name: "Invisible Character", slug: "invisible-character", icon: "👁️" },
      { name: "Box Text Generator", slug: "box-text", icon: "📦" }, // Added for 404
      { name: "Sparkle Text Generator", slug: "sparkle-text", icon: "✨" }, // Added for 404
      { name: "Slashed Text Generator", slug: "slashed-text", icon: "🗡️" }, // Added for 404
      {
        name: "Aggressive Text Generator",
        slug: "aggressive-text",
        icon: "😤",
      }, // Added for 404
      { name: "Playful Text Generator", slug: "playful-text", icon: "🤹" }, // Added for 404
      { name: "Glitter Text Generator", slug: "glitter-text", icon: "✨" }, // Added duplication for 404
    ],
  },
  {
    name: "Symbols",
    slug: "symbols",
    count: 8,
    icon: "🔣",
    description: "Special characters, emoticons, and symbols",
    tools: [
      { name: "Text Symbols", slug: "text-symbols", icon: "♠️" },
      { name: "Aesthetic Symbols", slug: "aesthetic-symbols", icon: "✧" },
      { name: "Special Characters", slug: "special-characters", icon: "※" },
      { name: "Text Emoticons", slug: "text-emoticons", icon: "ʕ•ᴥ•ʔ" },
      { name: "Lenny Face Generator", slug: "lenny-face", icon: "( ͡° ͜ʖ ͡°)" },
      { name: "Combat Symbols", slug: "combat-symbols", icon: "⚔️" }, // Added for 404
      { name: "Mirror Symbols", slug: "mirror-symbols", icon: "🪞" }, // Added for 404
      { name: "Tech Symbols", slug: "tech-symbols", icon: "💾" }, // Added for 404
    ],
  },
  {
    name: "Translators",
    slug: "translators",
    count: 16,
    icon: "🌐",
    description: "Convert text to morse, binary, braille & more",
    tools: [
      { name: "Morse Code Translator", slug: "morse-code", icon: "•−" },
      { name: "Braille Translator", slug: "braille", icon: "⠃" },
      { name: "Binary Converter", slug: "binary", icon: "01" },
      { name: "Hex Converter", slug: "hex-code", icon: "⬡" },
      { name: "Base64 Encoder", slug: "base64", icon: "📦" },
      { name: "Reverse Text", slug: "reverse-text", icon: "◀" },
      { name: "Caesar Cipher", slug: "caesar-cipher", icon: "🏛️" },
      { name: "Rot13 Translator", slug: "rot13", icon: "🔄" },
      { name: "NATO Phonetic Alphabet", slug: "nato-phonetic", icon: "✈️" },
      { name: "Atbash Cipher", slug: "atbash", icon: "📜" },
      { name: "Leetspeak Generator", slug: "leetspeak", icon: "1337" },
      { name: "Wingdings Translator", slug: "wingdings", icon: "✈" },
      { name: "Runic Translator", slug: "runic", icon: "ᚱ" },
      { name: "Old English Translator", slug: "old-english", icon: "Ꝋ" },
      { name: "Sign Language Translator", slug: "sign-language", icon: "🤟" },
      { name: "ASCII Art Generator", slug: "ascii-art", icon: "🎨" },
    ],
  },
];

export const TOTAL_TOOLS_COUNT = categories.reduce(
  (acc, cat) => acc + cat.tools.length,
  0,
);

export const ALL_TOOLS = categories.flatMap((cat) =>
  cat.tools.map((tool) => ({ ...tool, categorySlug: cat.slug })),
);
