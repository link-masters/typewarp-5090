import { corruptText } from "./cursed";

// Utility maps for simple substitutions
const BOLD_MAP: Record<string, string> = {
  a: "𝐚",
  b: "𝐛",
  c: "𝐜",
  d: "𝐝",
  e: "𝐞",
  f: "𝐟",
  g: "𝐠",
  h: "𝐡",
  i: "𝐢",
  j: "𝐣",
  k: "𝐤",
  l: "𝐥",
  m: "𝐦",
  n: "𝐧",
  o: "𝐨",
  p: "𝐩",
  q: "𝐪",
  r: "𝐫",
  s: "𝐬",
  t: "𝐭",
  u: "𝐮",
  v: "𝐯",
  w: "𝐰",
  x: "𝐱",
  y: "𝐲",
  z: "𝐳",
  A: "𝐀",
  B: "𝐁",
  C: "𝐂",
  D: "𝐃",
  E: "𝐄",
  F: "𝐅",
  G: "𝐆",
  H: "𝐇",
  I: "𝐈",
  J: "𝐉",
  K: "𝐊",
  L: "𝐋",
  M: "𝐌",
  N: "𝐍",
  O: "𝐎",
  P: "𝐏",
  Q: "𝐐",
  R: "𝐑",
  S: "𝐒",
  T: "𝐓",
  U: "𝐔",
  V: "𝐕",
  W: "𝐖",
  X: "𝐗",
  Y: "𝐘",
  Z: "𝐙",
  "0": "𝟎",
  "1": "𝟏",
  "2": "𝟐",
  "3": "𝟑",
  "4": "𝟒",
  "5": "𝟓",
  "6": "𝟔",
  "7": "𝟕",
  "8": "𝟖",
  "9": "𝟗",
};

const SQUARE_MAP: Record<string, string> = {
  a: "🄰",
  b: "🄱",
  c: "🄲",
  d: "🄳",
  e: "🄴",
  f: "🄵",
  g: "🄶",
  h: "🄷",
  i: "🄹",
  j: "🄹",
  k: "🄺",
  l: "🄻",
  m: "🄼",
  n: "🄽",
  o: "🄾",
  p: "🄿",
  q: "🅀",
  r: "🅁",
  s: "🅂",
  t: "🅃",
  u: "🅄",
  v: "🅅",
  w: "🅆",
  x: "🅇",
  y: "🅈",
  z: "🅉",
  A: "🄰",
  B: "🄱",
  C: "🄲",
  D: "🄳",
  E: "🄴",
  F: "🄵",
  G: "🄶",
  H: "🄷",
  I: "🄹",
  J: "🄹",
  K: "🄺",
  L: "🄻",
  M: "🄼",
  N: "🄽",
  O: "🄾",
  P: "🄿",
  Q: "🅀",
  R: "🅁",
  S: "🅂",
  T: "🅃",
  U: "🅄",
  V: "🅅",
  W: "🅆",
  X: "🅇",
  Y: "🅈",
  Z: "🅉",
};

const ITALIC_MAP: Record<string, string> = {
  a: "𝘢",
  b: "𝘣",
  c: "𝘤",
  d: "𝘥",
  e: "𝘦",
  f: "𝘧",
  g: "𝘨",
  h: "𝘩",
  i: "𝘪",
  j: "𝘫",
  k: "𝘬",
  l: "𝘭",
  m: "𝘮",
  n: "𝘯",
  o: "𝘰",
  p: "𝘱",
  q: "𝘲",
  r: "𝘳",
  s: "𝘴",
  t: "𝘵",
  u: "𝘶",
  v: "𝘷",
  w: "𝘸",
  x: "𝘹",
  y: "𝘺",
  z: "𝘻",
  A: "𝘈",
  B: "𝘉",
  C: "𝘊",
  D: "𝘋",
  E: "𝘌",
  F: "𝘍",
  G: "𝘎",
  H: "𝘏",
  I: "𝘐",
  J: "𝘑",
  K: "𝘒",
  L: "𝘓",
  M: "𝘔",
  N: "𝘕",
  O: "𝘖",
  P: "𝘗",
  Q: "𝘘",
  R: "𝘙",
  S: "𝘚",
  T: "𝘛",
  U: "𝘜",
  V: "𝘝",
  W: "𝘞",
  X: "𝘟",
  Y: "𝘠",
  Z: "𝘡",
};

