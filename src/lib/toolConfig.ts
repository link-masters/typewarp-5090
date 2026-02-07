export interface ToolControl {
  id: string;
  label: string;
  type: "slider" | "toggle" | "select" | "button";
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
  defaultValue: any;
}

export interface ToolConfig {
  controls: ToolControl[];
}

export const toolConfigs: Record<string, ToolConfig> = {
  // FONT DATA
  // -------------------------------------------------------------------------

  // Social Fonts (Discord, Twitter, etc)
  social_fonts_list: null as any, // Placeholder if needed

  // DARK & HORROR

  "cursed-text": {
    controls: [
      {
        id: "intensity",
        label: "Curse Intensity",
        type: "slider",
        min: 1,
        max: 20,
        defaultValue: 5,
      },
      {
        id: "randomize",
        label: "Randomize Position",
        type: "toggle",
        defaultValue: true,
      },
      {
        id: "animate",
        label: "Animate Curse",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "zalgo-text": {
    controls: [
      {
        id: "up",
        label: "Zalgo Up",
        type: "slider",
        min: 0,
        max: 15,
        defaultValue: 5,
      },
      {
        id: "middle",
        label: "Zalgo Middle",
        type: "slider",
        min: 0,
        max: 15,
        defaultValue: 2,
      },
      {
        id: "down",
        label: "Zalgo Down",
        type: "slider",
        min: 0,
        max: 15,
        defaultValue: 5,
      },
      {
        id: "chaos",
        label: "Chaos Randomizer",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "glitch-text": {
    controls: [
      {
        id: "glitchType",
        label: "Glitch Type",
        type: "select",
        options: [
          { label: "Digital", value: "digital" },
          { label: "VHS", value: "vhs" },
          { label: "Static", value: "static" },
        ],
        defaultValue: "digital",
      },
      {
        id: "scanlines",
        label: "Scanline Overlay",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "weird-text": {
    controls: [
      {
        id: "level",
        label: "Weirdness Level",
        type: "slider",
        min: 1,
        max: 10,
        defaultValue: 5,
      },
      {
        id: "mix",
        label: "Mix Multiple Fonts",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "creepy-text": {
    controls: [
      {
        id: "creepiness",
        label: "Creepiness Meter",
        type: "slider",
        min: 1,
        max: 10,
        defaultValue: 5,
      },
      {
        id: "shadow",
        label: "Shadow Characters",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "corrupted-text": {
    controls: [
      {
        id: "intensity",
        label: "Corruption Level",
        type: "slider",
        min: 1,
        max: 20,
        defaultValue: 10,
      },
      {
        id: "recursive",
        label: "Recursive Corruption",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "scary-text": {
    controls: [
      {
        id: "fear",
        label: "Fear Factor",
        type: "slider",
        min: 1,
        max: 10,
        defaultValue: 5,
      },
      {
        id: "shake",
        label: "Shake Animation",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "demonic-text": {
    controls: [
      {
        id: "darkness",
        label: "Darkness Level",
        type: "slider",
        min: 1,
        max: 10,
        defaultValue: 5,
      },
      {
        id: "invertedCross",
        label: "Inverted Cross Symbols",
        type: "toggle",
        defaultValue: true,
      },
      {
        id: "demonicStyle",
        label: "Demonic Style",
        type: "select",
        options: [
          { label: "Dark Gothic", value: "gothic" },
          { label: "Hellfire", value: "hellfire" },
          { label: "Abyss", value: "abyss" },
        ],
        defaultValue: "gothic",
      },
    ],
  },
  "gothic-font": {
    controls: [
      {
        id: "gothicStyle",
        label: "Gothic Style",
        type: "select",
        options: [
          { label: "Classic Fraktur", value: "fraktur" },
          { label: "Bold Fraktur", value: "boldFraktur" },
          { label: "Medieval", value: "medieval" },
        ],
        defaultValue: "fraktur",
      },
      {
        id: "ornaments",
        label: "Add Ornaments",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "special-text": {
    controls: [
      {
        id: "specialStyle",
        label: "Special Style",
        type: "select",
        options: [
          { label: "Mixed Symbols", value: "mixed" },
          { label: "Sparkle Magic", value: "sparkle" },
          { label: "Star Power", value: "stars" },
          { label: "Heart Deco", value: "hearts" },
        ],
        defaultValue: "mixed",
      },
      {
        id: "density",
        label: "Symbol Density",
        type: "slider",
        min: 1,
        max: 5,
        defaultValue: 2,
      },
    ],
  },
  "extra-thicc-text": {
    controls: [
      {
        id: "thiccStyle",
        label: "Thicc Style",
        type: "select",
        options: [
          { label: "Bold Serif", value: "serifBold" },
          { label: "Bold Sans", value: "sansBold" },
          { label: "Extra Wide", value: "fullwidth" },
          { label: "Double Struck", value: "doubleStruck" },
        ],
        defaultValue: "serifBold",
      },
      {
        id: "spacing",
        label: "Letter Spacing",
        type: "slider",
        min: 0,
        max: 3,
        defaultValue: 1,
      },
    ],
  },
  "glitter-text": {
    controls: [
      {
        id: "glitterStyle",
        label: "Glitter Style",
        type: "select",
        options: [
          { label: "Sparkle ✨", value: "sparkle" },
          { label: "Stars ⭐", value: "stars" },
          { label: "Diamonds 💎", value: "diamonds" },
          { label: "Rainbow 🌈", value: "rainbow" },
        ],
        defaultValue: "sparkle",
      },
      {
        id: "intensity",
        label: "Glitter Intensity",
        type: "slider",
        min: 1,
        max: 5,
        defaultValue: 2,
      },
    ],
  },
  "square-text": {
    controls: [
      {
        id: "squareStyle",
        label: "Square Style",
        type: "select",
        options: [
          { label: "Outlined Squares", value: "outlined" },
          { label: "Filled Squares", value: "filled" },
          { label: "Negative Squares", value: "negative" },
        ],
        defaultValue: "outlined",
      },
    ],
  },

  // SOCIAL FONTS
  "instagram-font": {
    controls: [
      {
        id: "style",
        label: "Font Style",
        type: "select",
        options: [
          { label: "Bold", value: "sansBold" },
          { label: "Italic", value: "sansItalic" },
          { label: "Monospace", value: "monospace" },
          { label: "Script", value: "script" },
          { label: "Outline", value: "doubleStruck" },
          { label: "Bubble", value: "bubble" },
          { label: "Squares", value: "squared" },
          { label: "Fancy", value: "fraktur" },
          { label: "Wide", value: "fullwidth" },
        ],
        defaultValue: "sansBold",
      },
      {
        id: "mockup",
        label: "Instagram Preview",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "discord-font": {
    controls: [
      {
        id: "fontStyle",
        label: "Font Style",
        type: "select",
        options: [
          { label: "Fraktur", value: "fraktur" },
          { label: "Bold Fraktur", value: "boldFraktur" },
          { label: "Mixed Fancy", value: "mixedFancy" },
          { label: "Bold Script", value: "boldScript" },
          { label: "Script / Cursive", value: "script" },
          { label: "Double-Struck", value: "doubleStruck" },
          { label: "Fullwidth", value: "fullwidth" },
          { label: "Decorated Cursive", value: "decoratedCursive" },
          { label: "Small Caps", value: "smallCaps" },
          { label: "Upside Down", value: "upsideDown" },
          { label: "Keycap", value: "keycap" },
          { label: "Square Overlay", value: "squareOverlay" },
          { label: "Squared Latin", value: "squared" },
          { label: "Mirror / Reverse", value: "mirror" },
          { label: "Zalgo / Glitch", value: "zalgo" },
          { label: "Negative Squared", value: "invertedSquared" },
          { label: "Subscript", value: "subscript" },
          { label: "Superscript", value: "superscript" },
          { label: "Circled", value: "circled" },
          { label: "Serif Bold", value: "serifBold" },
          { label: "Sans-Serif Bold", value: "sansBold" },
          { label: "Sans-Serif Italic", value: "sansItalic" },
          { label: "Sans-Serif Bold Italic", value: "sansBoldItalic" },
          { label: "Monospace", value: "monospace" },
          { label: "Bubble / Metallic", value: "bubble" },
          { label: "Wingdings", value: "wingdings" },
        ],
        defaultValue: "fraktur",
      },
      {
        id: "markdown",
        label: "Markdown Code Block",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "spoiler",
        label: "Spoiler Tag",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "tiktok-font": {
    controls: [
      {
        id: "style",
        label: "Font Style",
        type: "select",
        options: [
          { label: "Classic Bold", value: "serifBold" },
          { label: "Typewriter", value: "monospace" },
          { label: "Neon", value: "fullwidth" },
          { label: "Handwriting", value: "script" },
          { label: "Comic", value: "sansBold" },
          { label: "Serif", value: "serifBold" },
        ],
        defaultValue: "serifBold",
      },
      {
        id: "preview",
        label: "TikTok Screen Mockup",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "facebook-font": {
    controls: [
      {
        id: "style",
        label: "Font Style",
        type: "select",
        options: [
          { label: "Bold", value: "sansBold" },
          { label: "Italic", value: "sansItalic" },
          { label: "Monospace", value: "monospace" },
          { label: "Script", value: "script" },
          { label: "Bubble", value: "bubble" },
        ],
        defaultValue: "sansBold",
      },
      {
        id: "mode",
        label: "Platform Mode",
        type: "select",
        options: [
          { label: "Post", value: "post" },
          { label: "Comment", value: "comment" },
          { label: "Bio", value: "bio" },
        ],
        defaultValue: "post",
      },
    ],
  },
  "fortnite-font": {
    controls: [
      {
        id: "style",
        label: "Style",
        type: "select",
        options: [
          { label: "Regular", value: "sansBold" },
          { label: "Italic", value: "sansBoldItalic" },
          { label: "Clean", value: "sans" },
        ],
        defaultValue: "sansBold",
      },
    ],
  },
  "twitter-font": {
    controls: [
      {
        id: "fontStyle",
        label: "Font Style",
        type: "select",
        options: [
          { label: "Fraktur", value: "fraktur" },
          { label: "Bold Fraktur", value: "boldFraktur" },
          { label: "Script / Cursive", value: "script" },
          { label: "Bold Script", value: "boldScript" },
          { label: "Double-Struck", value: "doubleStruck" },
          { label: "Fullwidth", value: "fullwidth" },
          { label: "Sans-Serif Bold", value: "sansBold" },
          { label: "Sans-Serif Italic", value: "sansItalic" },
          { label: "Sans-Serif Bold Italic", value: "sansBoldItalic" },
          { label: "Monospace", value: "monospace" },
          { label: "Small Caps", value: "smallCaps" },
          { label: "Bubble", value: "bubble" },
          { label: "Decorated", value: "decoratedCursive" },
          { label: "Zalgo", value: "zalgo" },
          { label: "Underline", value: "underline" },
          { label: "Strikethrough", value: "strikethrough" },
          { label: "Slashed", value: "shortStrike" },
          { label: "Circular", value: "circled" },
          { label: "Squared", value: "squared" },
          { label: "Inverted Square", value: "invertedSquared" },
        ],
        defaultValue: "sansBold",
      },
      {
        id: "thread",
        label: "Thread Mode",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "limit",
        label: "280 Char Checker",
        type: "button",
        defaultValue: false,
      },
    ],
  },
  "gaming-font": {
    controls: [
      {
        id: "game",
        label: "Game / Style",
        type: "select",
        options: [
          // Retro
          { label: "Retro: Press Start 2P", value: "retro_press" },
          { label: "Retro: VCR OSD", value: "retro_vcr" },
          { label: "Retro: Joystix", value: "retro_joy" },
          { label: "Retro: Arcade Classic", value: "retro_arcade" },
          // Esports
          { label: "Esports: Bebas Neue", value: "esports_bebas" },
          { label: "Esports: Rajdhani", value: "esports_raj" },
          { label: "Esports: Teko", value: "esports_teko" },
          { label: "Esports: Bungee", value: "esports_bungee" },
          // Sci-Fi
          { label: "Sci-Fi: Orbitron", value: "scifi_orb" },
          { label: "Sci-Fi: Audiowide", value: "scifi_audio" },
          { label: "Sci-Fi: Exo", value: "scifi_exo" },
          { label: "Sci-Fi: Electrolize", value: "scifi_elec" },
          // Horror
          { label: "Horror: Creepster", value: "horror_creep" },
          { label: "Horror: Nosifer", value: "horror_nos" },
          { label: "Horror: Glitch", value: "horror_glitch" },
          // Fantasy
          { label: "Fantasy: Cinzel", value: "fantasy_cinzel" },
          { label: "Fantasy: Medieval", value: "fantasy_med" },
          // Specific
          { label: "Game: Minecraft", value: "game_mine" },
          { label: "Game: Pokemon", value: "game_poke" },
          { label: "Game: Fortnite", value: "game_fort" },
          { label: "Game: GTA Style", value: "game_gta" },
          { label: "Game: COD Style", value: "game_cod" },
        ],
        defaultValue: "game_fort",
      },
    ],
  },

  // STYLE & FANCY
  "fancy-font": {
    controls: [
      {
        id: "fancy_level",
        label: "Fancy Level",
        type: "slider",
        min: 1,
        max: 10,
        defaultValue: 5,
      },
      {
        id: "density",
        label: "Ornament Density",
        type: "slider",
        min: 1,
        max: 5,
        defaultValue: 2,
      },
    ],
  },
  "aesthetic-font": {
    controls: [
      {
        id: "vibe",
        label: "Aesthetic Vibe",
        type: "select",
        options: [
          { label: "Vaporwave", value: "vaporwave" },
          { label: "Soft", value: "soft" },
          { label: "Grunge", value: "grunge" },
          { label: "Dark", value: "dark" },
        ],
        defaultValue: "vaporwave",
      },
    ],
  },
  "vaporwave-text": {
    controls: [
      {
        id: "width",
        label: "Width Percentage",
        type: "slider",
        min: 1,
        max: 5,
        defaultValue: 1,
      },
      {
        id: "palette",
        label: "80s/90s Palette",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "bubble-text": {
    controls: [
      {
        id: "type",
        label: "Bubble Type",
        type: "select",
        options: [
          { label: "Outlined", value: "out" },
          { label: "Filled", value: "fill" },
          { label: "3D", value: "3d" },
        ],
        defaultValue: "out",
      },
    ],
  },
  "stylish-font": {
    controls: [
      {
        id: "stylishStyle",
        label: "Stylish Style",
        type: "select",
        options: [
          { label: "Royal Script", value: "script" },
          { label: "Elegant Serif", value: "serifBold" },
          { label: "Modern Sans", value: "sansBold" },
          { label: "Double-Struck", value: "doubleStruck" },
        ],
        defaultValue: "script",
      },
      {
        id: "decorations",
        label: "Add Decorations",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "aesthetic-text": {
    controls: [
      {
        id: "width",
        label: "Width Percentage",
        type: "slider",
        min: 1,
        max: 5,
        defaultValue: 1,
      },
      {
        id: "aestheticStyle",
        label: "Aesthetic Style",
        type: "select",
        options: [
          { label: "Vaporwave", value: "vaporwave" },
          { label: "Soft", value: "soft" },
          { label: "Grunge", value: "grunge" },
        ],
        defaultValue: "vaporwave",
      },
    ],
  },
  "cute-font": {
    controls: [
      {
        id: "cuteStyle",
        label: "Cute Style",
        type: "select",
        options: [
          { label: "Kawaii", value: "kawaii" },
          { label: "Bubbly", value: "bubbly" },
          { label: "Sweet", value: "sweet" },
          { label: "Sparkle", value: "sparkle" },
        ],
        defaultValue: "kawaii",
      },
      {
        id: "emoticons",
        label: "Add Emoticons",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "calligraphy-font": {
    controls: [
      {
        id: "calligraphyStyle",
        label: "Calligraphy Style",
        type: "select",
        options: [
          { label: "Elegant Script", value: "script" },
          { label: "Bold Script", value: "boldScript" },
          { label: "Italic Serif", value: "serifItalic" },
          { label: "Brush Style", value: "brush" },
        ],
        defaultValue: "script",
      },
      {
        id: "flourishes",
        label: "Add Flourishes",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "cursive-font": {
    controls: [
      {
        id: "cursiveStyle",
        label: "Cursive Style",
        type: "select",
        options: [
          { label: "Classic Script", value: "script" },
          { label: "Bold Script", value: "boldScript" },
          { label: "Italic Serif", value: "serifItalic" },
          { label: "Handwritten", value: "handwritten" },
        ],
        defaultValue: "script",
      },
    ],
  },
  "wide-text": {
    controls: [
      {
        id: "width",
        label: "Width Percentage",
        type: "slider",
        min: 1,
        max: 5,
        defaultValue: 1,
      },
      {
        id: "fullwidth",
        label: "Use Fullwidth Characters",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },

  // TEXT TOOLS
  "bold-text": {
    controls: [
      {
        id: "intensity",
        label: "Bold Weight",
        type: "select",
        options: [
          { label: "Medium", value: "medium" },
          { label: "Extra", value: "extra" },
          { label: "Ultra", value: "ultra" },
        ],
        defaultValue: "medium",
      },
      {
        id: "italic",
        label: "Combine with Italic",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "strikethrough-text": {
    controls: [
      {
        id: "position",
        label: "Line Position",
        type: "select",
        options: [
          { label: "Center", value: "center" },
          { label: "High", value: "high" },
          { label: "Low", value: "low" },
        ],
        defaultValue: "center",
      },
      {
        id: "double",
        label: "Double Strike",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "small-text": {
    controls: [
      {
        id: "mode",
        label: "Size Mode",
        type: "select",
        options: [
          { label: "Subscript", value: "sub" },
          { label: "Superscript", value: "super" },
          { label: "Tiny", value: "tiny" },
        ],
        defaultValue: "tiny",
      },
    ],
  },
  "upside-down-text": {
    controls: [
      {
        id: "angle",
        label: "Rotation Angle",
        type: "select",
        options: [
          { label: "180°", value: "180" },
          { label: "90°", value: "90" },
          { label: "270°", value: "270" },
        ],
        defaultValue: "180",
      },
      {
        id: "mirror",
        label: "Mirror Combo",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "italic-text": {
    controls: [
      {
        id: "style",
        label: "Italic Style",
        type: "select",
        options: [
          { label: "Standard", value: "standard" },
          { label: "Serif", value: "serif" },
          { label: "Sans-Serif", value: "sans" },
        ],
        defaultValue: "standard",
      },
      {
        id: "bold",
        label: "Combine with Bold",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "underline-text": {
    controls: [
      {
        id: "style",
        label: "Underline Style",
        type: "select",
        options: [
          { label: "Single", value: "single" },
          { label: "Double", value: "double" },
          { label: "Wavy", value: "wavy" },
        ],
        defaultValue: "single",
      },
    ],
  },
  "tiny-text": {
    controls: [
      {
        id: "type",
        label: "Tiny Type",
        type: "select",
        options: [
          { label: "Superscript", value: "super" },
          { label: "Subscript", value: "sub" },
          { label: "Small Caps", value: "smallcaps" },
        ],
        defaultValue: "super",
      },
    ],
  },
  "big-text": {
    controls: [
      {
        id: "gap",
        label: "Letter Spacing",
        type: "slider",
        min: 1,
        max: 5,
        defaultValue: 1,
      },
      {
        id: "style",
        label: "Style",
        type: "select",
        options: [
          { label: "Uppercase", value: "upper" },
          { label: "Bold", value: "bold" },
          { label: "Wide", value: "wide" },
        ],
        defaultValue: "upper",
      },
    ],
  },
  superscript: {
    controls: [
      {
        id: "mode",
        label: "Mode",
        type: "select",
        options: [
          { label: "Math Style", value: "math" },
          { label: "Text Style", value: "text" },
        ],
        defaultValue: "math",
      },
    ],
  },
  "mirror-text": {
    controls: [
      {
        id: "direction",
        label: "Mirror Direction",
        type: "select",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
          { label: "Both", value: "both" },
        ],
        defaultValue: "horizontal",
      },
    ],
  },
  "space-remover": {
    controls: [
      {
        id: "mode",
        label: "Removal Mode",
        type: "select",
        options: [
          { label: "All Spaces", value: "all" },
          { label: "Extra Spaces Only", value: "extra" },
          { label: "Leading/Trailing", value: "trim" },
        ],
        defaultValue: "all",
      },
    ],
  },
  "text-cleaner": {
    controls: [
      {
        id: "cleanType",
        label: "Clean Type",
        type: "select",
        options: [
          { label: "Remove Special Chars", value: "special" },
          { label: "Remove Numbers", value: "numbers" },
          { label: "Remove Punctuation", value: "punctuation" },
          { label: "Clean All", value: "all" },
        ],
        defaultValue: "special",
      },
      {
        id: "preserveSpaces",
        label: "Preserve Spaces",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "sentence-case": {
    controls: [
      {
        id: "caseType",
        label: "Case Type",
        type: "select",
        options: [
          { label: "Sentence Case", value: "sentence" },
          { label: "Title Case", value: "title" },
          { label: "Lowercase", value: "lower" },
          { label: "Uppercase", value: "upper" },
          { label: "Alternating", value: "alternating" },
        ],
        defaultValue: "sentence",
      },
    ],
  },
  "character-counter": {
    controls: [
      {
        id: "showDetails",
        label: "Show Detailed Stats",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "invisible-character": {
    controls: [
      {
        id: "charType",
        label: "Invisible Character Type",
        type: "select",
        options: [
          { label: "Zero Width Space", value: "zwsp" },
          { label: "Zero Width Joiner", value: "zwj" },
          { label: "Hair Space", value: "hair" },
          { label: "Invisible Separator", value: "separator" },
        ],
        defaultValue: "zwsp",
      },
      {
        id: "count",
        label: "Characters to Add",
        type: "slider",
        min: 1,
        max: 10,
        defaultValue: 1,
      },
    ],
  },

  // SYMBOLS
  "text-symbols": {
    controls: [
      {
        id: "category",
        label: "Symbol Category",
        type: "select",
        options: [
          { label: "All Symbols", value: "all" },
          { label: "Arrows", value: "arrows" },
          { label: "Stars", value: "stars" },
          { label: "Hearts", value: "hearts" },
          { label: "Math", value: "math" },
          { label: "Currency", value: "currency" },
        ],
        defaultValue: "all",
      },
      {
        id: "density",
        label: "Symbol Density",
        type: "slider",
        min: 1,
        max: 10,
        defaultValue: 5,
      },
    ],
  },
  "aesthetic-symbols": {
    controls: [
      {
        id: "style",
        label: "Aesthetic Style",
        type: "select",
        options: [
          { label: "Sparkle ✧", value: "sparkle" },
          { label: "Celestial ☆", value: "celestial" },
          { label: "Floral ❀", value: "floral" },
          { label: "Mystical ✦", value: "mystical" },
        ],
        defaultValue: "sparkle",
      },
      {
        id: "wrap",
        label: "Wrap Text",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "special-characters": {
    controls: [
      {
        id: "charType",
        label: "Character Type",
        type: "select",
        options: [
          { label: "Decorative", value: "decorative" },
          { label: "Technical", value: "technical" },
          { label: "Legal", value: "legal" },
          { label: "Musical", value: "musical" },
        ],
        defaultValue: "decorative",
      },
      {
        id: "spacing",
        label: "Add Spacing",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "text-emoticons": {
    controls: [
      {
        id: "mood",
        label: "Emoticon Mood",
        type: "select",
        options: [
          { label: "Happy ◕‿◕", value: "happy" },
          { label: "Sad ಥ_ಥ", value: "sad" },
          { label: "Angry ಠ_ಠ", value: "angry" },
          { label: "Cute ʕ•ᴥ•ʔ", value: "cute" },
          { label: "Shrug ¯\\_(ツ)_/¯", value: "shrug" },
        ],
        defaultValue: "happy",
      },
      {
        id: "addBefore",
        label: "Add Before Text",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "lenny-face": {
    controls: [
      {
        id: "lennyStyle",
        label: "Lenny Style",
        type: "select",
        options: [
          { label: "Classic ( ͡° ͜ʖ ͡°)", value: "classic" },
          { label: "Surprised ( ͡ᵔ ͜ʖ ͡ᵔ)", value: "surprised" },
          { label: "Wink ( ͡~ ͜ʖ ͡°)", value: "wink" },
          { label: "Flipped ( ͜。 ͡ʖ ͜。)", value: "flipped" },
          { label: "Bear ʕ ͡° ͜ʖ ͡°ʔ", value: "bear" },
        ],
        defaultValue: "classic",
      },
      {
        id: "position",
        label: "Position",
        type: "select",
        options: [
          { label: "Before Text", value: "before" },
          { label: "After Text", value: "after" },
          { label: "Both Sides", value: "both" },
        ],
        defaultValue: "after",
      },
    ],
  },

  // TRANSLATORS
  "morse-code": {
    controls: [
      {
        id: "separator",
        label: "Word Separator",
        type: "select",
        options: [
          { label: "Slash ( / )", value: "slash" },
          { label: "Pipe ( | )", value: "pipe" },
          { label: "Space (   )", value: "space" },
        ],
        defaultValue: "slash",
      },
    ],
  },
  wingdings: {
    controls: [
      {
        id: "style",
        label: "Wingdings Style",
        type: "select",
        options: [
          { label: "Classic", value: "classic" },
          { label: "Webdings", value: "webdings" },
          { label: "Symbols", value: "symbols" },
        ],
        defaultValue: "classic",
      },
      {
        id: "spacing",
        label: "Add Spacing",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  runic: {
    controls: [
      {
        id: "alphabet",
        label: "Runic Alphabet",
        type: "select",
        options: [
          { label: "Elder Futhark", value: "elder" },
          { label: "Younger Futhark", value: "younger" },
          { label: "Anglo-Saxon", value: "anglosaxon" },
        ],
        defaultValue: "elder",
      },
      {
        id: "medieval",
        label: "Medieval Style",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "old-english": {
    controls: [
      {
        id: "era",
        label: "Era Style",
        type: "select",
        options: [
          { label: "Anglo-Saxon", value: "anglosaxon" },
          { label: "Medieval", value: "medieval" },
          { label: "Shakespearean", value: "shakespearean" },
        ],
        defaultValue: "medieval",
      },
      {
        id: "addThorn",
        label: "Use Thorn (þ)",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "sign-language": {
    controls: [
      {
        id: "format",
        label: "Display Format",
        type: "select",
        options: [
          { label: "Hand Emojis", value: "emoji" },
          { label: "Letter Codes", value: "codes" },
          { label: "Descriptions", value: "descriptions" },
        ],
        defaultValue: "emoji",
      },
      {
        id: "separator",
        label: "Separator",
        type: "select",
        options: [
          { label: "Space", value: "space" },
          { label: "Dash", value: "dash" },
          { label: "None", value: "none" },
        ],
        defaultValue: "space",
      },
    ],
  },
  braille: {
    controls: [
      {
        id: "showIndicator",
        label: "Number Indicators",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  binary: {
    controls: [
      {
        id: "bits",
        label: "Bit Depth",
        type: "select",
        options: [
          { label: "8-bit", value: "8" },
          { label: "16-bit", value: "16" },
        ],
        defaultValue: "8",
      },
      {
        id: "prefix",
        label: "Show 0b Prefix",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  "ascii-art": {
    controls: [
      {
        id: "font",
        label: "Art Style",
        type: "select",
        options: [
          { label: "Standard", value: "std" },
          { label: "3D Block", value: "3d" },
          { label: "Cyber", value: "cyber" },
        ],
        defaultValue: "std",
      },
    ],
  },
};
