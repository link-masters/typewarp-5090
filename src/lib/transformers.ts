import { corruptText } from "./cursed";
import { UNICODE_MAPS } from "./fontMappings";

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

// Helper to apply advanced styles
function applyFontStyle(text: string, style: string): string {
  // Check imported maps first
  if (UNICODE_MAPS[style]) {
    return mapChars(text, UNICODE_MAPS[style]);
  }

  // Fallback / Custom Logic
  switch (style) {
    case "smallCaps":
      return mapChars(text.toLowerCase(), UNICODE_MAPS.smallCaps || {}); // Ensure smallCaps is in map or handle here
    case "upsideDown":
      return mapChars(text, UPSIDE_DOWN_MAP).split("").reverse().join("");
    case "mirror":
      return mapChars(text, FLIP_TEXT_MAP).split("").reverse().join("");
    case "zalgo":
    case "glitch":
      return corruptText(text, 10);
    case "subscript":
      return mapChars(text, SUBSCRIPT_MAP);
    case "superscript":
      return mapChars(text, SUPERSCRIPT_MAP);
    case "bubble":
      return mapChars(text, BUBBLE_MAP);
    case "strikethrough":
      return text
        .split("")
        .map((c) => c + "\u0336")
        .join("");
    case "underline":
      return text
        .split("")
        .map((c) => c + "\u0332")
        .join("");
    case "doubleUnderline":
      return text
        .split("")
        .map((c) => c + "\u0333")
        .join("");
    case "shortStrike":
      return text
        .split("")
        .map((c) => c + "\u0337")
        .join("");
    case "tildeStrike":
      return text
        .split("")
        .map((c) => c + "\u0334")
        .join("");
    case "tildeAbove":
      return text
        .split("")
        .map((c) => c + "\u0303")
        .join("");
    case "crossBelow":
      return text
        .split("")
        .map((c) => c + "\u0353")
        .join("");
    case "hearts":
      return text.split("").join(" ♥ ");
    case "sparkle":
      return text.split("").join(" ✨ ");
    case "wavy":
      return text.split("").join(" 〰 ");
    case "wingdings":
      return toWingdings(text);
    case "mixedFancy":
      return text
        .split("")
        .map((c, i) =>
          i % 2 === 0
            ? mapChars(c, UNICODE_MAPS.fraktur)
            : mapChars(c, UNICODE_MAPS.script),
        )
        .join("");

    // Gaming Presets (Mapped)
    case "retro_press":
    case "retro_vcr":
    case "retro_joy":
    case "retro_arcade":
    case "scifi_elec":
    case "scifi_exo": // exo is sans italic usually
    case "game_mine":
    case "game_cod":
      return mapChars(text, MONOSPACE_MAP);

    case "esports_bebas":
    case "esports_teko":
    case "esports_bungee":
    case "esports_raj":
    case "game_fort":
    case "game_gta":
    case "sansBold":
      return mapChars(text, BOLD_MAP); // Closest to Sans Bold Universal

    case "game_poke":
      return mapChars(text, UNICODE_MAPS.doubleStruck);

    case "esports_industry":
      return mapChars(text, ITALIC_MAP); // Industry is techy

    case "scifi_orb":
    case "scifi_audio":
      return mapChars(text, UNICODE_MAPS.fullwidth);

    case "horror_creep":
    case "horror_nos":
    case "fantasy_med":
      return mapChars(text, UNICODE_MAPS.fraktur);

    case "fantasy_cinzel":
      return mapChars(text, UNICODE_MAPS.serifBold);

    case "horror_glitch":
      return corruptText(text, 15);

    default:
      return text;
  }
}

// ... (Keep existing maps below for fallback compatibility)
// We will simply define SUBSCRIPT_MAP here
const SUBSCRIPT_MAP: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  a: "ₐ",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
};

// ... Include original maps here so we don't break simple refs ...
// (I will assume BOLD_MAP, MONOSPACE_MAP etc are available in closure because I'm replacing the end of file, but I should be careful)
// Actually I am replacing lines 1200-1286 mostly (switch cases), but I need to make sure maps are available.
// The tool `replace_file_content` replaces a BLOCK.
// I will scroll up to see where BOLD_MAP is defined. It is defined at the top.
// My replacement will likely start around line 858 to keep maps and replace helper functions?
// PROPER PLAN:
// 1. I will replace `function transformText` ... to the end.
// 2. I will ADD `applyFontStyle` before it or inside.