const MONOSPACE_MAP: Record<string, string> = {
  a: "𝚊",
  b: "𝚋",
  c: "𝚌",
  d: "𝚍",
  e: "𝚎",
  f: "𝚏",
  g: "𝘨",
  h: "𝚑",
  i: "𝚒",
  j: "𝚓",
  k: "𝚔",
  l: "𝚕",
  m: "𝚖",
  n: "𝚗",
  o: "𝚘",
  p: "𝚙",
  q: "𝚚",
  r: "𝚛",
  s: "𝚜",
  t: "𝚝",
  u: "𝚞",
  v: "𝚟",
  w: "𝚠",
  x: "𝚡",
  y: "𝚢",
  z: "𝚣",
  A: "𝙰",
  B: "𝙱",
  C: "𝙲",
  D: "𝙳",
  E: "𝙴",
  F: "𝙵",
  G: "𝙶",
  H: "𝙷",
  I: "𝙸",
  J: "𝙹",
  K: "𝙺",
  L: "𝙻",
  M: "𝙼",
  N: "𝙽",
  O: "𝙾",
  P: "𝙿",
  Q: "𝚀",
  R: "𝚁",
  S: "𝚂",
  T: "𝚃",
  U: "𝚄",
  V: "𝚅",
  W: "𝚆",
  X: "𝚇",
  Y: "𝚈",
  Z: "𝚉",
  "0": "𝟶",
  "1": "𝟷",
  "2": "𝟸",
  "3": "𝟹",
  "4": "𝟺",
  "5": "𝟻",
  "6": "𝟼",
  "7": "𝟽",
  "8": "𝟾",
  "9": "𝟿",
};

const BUBBLE_MAP: Record<string, string> = {
  a: "ⓐ",
  b: "ⓑ",
  c: "ⓒ",
  d: "ⓓ",
  e: "ⓔ",
  f: "ⓕ",
  g: "ⓖ",
  h: "ⓗ",
  i: "ⓘ",
  j: "ⓙ",
  k: "ⓚ",
  l: "ⓛ",
  m: "ⓜ",
  n: "ⓝ",
  o: "ⓞ",
  p: "ⓟ",
  q: "ⓠ",
  r: "ⓡ",
  s: "ⓢ",
  t: "ⓣ",
  u: "ⓤ",
  v: "ⓥ",
  w: "ⓦ",
  x: "ⓧ",
  y: "ⓨ",
  z: "ⓩ",
  A: "Ⓐ",
  B: "Ⓑ",
  C: "Ⓒ",
  D: "Ⓓ",
  E: "Ⓔ",
  F: "Ⓕ",
  G: "Ⓖ",
  H: "Ⓗ",
  I: "Ⓘ",
  J: "Ⓙ",
  K: "Ⓚ",
  L: "Ⓛ",
  M: "Ⓜ",
  N: "Ⓝ",
  O: "Ⓞ",
  P: "Ⓟ",
  Q: "Ⓠ",
  R: "Ⓡ",
  S: "Ⓢ",
  T: "Ⓣ",
  U: "Ⓤ",
  V: "Ⓥ",
  W: "Ⓦ",
  X: "Ⓧ",
  Y: "Ⓨ",
  Z: "Ⓩ",
  "0": "⓪",
  "1": "①",
  "2": "②",
  "3": "③",
  "4": "④",
  "5": "⑤",
  "6": "⑥",
  "7": "⑦",
  "8": "⑧",
  "9": "⑨",
};

const GOTHIC_MAP: Record<string, string> = {
  a: "𝖆",
  b: "𝖇",
  c: "𝖈",
  d: "𝖉",
  e: "𝖊",
  f: "𝖋",
  g: "𝖌",
  h: "𝖍",
  i: "𝖎",
  j: "𝖏",
  k: "𝖐",
  l: "𝖑",
  m: "𝖒",
  n: "𝖓",
  o: "𝖔",
  p: "𝖕",
  q: "𝖖",
  r: "𝖗",
  s: "𝖘",
  t: "𝖙",
  u: "𝖚",
  v: "𝖛",
  w: "𝖜",
  x: "𝖝",
  y: "𝖞",
  z: "𝖟",
  A: "𝕬",
  B: "𝕭",
  C: "𝕮",
  D: "𝕯",
  E: "𝕰",
  F: "𝕱",
  G: "𝕲",
  H: "𝕳",
  I: "𝕴",
  J: "𝕵",
  K: "𝕶",
  L: "𝕷",
  M: "𝕸",
  N: "𝕹",
  O: "𝕺",
  P: "𝕻",
  Q: "𝕼",
  R: "𝕽",
  S: "𝕾",
  T: "𝕿",
  U: "𝖀",
  V: "𝖁",
  W: "𝖂",
  X: "𝖃",
  Y: "𝖄",
  Z: "𝖅",
};

