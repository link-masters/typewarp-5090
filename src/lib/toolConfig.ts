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

  // SOCIAL FONTS
  "instagram-font": {
    controls: [
      {
        id: "mockup",
        label: "Instagram Preview",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "chars",
        label: "Bio Char Counter",
        type: "button",
        defaultValue: false,
      },
    ],
  },
  "discord-font": {
    controls: [
      {
        id: "markdown",
        label: "Markdown Combo",
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
        id: "preview",
        label: "TikTok Screen Mockup",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "safety",
        label: "Caption Safety Check",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  "facebook-font": {
    controls: [
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
  "twitter-font": {
    controls: [
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
        label: "Game Preset",
        type: "select",
        options: [
          { label: "Fortnite", value: "fortnite" },
          { label: "COD", value: "cod" },
          { label: "Valorant", value: "valorant" },
        ],
        defaultValue: "fortnite",
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