// Let's refine the replacement to targeting `transformText`.

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

  // Social & Gaming Enhanced Logic
  if (s === "discord-font") {
    const fontStyle = customSettings.fontStyle || "fraktur";
    let result = applyFontStyle(workingText, fontStyle);

    if (customSettings.spoiler) result = `||${result}||`;
    if (customSettings.markdown) {
      // Basic markdown combo based on font? Or just bold/italic wrapper?
      // User said "Markdown combo", implying `***text***`.
      // Let's wrap it in bold italic markdown.
      result = `***${result}***`;
    }
    return result;
  }

  if (s === "twitter-font") {
    const fontStyle = customSettings.fontStyle || "sansBold";
    let result = applyFontStyle(workingText, fontStyle);

    if (customSettings.thread) {
      // Split into 280 char chunks (simple implementation)
      const chunks = result.match(/.{1,280}/g) || [result];
      return chunks
        .map((c, i) => `${c} [${i + 1}/${chunks.length}]`)
        .join("\n\n---\n\n");
    }
    return result;
  }

  if (s === "gaming-font") {
    const gameStyle = customSettings.game || "game_fort";
    return applyFontStyle(workingText, gameStyle);
  }

  if (s === "fortnite-font") {
    // User specifically complained about format.
    // We map it to "sansBold" (Burbank-ish)
    return applyFontStyle(workingText, "sansBold");
  }

  // ... Original switch for other tools ...
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
    case "scary-text":
    case "gothic-font":
    case "old-english":
      return mapChars(workingText, GOTHIC_MAP);

    case "glitch-text": {
      // ... existing glitch logic ...
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

    // ... keep other existing cases ...
    // Reuse applyFontStyle for social mappings that overlap
    case "instagram-font":
      // User reported "Mistake in Preview".
      // The font logic itself is usually Script or Sans.
      // We will map it to what the standard Instagram tool expects (usually variety, but defaults to Script/Bold)
      // I'll leave the original logic OR use applyFontStyle if I can mapping 'instagram' to something.
      // Original logic was mapChars(CURSIVE_MAP) + decorations.
      const base = mapChars(workingText, CURSIVE_MAP);
      const density = customSettings.density || 0;
      const symbols = ["✨", "🌸", "✧", "❀", "★"];
      if (density > 0) {
        return base
          .split("")
          .map((c) =>
            Math.random() < density * 0.1
              ? c + symbols[Math.floor(Math.random() * symbols.length)]
              : c,
          )
          .join("");
      }
      return base;

    case "bold-text":
      return mapChars(workingText, BOLD_MAP);
    case "italic-text":
      return mapChars(workingText, ITALIC_MAP);
    case "underline-text":
      return workingText
        .split("")
        .map((c) => c + "\u0332")
        .join("");
    case "strikethrough-text":
      return workingText
        .split("")
        .map((c) => c + "\u0336")
        .join("");
    case "upside-down-text":
      return mapChars(workingText, UPSIDE_DOWN_MAP)
        .split("")
        .reverse()
        .join("");
    case "mirror-text":
      return mapChars(workingText, FLIP_TEXT_MAP).split("").reverse().join("");
    case "small-text":
    case "tiny-text":
    case "superscript":
      return mapChars(workingText, SUPERSCRIPT_MAP);
    case "big-text":
      return workingText
        .toUpperCase()
        .split("")
        .join(" ".repeat(parseInt(customSettings.gap || spacing)));
    case "reverse-text":
      return reverseText(workingText);
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
          return code >= 33 && code <= 126
            ? String.fromCharCode(code + 0xfee0)
            : c;
        })
        .join(wideSpace);
    }

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
    case "hex-code":
      return toHex(workingText);
    case "base64":
      return toBase64(workingText);
    case "wingdings":
      return toWingdings(workingText);
    case "braille":
      return toBraille(workingText, customSettings.showIndicator ?? true);
    case "sign-language":
      return toSignLanguage(workingText);
    case "ascii-art":
      return generateAsciiArt(workingText, customSettings.font || "std");

    // Defaults
    default:
      // Fallbacks
      if (slug.includes("weird") || slug.includes("creepy")) {
        // simple mix
        return workingText
          .split("")
          .map((c, i) => (i % 2 ? mapChars(c, GOTHIC_MAP) : c))
          .join("");
      }
      if (slug.includes("special")) return mapChars(workingText, BOLD_MAP);
      return workingText;
  }
}