const CURSIVE_MAP: Record<string, string> = {
  a: "𝒶",
  b: "𝒷",
  c: "𝒸",
  d: "𝒹",
  e: "𝑒",
  f: "𝒻",
  g: "𝑔",
  h: "𝒽",
  i: "𝒾",
  j: "𝒿",
  k: "𝓀",
  l: "𝓁",
  m: "𝓂",
  n: "𝓃",
  o: "𝑜",
  p: "𝓅",
  q: "𝓆",
  r: "𝓇",
  s: "𝓈",
  t: "𝓉",
  u: "𝓊",
  v: "𝓋",
  w: "𝓌",
  x: "𝓍",
  y: "𝓎",
  z: "𝓏",
  A: "𝒜",
  B: "𝐵",
  C: "𝒞",
  D: "𝒟",
  E: "𝐸",
  F: "𝐹",
  G: "𝒢",
  H: "𝐻",
  I: "𝐼",
  J: "𝒥",
  K: "𝒦",
  L: "𝐿",
  M: "𝑀",
  N: "𝒩",
  O: "𝒪",
  P: "𝒫",
  Q: "𝒬",
  R: "𝑅",
  S: "𝒮",
  T: "𝒯",
  U: "𝒰",
  V: "𝒱",
  W: "𝒲",
  X: "𝒳",
  Y: "𝒴",
  Z: "𝒵",
};

const SUPERSCRIPT_MAP: Record<string, string> = {
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  A: "ᴬ",
  B: "ᴮ",
  D: "ᴰ",
  E: "ᴱ",
  G: "ᴳ",
  H: "ᴴ",
  I: "ᴵ",
  J: "ᴶ",
  K: "ᴷ",
  L: "ᴸ",
  M: "ᴹ",
  N: "ᴺ",
  O: "ᴼ",
  P: "ᴾ",
  R: "ᴿ",
  T: "ᵀ",
  U: "ᵁ",
  V: "ⱽ",
  W: "ᵂ",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};

const MORSE_MAP: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
};

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  A: "∀",
  B: "𐐒",
  C: "Ɔ",
  D: "ᗡ",
  E: "Ǝ",
  F: "Ⅎ",
  G: "⅁",
  H: "H",
  I: "I",
  J: "ſ",
  K: "⋊",
  L: "˥",
  M: "W",
  N: "N",
  O: "O",
  P: "Ԁ",
  Q: "Ò",
  R: "ᴚ",
  S: "S",
  T: "⊥",
  U: "∩",
  V: "Λ",
  W: "M",
  X: "X",
  Y: "⅄",
  Z: "Z",
  "?": "¿",
  "!": "¡",
  ".": "˙",
  _: "‾",
};

const FLIP_TEXT_MAP: Record<string, string> = {
  a: "ɒ",
  b: "d",
  c: "ɔ",
  d: "b",
  e: "ɘ",
  f: "ʇ",
  g: "b",
  h: "ʜ",
  i: "i",
  j: "Ⴑ",
  k: "ʞ",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  p: "q",
  q: "p",
  r: "ɿ",
  s: "ƨ",
  t: "t",
  u: "u",
  v: "v",
  w: "w",
  x: "x",
  y: "y",
  z: "ƹ",
  A: "A",
  B: "ᙠ",
  C: "Ɔ",
  D: "ᗡ",
  E: "Ǝ",
  F: "ꟻ",
  G: "Ә",
  H: "H",
  I: "I",
  J: "Ⴑ",
  K: "⋊",
  L: "⅃",
  M: "M",
  N: "Ͷ",
  O: "O",
  P: "ꟼ",
  Q: "Ọ",
  R: "Я",
  S: "Ƨ",
  T: "T",
  U: "U",
  V: "V",
  W: "W",
  X: "X",
  Y: "Y",
  Z: "Ƨ",
};

function mapChars(text: string, map: Record<string, string>): string {
  return text
    .split("")
    .map((char) => {
      if (map[char]) return map[char];
      if (char.toLowerCase() !== char && map[char.toLowerCase()])
        return map[char.toLowerCase()];
      if (char.toUpperCase() !== char && map[char.toUpperCase()])
        return map[char.toUpperCase()];
      return char;
    })
    .join("");
}

function toBinary(
  text: string,
  bitMode: string = "8",
  showPrefix: boolean = false,
): string {
  const bits = parseInt(bitMode) || 8;
  const prefix = showPrefix ? "0b" : "";
  return text
    .split("")
    .map((char) => prefix + char.charCodeAt(0).toString(2).padStart(bits, "0"))
    .join(" ");
}

function toHex(text: string): string {
  return text
    .split("")
    .map((char) =>
      char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"),
    )
    .join(" ");
}

function toBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    return "Error: Unsupported characters";
  }
}

function reverseText(text: string): string {
  return text.split("").reverse().join("");
}

function toBraille(text: string, showIndicator: boolean = true): string {
  const brailleMap: Record<string, string> = {
    a: "⠁",
    b: "⠃",
    c: "⠉",
    d: "⠙",
    e: "⠑",
    f: "⠋",
    g: "⠛",
    h: "⠓",
    i: "⠊",
    j: "⠚",
    k: "⠅",
    l: "⠇",
    m: "⠍",
    n: "⠝",
    o: "⠕",
    p: "⠏",
    q: "⠟",
    r: "⠗",
    s: "⠎",
    t: "⠞",
    u: "⠥",
    v: "⠧",
    w: "⠺",
    x: "⠭",
    y: "⠽",
    z: "⠵",
    " ": "⠀",
    "0": "⠴",
    "1": "⠂",
    "2": "⠆",
    "3": "⠒",
    "4": "⠲",
    "5": "⠢",
    "6": "⠖",
    "7": "⠶",
    "8": "⠦",
    "9": "⠔",
    ".": "⠲",
    ",": "⠂",
    ";": "⠆",
    ":": "⠒",
    "!": "⠖",
    "?": "⠦",
    "(": "⠶",
    ")": "⠶",
    "-": "⠤",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      if (/[0-9]/.test(char) && showIndicator) return "⠼" + brailleMap[char];
      return brailleMap[char] || char;
    })
    .join("");
}

const RUNIC_MAP: Record<string, string> = {
  a: "ᚨ",
  b: "ᛒ",
  c: "ᚲ",
  d: "ᛞ",
  e: "ᛖ",
  f: "ᚠ",
  g: "ᚷ",
  h: "ᚻ",
  i: "ᛁ",
  j: "ᛃ",
  k: "ᚲ",
  l: "ᛚ",
  m: "ᛗ",
  n: "ᚾ",
  o: "ᛟ",
  p: "ᛈ",
  q: "ᚲ",
  r: "ᚱ",
  s: "ᛊ",
  t: "ᛏ",
  u: "ᚢ",
  v: "ᚠ",
  w: "ᚹ",
  x: "ᚲᛊ",
  y: "ᛁ",
  z: "ᛉ",
};

function toWingdings(text: string): string {
  const map: Record<string, string> = {
    a: "✌︎",
    b: "👌︎",
    c: "👍︎",
    d: "👎︎",
    e: "👈︎",
    f: "👉︎",
    g: "👆︎",
    h: "👇︎",
    i: "✋︎",
    j: "☺︎",
    k: "😐︎",
    l: "☹︎",
    m: "💣︎",
    n: "☠︎",
    o: "⚐︎",
    p: "⚑︎",
    q: "✉︎",
    r: "✂︎",
    s: "✁︎",
    t: "👓︎",
    u: "⌛︎",
    v: "⌨︎",
    w: "🖱︎",
    x: "🖨︎",
    y: "📁︎",
    z: "📂︎",
    A: "✌︎",
    B: "👌︎",
    C: "👍︎",
    D: "👎︎",
    E: "👈︎",
    F: "👉︎",
    G: "👆︎",
    H: "👇︎",
    I: "✋︎",
    J: "☺︎",
    K: "😐︎",
    L: "☹︎",
    M: "💣︎",
    N: "☠︎",
    O: "⚐︎",
    P: "⚑︎",
    Q: "✉︎",
    R: "✂︎",
    S: "✁︎",
    T: "👓︎",
    U: "⌛︎",
    V: "⌨︎",
    W: "🖱︎",
    X: "🖨︎",
    Y: "📁︎",
    Z: "📂︎",
    "0": "📁︎",
    "1": "📂︎",
    "2": "📄︎",
    "3": "📅︎",
    "4": "📦︎",
    "5": "📫︎",
    "6": "📬︎",
    "7": "📪︎",
    "8": "📪︎",
    "9": "📪︎",
  };
  return mapChars(text, map);
}

function toSignLanguage(text: string): string {
  const map: Record<string, string> = {
    a: "👌",
    b: "✋",
    c: "🤏",
    d: "☝️",
    e: "✊",
    f: "👌",
    g: "🫵",
    h: "🤘",
    i: "☝️",
    j: "⤴️",
    k: "🖖",
    l: "🤙",
    m: "✋",
    n: "✋",
    o: "👌",
    p: "🤏",
    q: "🫵",
    r: "🤞",
    s: "✊",
    t: "✊",
    u: "✌️",
    v: "✌️",
    w: "🤟",
    x: "☝️",
    y: "🤙",
    z: "👉",
    " ": "  ",
  };
  return mapChars(text.toLowerCase(), map);
}

function generateAsciiArt(text: string, font: string = "std"): string {
  const fonts: Record<string, Record<string, string[]>> = {
    std: {
      a: ["  ___  ", " / _ \\ ", "| |_| |", "|  _  |", "| | | |", "  _  _ "],
      b: [
        " | __ ) ",
        " |  _ \\ ",
        " | |_) |",
        " |  _ < ",
        " | |_) |",
        " |____/ ",
      ],
      c: [
        "  ____  ",
        " / ___| ",
        "| |     ",
        "| |___  ",
        " \\____| ",
        "        ",
      ],
      d: [
        " |  _ \\ ",
        " | | | |",
        " | | | |",
        " | |_| |",
        " |____/ ",
        "        ",
      ],
    },
  };

  if (font === "cyber") {
    return `
    ▟▛ ▟▛ ▟▛ ▟▛
    ▜▙ ▜▙ ▜▙ ▜▙
    ${text.toUpperCase()}
    ▟▛ ▟▛ ▟▛ ▟▛
    ▜▙ ▜▙ ▜▙ ▜▙`;
  }

  return `
   _____  
  |  __ \\ 
  | |__) |
  |  _  / 
  | | \\ \\ 
  |_|  \\_\\
  ${text.toUpperCase()}`;
}

// Main transformation logic
export interface TransformOptions {
  intensity?: number;
  spacing?: number;
  uppercase?: boolean;
  style?: string;
  decoration?: string;
  customSettings?: Record<string, any>;
}

export function transformText(
  text: string,
  slug: string,
  options: TransformOptions = {},
): string {
  if (!text) return "";

  const {
    intensity = 5,
    spacing = 1,
    uppercase = false,
    style = "default",
    decoration = "",
    customSettings = {},
  } = options;

  let workingText = uppercase ? text.toUpperCase() : text;

  const s = slug.toLowerCase();

  switch (s) {
    case "cursed-text":
    case "corrupted-text":
      return corruptText(workingText, customSettings.intensity || intensity);
    case "zalgo-text": {
      const { up, middle, down, intensity: customIntensity } = customSettings;
      const finalIntensity = customIntensity || intensity;

      if (up !== undefined || middle !== undefined || down !== undefined) {
        return corruptText(workingText, finalIntensity, {
          up: up ?? 0,
          middle: middle ?? 0,
          down: down ?? 0,
        });
      }
      return corruptText(workingText, finalIntensity);
    }
    case "demonic-text":
      return corruptText(
        mapChars(workingText, GOTHIC_MAP),
        Math.ceil((customSettings.intensity || intensity) / 1.5),
      );
    case "scary-text":
      return corruptText(
        mapChars(workingText, GOTHIC_MAP),
        Math.ceil(
          (customSettings.intensity || intensity || customSettings.fear) / 3,
        ),
      );
    case "glitch-text": {
      const gType = customSettings.glitchType || "digital";
      const finalIntensity = customSettings.intensity || intensity;
      return workingText
        .split("")
        .map((c) => {
          if (gType === "static" && Math.random() < 0.2) return "░";
          if (gType === "vhs" && Math.random() < 0.1) return "▓";
          return corruptText(c, Math.ceil(finalIntensity / 4));
        })
        .join("");
    }
    case "weird-text":
    case "creepy-text": {
      // Mix of styles for "weird" feel
      const weirdLevel =
        customSettings.level || customSettings.creepiness || intensity;
      return workingText
        .split("")
        .map((c, i) => {
          if (i % 3 === 0) return mapChars(c, GOTHIC_MAP);
          if (i % 3 === 1) return mapChars(c, BOLD_MAP);
          return corruptText(c, Math.ceil(weirdLevel / 2));
        })
        .join("");
    }
    case "gothic-font":
    case "old-english":
      return mapChars(workingText, GOTHIC_MAP);
    case "special-text":
    case "extra-thicc-text":
      return mapChars(workingText, BOLD_MAP);
    case "glitter-text":
      return workingText.split("").join(decoration || "✨");

    // Text Tools & Formatting
    case "bold-text": {
      const isItalic = customSettings.italic || false;
      const baseBold = mapChars(workingText, BOLD_MAP);
      if (isItalic) {
        // We don't have a bold-italic map, so we can only do one or the other or overlay
        // For now, let's just use bold as it's the primary tool
        return baseBold;
      }
      return baseBold;
    }
    case "italic-text":
      return mapChars(workingText, ITALIC_MAP);
    case "underline-text":
      return workingText
        .split("")
        .map((c) => c + "\u0332")
        .join(""); // Combining Low Line
    case "strikethrough-text": {
      const strikeType = customSettings.type || "center";
      let strikeChar = "\u0336"; // center default

      if (strikeType === "high") strikeChar = "\u0305"; // overline
      if (strikeType === "low") strikeChar = "\u0332"; // underline

      // Handle the 'double' toggle separately or if needed
      if (customSettings.double) strikeChar = "\u0337"; // short solidus overlay

      return workingText
        .split("")
        .map((c) => c + strikeChar)
        .join("");
    }
    case "upside-down-text":
      return mapChars(workingText, UPSIDE_DOWN_MAP)
        .split("")
        .reverse()
        .join(""); // Upside down usually reversed too
    case "mirror-text":
      return mapChars(workingText, FLIP_TEXT_MAP).split("").reverse().join("");
    case "small-text":
    case "tiny-text":
      return mapChars(workingText, SUPERSCRIPT_MAP); // Close approximation
    case "big-text": {
      const gap = parseInt(customSettings.gap || spacing);
      return workingText.toUpperCase().split("").join(" ".repeat(gap));
    }
    case "reverse-text":
      return reverseText(workingText);
    case "sentence-case":
      return (
        workingText.charAt(0).toUpperCase() + workingText.slice(1).toLowerCase()
      );
    case "space-remover":
      return workingText.replace(/\s+/g, "");
    case "text-cleaner":
      return workingText.replace(/[^\w\s]/gi, "");
    case "character-counter":
      return `Length: ${workingText.length} characters`;
    case "invisible-character":
      return "‎"; // Zero width space
    case "superscript":
      return mapChars(workingText, SUPERSCRIPT_MAP);

    // Style & Fancy
    case "bubble-text":
      return mapChars(workingText, BUBBLE_MAP);
    case "wide-text":
    case "vaporwave-text":
    case "aesthetic-text": {
      const sVal = customSettings.width ?? spacing;
      const wideSpace = " ".repeat(sVal);
      return workingText
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          if (code >= 33 && code <= 126) {
            return String.fromCharCode(code + 0xfee0);
          }
          return c;
        })
        .join(wideSpace);
    }
    case "square-text":
      return mapChars(workingText, SQUARE_MAP);
    case "fancy-font":
    case "stylish-font":
    case "instagram-font":
    case "cute-font": {
      const base = mapChars(workingText, CURSIVE_MAP);
      const density = customSettings.density || 0;
      const symbols = ["✨", "🌸", "✧", "❀", "★"];
      if (density > 0) {
        return base
          .split("")
          .map((c) => {
            return Math.random() < density * 0.1
              ? c + symbols[Math.floor(Math.random() * symbols.length)]
              : c;
          })
          .join("");
      }
      return base;
    }
    case "aesthetic-font": {
      const vibe = customSettings.vibe || "vaporwave";
      if (vibe === "vaporwave") {
        // Reuse wide text logic
        const wideSpace = " ";
        return workingText
          .split("")
          .map((c) => {
            const code = c.charCodeAt(0);
            if (code >= 33 && code <= 126) {
              return String.fromCharCode(code + 0xfee0);
            }
            return c;
          })
          .join(wideSpace);
      }
      if (vibe === "grunge") return corruptText(workingText, 2);
      if (vibe === "dark") return mapChars(workingText, GOTHIC_MAP);
      return mapChars(workingText, CURSIVE_MAP); // 'soft' default
    }
    case "calligraphy-font":
    case "cursive-font":
      return mapChars(workingText, CURSIVE_MAP);

    // Translators
    case "morse-code": {
      const sep =
        customSettings.separator === "slash"
          ? " / "
          : customSettings.separator === "pipe"
            ? " | "
            : "   ";
      return workingText
        .toUpperCase()
        .split("")
        .map((c) => MORSE_MAP[c] || c)
        .join(" ")
        .replace(/\/\s\//g, sep);
    }
    case "binary":
      return toBinary(
        workingText,
        customSettings.bits || "8",
        customSettings.prefix || false,
      );
    case "base64":
      return toBase64(workingText);
    case "hex-code":
      return toHex(workingText);
    case "wingdings":
      return toWingdings(workingText);
    case "runic":
      return mapChars(workingText, RUNIC_MAP);
    case "braille":
      return toBraille(workingText, customSettings.showIndicator ?? true);
    case "sign-language":
      return toSignLanguage(workingText);
    case "ascii-art":
      return generateAsciiArt(workingText, customSettings.font || "std");

    // Socials (mapping generic styles to tool names)
    case "discord-font":
      return "`" + workingText + "`"; // Code block
    case "twitter-font":
      return mapChars(workingText, BOLD_MAP);
    case "tiktok-font":
      return mapChars(workingText, BUBBLE_MAP);
    case "facebook-font": {
      const fbMode = customSettings.mode || "post";
      if (fbMode === "bio") return mapChars(workingText, ITALIC_MAP);
      if (fbMode === "comment") return mapChars(workingText, MONOSPACE_MAP);
      return mapChars(workingText, BOLD_MAP); // 'post' default
    }
    case "gaming-font": {
      const game = customSettings.game || "fortnite";
      if (game === "cod") return mapChars(workingText, MONOSPACE_MAP); // Tactical
      if (game === "valorant")
        return mapChars(workingText.toUpperCase(), BOLD_MAP); // Sharp/Bold
      return mapChars(workingText, BOLD_MAP); // Fortnite default
    }
    case "fortnite-font":
      return mapChars(workingText, BOLD_MAP);

    case "text-symbols": {
      const syms = [
        "★",
        "✦",
        "✡",
        "❄",
        "♫",
        "✈",
        "☺",
        "☹",
        "♠️",
        "♣️",
        "♥️",
        "♦️",
      ];
      const b1 = syms[Math.floor(Math.random() * syms.length)];
      const b2 = syms[Math.floor(Math.random() * syms.length)];
      return `${b1} ${workingText} ${b2}`;
    }
    case "aesthetic-symbols": {
      const aes = [
        "✧",
        "☾",
        "☁",
        "☂",
        "☃",
        "☮",
        "☯",
        "🦋",
        "🌸",
        "✨",
        "🪐",
        "🐚",
      ];
      const a1 = aes[Math.floor(Math.random() * aes.length)];
      const a2 = aes[Math.floor(Math.random() * aes.length)];
      return `${a1} ${workingText} ${a2}`;
    }
    case "special-characters":
      return `® ${workingText} ™`;
    case "text-emoticons": {
      const emos = [
        "ʕ•ᴥ•ʔ",
        "(ง'̀-'́)ง",
        "¯\\_(ツ)_/¯",
        "(ᵔᴥᵔ)",
        "(¬‿¬)",
        "(づ｡◕‿‿◕｡)づ",
      ];
      const e1 = emos[Math.floor(Math.random() * emos.length)];
      return `${e1} ${workingText}`;
    }
    case "lenny-face":
      return `( ͡° ͟ʖ ͡°) ${workingText} ( ͡° ͟ʖ ͡°)`;

    // Default fallback
    default:
      // Check if "cursed" or similar in name, default to corrupt
      const finalIntensity = customSettings.intensity || intensity;
      if (slug.includes("cursed") || slug.includes("horror"))
        return corruptText(workingText, finalIntensity);
      return workingText;
  }
}
