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
  const upperText = text.toUpperCase();

  if (font === "3d") {
    // 3D Block style
    const block3dChars: Record<string, string[]> = {
      A: ["▄█▄", "█▀█", "▀ ▀"],
      B: ["██▄", "█▄█", "██▀"],
      C: ["▄█▄", "█  ", "▀█▀"],
      D: ["██▄", "█ █", "██▀"],
      E: ["███", "█▄ ", "███"],
      F: ["███", "█▄ ", "█  "],
      G: ["▄██", "█ ▄", "▀██"],
      H: ["█ █", "███", "█ █"],
      I: ["███", " █ ", "███"],
      J: ["  █", "  █", "██▀"],
      K: ["█▄▀", "██ ", "█ █"],
      L: ["█  ", "█  ", "███"],
      M: ["█▄█", "█▀█", "█ █"],
      N: ["██▄", "█ █", "█ █"],
      O: ["▄█▄", "█ █", "▀█▀"],
      P: ["██▄", "█▀ ", "█  "],
      Q: ["▄█▄", "█ █", "▀█▄"],
      R: ["██▄", "█▀▄", "█ █"],
      S: ["▄██", "▀█▄", "██▀"],
      T: ["███", " █ ", " █ "],
      U: ["█ █", "█ █", "▀█▀"],
      V: ["█ █", "█ █", " ▀ "],
      W: ["█ █", "█▄█", "█▀█"],
      X: ["█ █", " ▀ ", "█ █"],
      Y: ["█ █", " █ ", " █ "],
      Z: ["██▄", " ▄▀", "███"],
      " ": ["   ", "   ", "   "],
    };

    const lines = ["", "", ""];
    for (const char of upperText) {
      const art = block3dChars[char] || block3dChars[" "];
      lines[0] += art[0] + " ";
      lines[1] += art[1] + " ";
      lines[2] += art[2] + " ";
    }
    return lines.join("\n");
  }

  if (font === "cyber") {
    // Cyber/futuristic style
    const cyberChars: Record<string, string[]> = {
      A: ["╔═╗", "╠═╣", "╩ ╩"],
      B: ["╔╗ ", "╠╩╗", "╚═╝"],
      C: ["╔═╗", "║  ", "╚═╝"],
      D: ["╔╦╗", " ║║", "═╩╝"],
      E: ["╔═╗", "╠╣ ", "╚═╝"],
      F: ["╔═╗", "╠╣ ", "╚  "],
      G: ["╔═╗", "║ ╦", "╚═╝"],
      H: ["╦ ╦", "╠═╣", "╩ ╩"],
      I: ["╦", "║", "╩"],
      J: [" ╦", " ║", "╚╝"],
      K: ["╦╔╗", "╠╩╝", "╩ ╚"],
      L: ["╦  ", "║  ", "╩═╝"],
      M: ["╔╦╗", "║║║", "╩ ╩"],
      N: ["╔╗╔", "║║║", "╝╚╝"],
      O: ["╔═╗", "║ ║", "╚═╝"],
      P: ["╔═╗", "╠═╝", "╩  "],
      Q: ["╔═╗", "║ ║", "╚═╬"],
      R: ["╔═╗", "╠╦╝", "╩╚═"],
      S: ["╔═╗", "╚═╗", "╚═╝"],
      T: ["╔╦╗", " ║ ", " ╩ "],
      U: ["╦ ╦", "║ ║", "╚═╝"],
      V: ["╦  ╦", "╚╗╔╝", " ╚╝ "],
      W: ["╦ ╦", "║║║", "╚╩╝"],
      X: ["╔╗╔", "╚╬╝", "╔╩╗"],
      Y: ["╦ ╦", "╚╦╝", " ╩ "],
      Z: ["╔═╗", "╔═╝", "╚══"],
      " ": ["   ", "   ", "   "],
    };

    const lines = ["", "", ""];
    for (const char of upperText) {
      const art = cyberChars[char] || cyberChars[" "];
      lines[0] += art[0] + " ";
      lines[1] += art[1] + " ";
      lines[2] += art[2] + " ";
    }
    return (
      "┌" +
      "─".repeat(lines[0].length) +
      "┐\n" +
      "│ " +
      lines[0] +
      "│\n" +
      "│ " +
      lines[1] +
      "│\n" +
      "│ " +
      lines[2] +
      "│\n" +
      "└" +
      "─".repeat(lines[0].length) +
      "┘"
    );
  }

  // Standard ASCII art
  const stdChars: Record<string, string[]> = {
    A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
    B: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██████╔╝", "╚═════╝ "],
    C: [" ██████╗", "██╔════╝", "██║     ", "██║     ", "╚██████╗", " ╚═════╝"],
    D: ["██████╗ ", "██╔══██╗", "██║  ██║", "██║  ██║", "██████╔╝", "╚═════╝ "],
    E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
    F: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "██║     ", "╚═╝     "],
    G: [
      " ██████╗ ",
      "██╔════╝ ",
      "██║  ███╗",
      "██║   ██║",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    H: ["██╗  ██╗", "██║  ██║", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
    I: ["██╗", "██║", "██║", "██║", "██║", "╚═╝"],
    J: ["     ██╗", "     ██║", "     ██║", "██   ██║", "╚█████╔╝", " ╚════╝ "],
    K: ["██╗  ██╗", "██║ ██╔╝", "█████╔╝ ", "██╔═██╗ ", "██║  ██╗", "╚═╝  ╚═╝"],
    L: ["██╗     ", "██║     ", "██║     ", "██║     ", "███████╗", "╚══════╝"],
    M: [
      "███╗   ███╗",
      "████╗ ████║",
      "██╔████╔██║",
      "██║╚██╔╝██║",
      "██║ ╚═╝ ██║",
      "╚═╝     ╚═╝",
    ],
    N: [
      "███╗   ██╗",
      "████╗  ██║",
      "██╔██╗ ██║",
      "██║╚██╗██║",
      "██║ ╚████║",
      "╚═╝  ╚═══╝",
    ],
    O: [
      " ██████╗ ",
      "██╔═══██╗",
      "██║   ██║",
      "██║   ██║",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    P: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔═══╝ ", "██║     ", "╚═╝     "],
    Q: [
      " ██████╗ ",
      "██╔═══██╗",
      "██║   ██║",
      "██║▄▄ ██║",
      "╚██████╔╝",
      " ╚══▀▀═╝ ",
    ],
    R: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██║  ██║", "╚═╝  ╚═╝"],
    S: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
    T: [
      "████████╗",
      "╚══██╔══╝",
      "   ██║   ",
      "   ██║   ",
      "   ██║   ",
      "   ╚═╝   ",
    ],
    U: [
      "██╗   ██╗",
      "██║   ██║",
      "██║   ██║",
      "██║   ██║",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    V: [
      "██╗   ██╗",
      "██║   ██║",
      "██║   ██║",
      "╚██╗ ██╔╝",
      " ╚████╔╝ ",
      "  ╚═══╝  ",
    ],
    W: [
      "██╗    ██╗",
      "██║    ██║",
      "██║ █╗ ██║",
      "██║███╗██║",
      "╚███╔███╔╝",
      " ╚══╝╚══╝ ",
    ],
    X: ["██╗  ██╗", "╚██╗██╔╝", " ╚███╔╝ ", " ██╔██╗ ", "██╔╝ ██╗", "╚═╝  ╚═╝"],
    Y: [
      "██╗   ██╗",
      "╚██╗ ██╔╝",
      " ╚████╔╝ ",
      "  ╚██╔╝  ",
      "   ██║   ",
      "   ╚═╝   ",
    ],
    Z: ["███████╗", "╚══███╔╝", "  ███╔╝ ", " ███╔╝  ", "███████╗", "╚══════╝"],
    " ": ["    ", "    ", "    ", "    ", "    ", "    "],
    "0": [
      " ██████╗ ",
      "██╔═══██╗",
      "██║   ██║",
      "██║   ██║",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    "1": [" ██╗", "███║", "╚██║", " ██║", " ██║", " ╚═╝"],
    "2": [
      "██████╗ ",
      "╚════██╗",
      " █████╔╝",
      "██╔═══╝ ",
      "███████╗",
      "╚══════╝",
    ],
    "3": [
      "██████╗ ",
      "╚════██╗",
      " █████╔╝",
      " ╚═══██╗",
      "██████╔╝",
      "╚═════╝ ",
    ],
    "4": [
      "██╗  ██╗",
      "██║  ██║",
      "███████║",
      "╚════██║",
      "     ██║",
      "     ╚═╝",
    ],
    "5": [
      "███████╗",
      "██╔════╝",
      "███████╗",
      "╚════██║",
      "███████║",
      "╚══════╝",
    ],
    "6": [
      " ██████╗ ",
      "██╔════╝ ",
      "███████╗ ",
      "██╔═══██╗",
      "╚██████╔╝",
      " ╚═════╝ ",
    ],
    "7": [
      "███████╗",
      "╚════██║",
      "    ██╔╝",
      "   ██╔╝ ",
      "   ██║  ",
      "   ╚═╝  ",
    ],
    "8": [
      " █████╗ ",
      "██╔══██╗",
      "╚█████╔╝",
      "██╔══██╗",
      "╚█████╔╝",
      " ╚════╝ ",
    ],
    "9": [
      " █████╗ ",
      "██╔══██╗",
      "╚██████║",
      " ╚═══██║",
      " █████╔╝",
      " ╚════╝ ",
    ],
  };

  const maxLines = 6;
  const lines: string[] = Array(maxLines).fill("");

  for (const char of upperText) {
    const art = stdChars[char] || stdChars[" "];
    for (let i = 0; i < maxLines; i++) {
      lines[i] += (art[i] || "    ") + " ";
    }
  }

  return lines.join("\n");
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
      return mapChars(text, UNICODE_MAPS.sansBold);
    case "sansItalic":
      return mapChars(text, UNICODE_MAPS.sansItalic);
    case "sansBoldItalic":
      return mapChars(text, UNICODE_MAPS.sansBoldItalic);

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
      // Markdown Code Block
      result = "```" + result + "```";
    }
    return result;
  }

  if (s === "instagram-font") {
    return applyFontStyle(workingText, customSettings.style || "sansBold");
  }

  if (s === "tiktok-font") {
    return applyFontStyle(workingText, customSettings.style || "serifBold");
  }

  if (s === "facebook-font") {
    return applyFontStyle(workingText, customSettings.style || "sansBold");
  }

  if (s === "gaming-font") {
    return applyFontStyle(workingText, customSettings.game || "game_fort");
  }

  if (s === "fortnite-font") {
    return applyFontStyle(workingText, customSettings.style || "sansBold");
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
    case "demonic-text": {
      const demonicStyle = customSettings.demonicStyle || "gothic";
      const darkness = customSettings.darkness || 5;
      const addCross = customSettings.invertedCross !== false;

      let result = "";
      if (demonicStyle === "hellfire") {
        result = corruptText(
          mapChars(workingText, GOTHIC_MAP),
          Math.ceil(darkness / 2),
        );
      } else if (demonicStyle === "abyss") {
        result = corruptText(workingText, darkness);
      } else {
        result = mapChars(workingText, GOTHIC_MAP);
      }

      if (addCross) {
        const symbols = ["†", "‡", "⛧", "☠", "⚰"];
        result = result
          .split("")
          .map((c, i) =>
            i % Math.max(8 - Math.floor(darkness / 2), 3) === 0 && c !== " "
              ? c + symbols[Math.floor(Math.random() * symbols.length)]
              : c,
          )
          .join("");
      }
      return result;
    }
    case "scary-text": {
      const fear = customSettings.fear || 5;
      return corruptText(
        mapChars(workingText, GOTHIC_MAP),
        Math.ceil(fear / 2),
      );
    }
    case "gothic-font": {
      const gothicStyle = customSettings.gothicStyle || "fraktur";
      const addOrnaments = customSettings.ornaments === true;

      let result = "";
      if (gothicStyle === "boldFraktur") {
        result = mapChars(workingText, UNICODE_MAPS.boldFraktur || GOTHIC_MAP);
      } else if (gothicStyle === "medieval") {
        result = mapChars(workingText, UNICODE_MAPS.fraktur || GOTHIC_MAP);
      } else {
        result = mapChars(workingText, GOTHIC_MAP);
      }

      if (addOrnaments) {
        result = "༺ " + result + " ༻";
      }
      return result;
    }

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

    // STYLE & FANCY TOOLS
    case "fancy-font": {
      const fancyLevel = customSettings.fancy_level || 5;
      const density = customSettings.density || 2;

      // Use script/cursive base with decorative symbols
      let result = mapChars(workingText, CURSIVE_MAP);

      const decorSymbols = ["✧", "✦", "★", "☆", "❋", "❊", "❉", "❈", "✿", "❀"];
      const insertFreq = Math.max(8 - Math.floor(density), 2);

      if (fancyLevel >= 3) {
        result = result
          .split("")
          .map((c, i) => {
            if (c === " ") return c;
            if (i % insertFreq === 0) {
              return (
                c +
                decorSymbols[Math.floor(Math.random() * decorSymbols.length)]
              );
            }
            return c;
          })
          .join("");
      }

      // Add frame for high fancy level
      if (fancyLevel >= 7) {
        result = "༺ " + result + " ༻";
      }

      return result;
    }
    case "aesthetic-font": {
      const vibe = customSettings.vibe || "vaporwave";

      if (vibe === "soft") {
        // Use bubble text with soft symbols
        const result = mapChars(workingText, BUBBLE_MAP);
        return "☁️ " + result + " ☁️";
      } else if (vibe === "grunge") {
        // Use gothic/fraktur with corruption
        return corruptText(mapChars(workingText, GOTHIC_MAP), 2);
      } else if (vibe === "dark") {
        return mapChars(workingText, GOTHIC_MAP);
      } else {
        // vaporwave - fullwidth with spaces
        return workingText
          .split("")
          .map((c) => {
            const code = c.charCodeAt(0);
            return code >= 33 && code <= 126
              ? String.fromCharCode(code + 0xfee0)
              : c;
          })
          .join(" ");
      }
    }
    case "stylish-font": {
      const stylishStyle = customSettings.stylishStyle || "script";
      const addDecorations = customSettings.decorations !== false;

      let result = "";
      if (stylishStyle === "serifBold") {
        result = mapChars(workingText, UNICODE_MAPS.serifBold || BOLD_MAP);
      } else if (stylishStyle === "sansBold") {
        result = mapChars(workingText, BOLD_MAP);
      } else if (stylishStyle === "doubleStruck") {
        result = mapChars(workingText, UNICODE_MAPS.doubleStruck || BOLD_MAP);
      } else {
        result = mapChars(workingText, CURSIVE_MAP);
      }

      if (addDecorations) {
        const decorSymbols = ["♔", "♕", "✧", "★"];
        result = decorSymbols[0] + " " + result + " " + decorSymbols[1];
      }

      return result;
    }
    case "cute-font": {
      const cuteStyle = customSettings.cuteStyle || "kawaii";
      const addEmoticons = customSettings.emoticons !== false;

      // Use bubble/outlined text for cute appearance
      let result = mapChars(workingText, BUBBLE_MAP);

      const cuteEmoticons: Record<string, string[]> = {
        kawaii: ["(◕‿◕)", "(◕ᴗ◕✿)", "✿", "❀", "🌸"],
        bubbly: ["•ᴗ•", "◦‿◦", "○", "◎", "⚪"],
        sweet: ["♡", "♥", "❤", "💕", "🍬"],
        sparkle: ["✨", "⋆", "✧", "★", "💫"],
      };

      const emoticons = cuteEmoticons[cuteStyle] || cuteEmoticons.kawaii;

      if (addEmoticons) {
        const prefix = emoticons[Math.floor(Math.random() * emoticons.length)];
        const suffix = emoticons[Math.floor(Math.random() * emoticons.length)];
        result = prefix + " " + result + " " + suffix;
      }

      return result;
    }
    case "calligraphy-font": {
      const calliStyle = customSettings.calligraphyStyle || "script";
      const addFlourishes = customSettings.flourishes === true;

      let result = "";
      if (calliStyle === "boldScript") {
        result = mapChars(workingText, UNICODE_MAPS.boldScript || CURSIVE_MAP);
      } else if (calliStyle === "serifItalic") {
        result = mapChars(workingText, ITALIC_MAP);
      } else if (calliStyle === "brush") {
        // Use a combination of script with gothic flair
        result = mapChars(workingText, CURSIVE_MAP);
      } else {
        result = mapChars(workingText, CURSIVE_MAP);
      }

      if (addFlourishes) {
        result = "❧ " + result + " ❧";
      }

      return result;
    }
    case "cursive-font": {
      const cursiveStyle = customSettings.cursiveStyle || "script";

      if (cursiveStyle === "boldScript") {
        return mapChars(workingText, UNICODE_MAPS.boldScript || CURSIVE_MAP);
      } else if (cursiveStyle === "serifItalic") {
        return mapChars(workingText, ITALIC_MAP);
      } else if (cursiveStyle === "handwritten") {
        // Handwritten style - use script with slight variation
        return mapChars(workingText, CURSIVE_MAP);
      } else {
        return mapChars(workingText, CURSIVE_MAP);
      }
    }

    // TEXT TOOLS
    case "bold-text": {
      const intensity = customSettings.intensity || "medium";
      const combineItalic = customSettings.italic === true;

      let selectedMap = UNICODE_MAPS.serifBold || BOLD_MAP;

      if (intensity === "extra")
        selectedMap = UNICODE_MAPS.sansBold || BOLD_MAP;
      if (intensity === "ultra")
        selectedMap = UNICODE_MAPS.boldFraktur || BOLD_MAP;

      let result = mapChars(workingText, selectedMap);

      if (combineItalic) {
        if (intensity === "extra" && UNICODE_MAPS.sansBoldItalic) {
          return mapChars(workingText, UNICODE_MAPS.sansBoldItalic);
        }
        // Bold Italic uses different unicode range
        const boldItalicMap: Record<string, string> = {
          a: "𝒂",
          b: "𝒃",
          c: "𝒄",
          d: "𝒅",
          e: "𝒆",
          f: "𝒇",
          g: "𝒈",
          h: "𝒉",
          i: "𝒊",
          j: "𝒋",
          k: "𝒌",
          l: "𝒍",
          m: "𝒎",
          n: "𝒏",
          o: "𝒐",
          p: "𝒑",
          q: "𝒒",
          r: "𝒓",
          s: "𝒔",
          t: "𝒕",
          u: "𝒖",
          v: "𝒗",
          w: "𝒘",
          x: "𝒙",
          y: "𝒚",
          z: "𝒛",
          A: "𝑨",
          B: "𝑩",
          C: "𝑪",
          D: "𝑫",
          E: "𝑬",
          F: "𝑭",
          G: "𝑮",
          H: "𝑯",
          I: "𝑰",
          J: "𝑱",
          K: "𝑲",
          L: "𝑳",
          M: "𝑴",
          N: "𝑵",
          O: "𝑶",
          P: "𝑷",
          Q: "𝑸",
          R: "𝑹",
          S: "𝑺",
          T: "𝑻",
          U: "𝑼",
          V: "𝑽",
          W: "𝑾",
          X: "𝑿",
          Y: "𝒀",
          Z: "𝒁",
        };
        result = workingText
          .split("")
          .map((c) => boldItalicMap[c] || c)
          .join("");
      }

      return result;
    }
    case "italic-text": {
      const style = customSettings.style || "standard";
      const combineBold = customSettings.bold === true;

      if (combineBold) {
        if (style === "sans" && UNICODE_MAPS.sansBoldItalic) {
          return mapChars(workingText, UNICODE_MAPS.sansBoldItalic);
        }
        const boldItalicMap: Record<string, string> = {
          a: "𝒂",
          b: "𝒃",
          c: "𝒄",
          d: "𝒅",
          e: "𝒆",
          f: "𝒇",
          g: "𝒈",
          h: "𝒉",
          i: "𝒊",
          j: "𝒋",
          k: "𝒌",
          l: "𝒍",
          m: "𝒎",
          n: "𝒏",
          o: "𝒐",
          p: "𝒑",
          q: "𝒒",
          r: "𝒓",
          s: "𝒔",
          t: "𝒕",
          u: "𝒖",
          v: "𝒗",
          w: "𝒘",
          x: "𝒙",
          y: "𝒚",
          z: "𝒛",
          A: "𝑨",
          B: "𝑩",
          C: "𝑪",
          D: "𝑫",
          E: "𝑬",
          F: "𝑭",
          G: "𝑮",
          H: "𝑯",
          I: "𝑰",
          J: "𝑱",
          K: "𝑲",
          L: "𝑳",
          M: "𝑴",
          N: "𝑵",
          O: "𝑶",
          P: "𝑷",
          Q: "𝑸",
          R: "𝑹",
          S: "𝑺",
          T: "𝑻",
          U: "𝑼",
          V: "𝑽",
          W: "𝑾",
          X: "𝑿",
          Y: "𝒀",
          Z: "𝒁",
        };
        return workingText
          .split("")
          .map((c) => boldItalicMap[c] || c)
          .join("");
      }

      if (style === "serif") {
        // Serif italic
        return mapChars(workingText, ITALIC_MAP);
      } else if (style === "sans") {
        // Sans-serif italic
        const sansItalicMap: Record<string, string> = {
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
        return workingText
          .split("")
          .map((c) => sansItalicMap[c] || c)
          .join("");
      }

      return mapChars(workingText, ITALIC_MAP);
    }
    case "underline-text": {
      const style = customSettings.style || "single";

      if (style === "double") {
        return workingText
          .split("")
          .map((c) => c + "\u0333")
          .join("");
      } else if (style === "wavy") {
        return workingText
          .split("")
          .map((c) => c + "\u0330")
          .join("");
      }
      return workingText
        .split("")
        .map((c) => c + "\u0332")
        .join("");
    }
    case "strikethrough-text": {
      const position = customSettings.position || "center";
      const doubleStrike = customSettings.double === true;

      let strikeChar = "\u0336"; // center
      if (position === "high") {
        strikeChar = "\u0305"; // overline
      } else if (position === "low") {
        strikeChar = "\u0332"; // underline
      }

      if (doubleStrike) {
        return workingText
          .split("")
          .map((c) => c + strikeChar + strikeChar)
          .join("");
      }
      return workingText
        .split("")
        .map((c) => c + strikeChar)
        .join("");
    }
    case "upside-down-text": {
      const angle = customSettings.angle || "180";
      const mirrorCombo = customSettings.mirror === true;

      if (angle === "90") return workingText.split("").join("\n");
      if (angle === "270") return workingText.split("").reverse().join("\n");

      let result = mapChars(workingText, UPSIDE_DOWN_MAP)
        .split("")
        .reverse()
        .join("");

      if (mirrorCombo) {
        result = mapChars(result, FLIP_TEXT_MAP);
      }

      return result;
    }
    case "mirror-text": {
      const direction = customSettings.direction || "horizontal";

      if (direction === "vertical") {
        let result = mapChars(workingText, FLIP_TEXT_MAP);
        return mapChars(result, UPSIDE_DOWN_MAP);
      } else if (direction === "both") {
        return mapChars(workingText, UPSIDE_DOWN_MAP)
          .split("")
          .reverse()
          .join("");
      }
      return mapChars(workingText, FLIP_TEXT_MAP).split("").reverse().join("");
    }
    case "small-text": {
      const mode = customSettings.mode || "tiny";

      if (mode === "sub") {
        return mapChars(workingText, SUBSCRIPT_MAP);
      } else if (mode === "super") {
        return mapChars(workingText, SUPERSCRIPT_MAP);
      }
      // Tiny uses small caps from UNICODE_MAPS if available
      return mapChars(workingText, SUPERSCRIPT_MAP);
    }
    case "tiny-text": {
      const tinyType = customSettings.type || "super";

      if (tinyType === "sub") {
        return mapChars(workingText, SUBSCRIPT_MAP);
      } else if (tinyType === "smallcaps") {
        const smallCapsMap: Record<string, string> = {
          a: "ᴀ",
          b: "ʙ",
          c: "ᴄ",
          d: "ᴅ",
          e: "ᴇ",
          f: "ғ",
          g: "ɢ",
          h: "ʜ",
          i: "ɪ",
          j: "ᴊ",
          k: "ᴋ",
          l: "ʟ",
          m: "ᴍ",
          n: "ɴ",
          o: "ᴏ",
          p: "ᴘ",
          q: "ǫ",
          r: "ʀ",
          s: "s",
          t: "ᴛ",
          u: "ᴜ",
          v: "ᴠ",
          w: "ᴡ",
          x: "x",
          y: "ʏ",
          z: "ᴢ",
        };
        return workingText
          .toLowerCase()
          .split("")
          .map((c) => smallCapsMap[c] || c)
          .join("");
      }
      return mapChars(workingText, SUPERSCRIPT_MAP);
    }
    case "superscript":
      return mapChars(workingText, SUPERSCRIPT_MAP);
    case "big-text": {
      const gap = customSettings.gap || 1;
      const bigStyle = customSettings.style || "upper";

      let result = workingText;

      if (bigStyle === "upper") {
        result = result.toUpperCase();
      } else if (bigStyle === "bold") {
        result = mapChars(result.toUpperCase(), BOLD_MAP);
      } else if (bigStyle === "wide") {
        result = result
          .toUpperCase()
          .split("")
          .map((c) => {
            const code = c.charCodeAt(0);
            return code >= 33 && code <= 126
              ? String.fromCharCode(code + 0xfee0)
              : c;
          })
          .join("");
      }

      return result.split("").join(" ".repeat(gap));
    }
    case "space-remover": {
      const mode = customSettings.mode || "all";

      if (mode === "extra") {
        return workingText.replace(/\s+/g, " ");
      } else if (mode === "trim") {
        return workingText.trim();
      }
      return workingText.replace(/\s/g, "");
    }
    case "text-cleaner": {
      const cleanType = customSettings.cleanType || "special";
      const preserveSpaces = customSettings.preserveSpaces !== false;

      let result = workingText;

      if (cleanType === "special") {
        result = result.replace(/[^\w\s]/g, "");
      } else if (cleanType === "numbers") {
        result = result.replace(/[0-9]/g, "");
      } else if (cleanType === "punctuation") {
        result = result.replace(/[.,!?;:'"()-]/g, "");
      } else if (cleanType === "all") {
        result = result.replace(/[^a-zA-Z\s]/g, "");
      }

      if (!preserveSpaces) {
        result = result.replace(/\s/g, "");
      }

      return result;
    }
    case "sentence-case": {
      const caseType = customSettings.caseType || "sentence";

      if (caseType === "sentence") {
        return workingText
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      } else if (caseType === "title") {
        return workingText
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase());
      } else if (caseType === "lower") {
        return workingText.toLowerCase();
      } else if (caseType === "upper") {
        return workingText.toUpperCase();
      } else if (caseType === "alternating") {
        return workingText
          .split("")
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join("");
      }
      return workingText;
    }
    case "character-counter":
      // This returns the text as-is, the component handles the counting display
      return workingText;
    case "invisible-character": {
      const charType = customSettings.charType || "zwsp";
      const count = customSettings.count || 1;

      const invisibleChars: Record<string, string> = {
        zwsp: "\u200B", // Zero Width Space
        zwj: "\u200D", // Zero Width Joiner
        hair: "\u200A", // Hair Space
        separator: "\u2063", // Invisible Separator
      };

      const invisChar = invisibleChars[charType] || invisibleChars.zwsp;
      const padding = invisChar.repeat(count);

      if (!workingText) return padding;
      return workingText.split("").join(padding);
    }
    case "reverse-text":
      return reverseText(workingText);
    case "bubble-text": {
      const bubbleType = customSettings.type || "out";

      // Different bubble character sets
      const bubbleMaps: Record<string, Record<string, string>> = {
        out: {
          // Outlined circled letters
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
        },
        fill: {
          // Filled/negative circled letters
          a: "🅐",
          b: "🅑",
          c: "🅒",
          d: "🅓",
          e: "🅔",
          f: "🅕",
          g: "🅖",
          h: "🅗",
          i: "🅘",
          j: "🅙",
          k: "🅚",
          l: "🅛",
          m: "🅜",
          n: "🅝",
          o: "🅞",
          p: "🅟",
          q: "🅠",
          r: "🅡",
          s: "🅢",
          t: "🅣",
          u: "🅤",
          v: "🅥",
          w: "🅦",
          x: "🅧",
          y: "🅨",
          z: "🅩",
          A: "🅐",
          B: "🅑",
          C: "🅒",
          D: "🅓",
          E: "🅔",
          F: "🅕",
          G: "🅖",
          H: "🅗",
          I: "🅘",
          J: "🅙",
          K: "🅚",
          L: "🅛",
          M: "🅜",
          N: "🅝",
          O: "🅞",
          P: "🅟",
          Q: "🅠",
          R: "🅡",
          S: "🅢",
          T: "🅣",
          U: "🅤",
          V: "🅥",
          W: "🅦",
          X: "🅧",
          Y: "🅨",
          Z: "🅩",
          "0": "⓿",
          "1": "❶",
          "2": "❷",
          "3": "❸",
          "4": "❹",
          "5": "❺",
          "6": "❻",
          "7": "❼",
          "8": "❽",
          "9": "❾",
        },
        "3d": {
          // Square/3D style letters
          a: "🄰",
          b: "🄱",
          c: "🄲",
          d: "🄳",
          e: "🄴",
          f: "🄵",
          g: "🄶",
          h: "🄷",
          i: "🄸",
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
          I: "🄸",
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
          "0": "0️⃣",
          "1": "1️⃣",
          "2": "2️⃣",
          "3": "3️⃣",
          "4": "4️⃣",
          "5": "5️⃣",
          "6": "6️⃣",
          "7": "7️⃣",
          "8": "8️⃣",
          "9": "9️⃣",
        },
      };

      const selectedMap = bubbleMaps[bubbleType] || bubbleMaps.out;
      return workingText
        .split("")
        .map((c) => selectedMap[c] || c)
        .join("");
    }
    case "wide-text": {
      const widthVal = customSettings.width || 1;
      const useFullwidth = customSettings.fullwidth !== false;
      const wideSpace = " ".repeat(widthVal);

      if (useFullwidth) {
        return workingText
          .split("")
          .map((c) => {
            const code = c.charCodeAt(0);
            return code >= 33 && code <= 126
              ? String.fromCharCode(code + 0xfee0)
              : c;
          })
          .join(wideSpace);
      } else {
        // Just add spacing without fullwidth conversion
        return workingText.split("").join(wideSpace);
      }
    }
    case "vaporwave-text": {
      const widthVal = customSettings.width || 1;
      const usePalette = customSettings.palette !== false;
      const wideSpace = " ".repeat(widthVal);

      // Convert to fullwidth characters
      let result = workingText
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          return code >= 33 && code <= 126
            ? String.fromCharCode(code + 0xfee0)
            : c;
        })
        .join(wideSpace);

      // Add 80s/90s aesthetic decorations if palette is enabled
      if (usePalette) {
        const vaporSymbols = ["☆", "★", "✧", "✦", "♡", "☯", "✿", "❀"];
        result =
          vaporSymbols[Math.floor(Math.random() * vaporSymbols.length)] +
          " " +
          result +
          " " +
          vaporSymbols[Math.floor(Math.random() * vaporSymbols.length)];
      }

      return result;
    }
    case "aesthetic-text": {
      const widthVal = customSettings.width || 1;
      const aestheticStyle = customSettings.aestheticStyle || "vaporwave";
      const wideSpace = " ".repeat(widthVal);

      // Convert to fullwidth characters
      let result = workingText
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          return code >= 33 && code <= 126
            ? String.fromCharCode(code + 0xfee0)
            : c;
        })
        .join(wideSpace);

      // Apply style-specific decorations
      if (aestheticStyle === "vaporwave") {
        result = "☆彡 " + result + " 彡☆";
      } else if (aestheticStyle === "soft") {
        result = "✿ " + result + " ✿";
      } else if (aestheticStyle === "grunge") {
        result = "× " + result + " ×";
      }

      return result;
    }

    // Dark & Horror - Extra tools
    case "extra-thicc-text": {
      const thiccStyle = customSettings.thiccStyle || "serifBold";
      const letterSpacing = customSettings.spacing || 1;

      let result = "";
      if (thiccStyle === "serifBold") {
        result = mapChars(workingText, UNICODE_MAPS.serifBold || BOLD_MAP);
      } else if (thiccStyle === "sansBold") {
        result = mapChars(workingText, BOLD_MAP);
      } else if (thiccStyle === "fullwidth") {
        result = workingText
          .split("")
          .map((c) => {
            const code = c.charCodeAt(0);
            return code >= 33 && code <= 126
              ? String.fromCharCode(code + 0xfee0)
              : c;
          })
          .join("");
      } else if (thiccStyle === "doubleStruck") {
        result = mapChars(workingText, UNICODE_MAPS.doubleStruck || BOLD_MAP);
      } else {
        result = mapChars(workingText, BOLD_MAP);
      }

      if (letterSpacing > 0) {
        result = result.split("").join(" ".repeat(letterSpacing));
      }
      return result;
    }
    case "glitter-text": {
      const glitterStyle = customSettings.glitterStyle || "sparkle";
      const glitterIntensity = customSettings.intensity || 2;

      const glitterSymbols: Record<string, string[]> = {
        sparkle: ["✨", "✧", "⋆", "˚", "✦"],
        stars: ["⭐", "★", "☆", "✪", "✯"],
        diamonds: ["💎", "◇", "◆", "♦", "✧"],
        rainbow: ["🌈", "✨", "💫", "⭐", "🌟"],
      };

      const symbols = glitterSymbols[glitterStyle] || glitterSymbols.sparkle;
      const insertFreq = Math.max(6 - glitterIntensity, 2);

      return workingText
        .split("")
        .map((c, i) => {
          if (c === " ") return c;
          if (i % insertFreq === 0) {
            return c + symbols[Math.floor(Math.random() * symbols.length)];
          }
          return c;
        })
        .join("");
    }
    case "square-text": {
      const squareStyle = customSettings.squareStyle || "outlined";

      if (squareStyle === "filled") {
        // Negative squared Latin letters (filled/white on black)
        const FILLED_SQUARE_MAP: Record<string, string> = {
          a: "🅰",
          b: "🅱",
          c: "🅲",
          d: "🅳",
          e: "🅴",
          f: "🅵",
          g: "🅶",
          h: "🅷",
          i: "🅸",
          j: "🅹",
          k: "🅺",
          l: "🅻",
          m: "🅼",
          n: "🅽",
          o: "🅾",
          p: "🅿",
          q: "🆀",
          r: "🆁",
          s: "🆂",
          t: "🆃",
          u: "🆄",
          v: "🆅",
          w: "🆆",
          x: "🆇",
          y: "🆈",
          z: "🆉",
          A: "🅰",
          B: "🅱",
          C: "🅲",
          D: "🅳",
          E: "🅴",
          F: "🅵",
          G: "🅶",
          H: "🅷",
          I: "🅸",
          J: "🅹",
          K: "🅺",
          L: "🅻",
          M: "🅼",
          N: "🅽",
          O: "🅾",
          P: "🅿",
          Q: "🆀",
          R: "🆁",
          S: "🆂",
          T: "🆃",
          U: "🆄",
          V: "🆅",
          W: "🆆",
          X: "🆇",
          Y: "🆈",
          Z: "🆉",
        };
        return mapChars(workingText, FILLED_SQUARE_MAP);
      } else if (squareStyle === "negative") {
        // Negative circled (inverted)
        const NEGATIVE_SQUARE_MAP: Record<string, string> = {
          a: "🄰",
          b: "🄱",
          c: "🄲",
          d: "🄳",
          e: "🄴",
          f: "🄵",
          g: "🄶",
          h: "🄷",
          i: "🄸",
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
          I: "🄸",
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
        return mapChars(workingText, NEGATIVE_SQUARE_MAP);
      } else {
        // Default: outlined squares
        return mapChars(workingText, SQUARE_MAP);
      }
    }
    case "special-text": {
      const specialStyle = customSettings.specialStyle || "mixed";
      const density = customSettings.density || 2;

      const styleSymbols: Record<string, string[]> = {
        mixed: ["★", "♥", "✿", "♪", "☆", "⚡", "✧", "♦"],
        sparkle: ["✨", "✧", "⋆", "˚", "✦", "★"],
        stars: ["★", "☆", "✪", "✯", "⭐", "✦"],
        hearts: ["♥", "♡", "❤", "💕", "💗", "💖"],
      };

      const symbols = styleSymbols[specialStyle] || styleSymbols.mixed;
      const insertFreq = Math.max(6 - density, 2);

      const transformed = mapChars(workingText, BOLD_MAP);

      return transformed
        .split("")
        .map((c, i) => {
          if (c === " ") return c;
          if (i % insertFreq === 0) {
            return c + symbols[Math.floor(Math.random() * symbols.length)];
          }
          return c;
        })
        .join("");
    }

    // Translators
    case "morse-code": {
      const separatorType = customSettings.separator || "slash";
      const sep =
        separatorType === "slash"
          ? " / "
          : separatorType === "pipe"
            ? " | "
            : "   ";

      // Split into words, convert each word, then join with separator
      return workingText
        .toUpperCase()
        .split(" ")
        .map((word) =>
          word
            .split("")
            .map((c) => MORSE_MAP[c] || c)
            .join(" "),
        )
        .join(sep);
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
    case "wingdings": {
      const style = customSettings.style || "classic";
      const addSpacing = customSettings.spacing === true;

      // Different wingdings character sets
      const wingdingsSets: Record<string, Record<string, string>> = {
        classic: {
          a: "✌",
          b: "👌",
          c: "👍",
          d: "👎",
          e: "👈",
          f: "👉",
          g: "👆",
          h: "👇",
          i: "✋",
          j: "☺",
          k: "😐",
          l: "☹",
          m: "💣",
          n: "☠",
          o: "⚐",
          p: "⚑",
          q: "✉",
          r: "✂",
          s: "✁",
          t: "👓",
          u: "⌛",
          v: "⌨",
          w: "🖱",
          x: "🖨",
          y: "📁",
          z: "📂",
        },
        webdings: {
          a: "🕷",
          b: "🕸",
          c: "🏠",
          d: "🚗",
          e: "✈",
          f: "☁",
          g: "🌧",
          h: "⛈",
          i: "❄",
          j: "☀",
          k: "🌙",
          l: "⭐",
          m: "🔥",
          n: "💧",
          o: "🌊",
          p: "🌲",
          q: "🌸",
          r: "🍀",
          s: "🍂",
          t: "🐦",
          u: "🐟",
          v: "🐕",
          w: "🐈",
          x: "🦋",
          y: "🐝",
          z: "🐞",
        },
        symbols: {
          a: "♠",
          b: "♣",
          c: "♥",
          d: "♦",
          e: "★",
          f: "☆",
          g: "●",
          h: "○",
          i: "■",
          j: "□",
          k: "▲",
          l: "△",
          m: "◆",
          n: "◇",
          o: "⬟",
          p: "⬠",
          q: "✦",
          r: "✧",
          s: "❖",
          t: "✚",
          u: "✛",
          v: "✜",
          w: "✢",
          x: "✣",
          y: "✤",
          z: "✥",
        },
      };

      const charMap = wingdingsSets[style] || wingdingsSets.classic;
      const separator = addSpacing ? " " : "";

      return workingText
        .toLowerCase()
        .split("")
        .map((c) => {
          return charMap[c] || c;
        })
        .join(separator);
    }
    case "runic": {
      const alphabet = customSettings.alphabet || "elder";
      const medieval = customSettings.medieval === true;

      const runicSets: Record<string, Record<string, string>> = {
        elder: {
          a: "ᚨ",
          b: "ᛒ",
          c: "ᚲ",
          d: "ᛞ",
          e: "ᛖ",
          f: "ᚠ",
          g: "ᚷ",
          h: "ᚺ",
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
          v: "ᚹ",
          w: "ᚹ",
          x: "ᚲᛊ",
          y: "ᛇ",
          z: "ᛉ",
        },
        younger: {
          a: "ᛅ",
          b: "ᛒ",
          c: "ᚴ",
          d: "ᛏ",
          e: "ᛁ",
          f: "ᚠ",
          g: "ᚴ",
          h: "ᚼ",
          i: "ᛁ",
          j: "ᛁ",
          k: "ᚴ",
          l: "ᛚ",
          m: "ᛘ",
          n: "ᚾ",
          o: "ᚢ",
          p: "ᛒ",
          q: "ᚴ",
          r: "ᚱ",
          s: "ᛋ",
          t: "ᛏ",
          u: "ᚢ",
          v: "ᚢ",
          w: "ᚢ",
          x: "ᚴᛋ",
          y: "ᚤ",
          z: "ᛋ",
        },
        anglosaxon: {
          a: "ᚪ",
          b: "ᛒ",
          c: "ᚳ",
          d: "ᛞ",
          e: "ᛖ",
          f: "ᚠ",
          g: "ᚷ",
          h: "ᚻ",
          i: "ᛁ",
          j: "ᛡ",
          k: "ᚳ",
          l: "ᛚ",
          m: "ᛗ",
          n: "ᚾ",
          o: "ᚩ",
          p: "ᛈ",
          q: "ᚳᚹ",
          r: "ᚱ",
          s: "ᛋ",
          t: "ᛏ",
          u: "ᚢ",
          v: "ᚹ",
          w: "ᚹ",
          x: "ᚳᛋ",
          y: "ᚣ",
          z: "ᛉ",
        },
      };

      const runeMap = runicSets[alphabet] || runicSets.elder;
      let result = workingText
        .toLowerCase()
        .split("")
        .map((c) => runeMap[c] || c)
        .join("");

      if (medieval) {
        result = "᛭ " + result + " ᛭";
      }

      return result;
    }
    case "old-english": {
      const era = customSettings.era || "medieval";
      const useThorn = customSettings.addThorn !== false;

      let result = workingText;

      // Common Old English replacements
      if (useThorn) {
        result = result.replace(/th/gi, "þ");
        result = result.replace(/Th/g, "Þ");
      }

      // Era-specific transformations
      if (era === "anglosaxon") {
        result = result.replace(/w/gi, "ƿ");
        result = result.replace(/ae/gi, "æ");
        result = result.replace(/oo/gi, "ō");
        result = result.replace(/ee/gi, "ē");
      } else if (era === "medieval") {
        result = result.replace(/v/gi, "u");
        result = result.replace(/j/gi, "i");
        result = result.replace(/u(?=[aeiou])/gi, "v");
      } else if (era === "shakespearean") {
        result = result.replace(/you/gi, "thou");
        result = result.replace(/your/gi, "thy");
        result = result.replace(/are/gi, "art");
        result = result.replace(/have/gi, "hath");
        result = result.replace(/do/gi, "doth");
      }

      return result;
    }
    case "braille":
      return toBraille(workingText, customSettings.showIndicator ?? true);
    case "sign-language": {
      const format = customSettings.format || "emoji";
      const separator =
        customSettings.separator === "dash"
          ? "-"
          : customSettings.separator === "none"
            ? ""
            : " ";

      const signFormats: Record<string, Record<string, string>> = {
        emoji: {
          a: "🤟",
          b: "🤘",
          c: "🤙",
          d: "👆",
          e: "✊",
          f: "🤞",
          g: "🔫",
          h: "🤛",
          i: "🤏",
          j: "🤌",
          k: "✌",
          l: "🤟",
          m: "🤜",
          n: "👇",
          o: "👌",
          p: "👆",
          q: "🤙",
          r: "🤞",
          s: "✊",
          t: "👍",
          u: "☝",
          v: "✌",
          w: "🤟",
          x: "🤞",
          y: "🤙",
          z: "👉",
        },
        codes: {
          a: "[A]",
          b: "[B]",
          c: "[C]",
          d: "[D]",
          e: "[E]",
          f: "[F]",
          g: "[G]",
          h: "[H]",
          i: "[I]",
          j: "[J]",
          k: "[K]",
          l: "[L]",
          m: "[M]",
          n: "[N]",
          o: "[O]",
          p: "[P]",
          q: "[Q]",
          r: "[R]",
          s: "[S]",
          t: "[T]",
          u: "[U]",
          v: "[V]",
          w: "[W]",
          x: "[X]",
          y: "[Y]",
          z: "[Z]",
        },
        descriptions: {
          a: "(fist-thumb)",
          b: "(flat-thumb)",
          c: "(curved)",
          d: "(point-up)",
          e: "(fist)",
          f: "(ok-3up)",
          g: "(thumb-point)",
          h: "(flat-2)",
          i: "(pinky-up)",
          j: "(j-motion)",
          k: "(2up-thumb)",
          l: "(l-shape)",
          m: "(3-under)",
          n: "(2-under)",
          o: "(o-shape)",
          p: "(k-down)",
          q: "(g-down)",
          r: "(crossed)",
          s: "(fist)",
          t: "(thumb-fist)",
          u: "(2-up)",
          v: "(peace)",
          w: "(3-up)",
          x: "(hook)",
          y: "(hang-loose)",
          z: "(z-motion)",
        },
      };

      const signMap = signFormats[format] || signFormats.emoji;

      return workingText
        .toLowerCase()
        .split("")
        .map((c) => {
          if (c === " ") return "  ";
          return signMap[c] || c;
        })
        .join(separator);
    }
    case "ascii-art":
      return generateAsciiArt(workingText, customSettings.font || "std");

    // Weird and Creepy text tools with proper customization
    case "weird-text": {
      const level = customSettings.level || 5;
      const mixFonts = customSettings.mix !== false;

      // Multiple font maps to mix from
      const fontMaps = [GOTHIC_MAP, BOLD_MAP, ITALIC_MAP, CURSIVE_MAP];

      if (mixFonts) {
        // Mix different fonts based on level
        return workingText
          .split("")
          .map((c, i) => {
            if (c === " ") return c;
            // Higher level = more random font switching
            const fontIndex =
              (i + Math.floor(Math.random() * level)) % fontMaps.length;
            return mapChars(c, fontMaps[fontIndex]);
          })
          .join("");
      } else {
        // Use a single weird font based on level
        const selectedFont =
          fontMaps[Math.min(level - 1, fontMaps.length - 1) % fontMaps.length];
        return mapChars(workingText, selectedFont);
      }
    }
    case "creepy-text": {
      const creepiness = customSettings.creepiness || 5;
      const addShadow = customSettings.shadow === true;

      // Creepy symbols to insert
      const creepySymbols = ["̷", "̸", "̶", "̵", "̴"];
      const shadowChars = ["░", "▒", "▓", "█", "▄", "▀"];

      let result = workingText
        .split("")
        .map((c, i) => {
          if (c === " ") return c;

          // Apply gothic font for creepy look
          let char = mapChars(c, GOTHIC_MAP);

          // Add zalgo-like effects based on creepiness
          const numEffects = Math.floor(creepiness / 3);
          for (let j = 0; j < numEffects; j++) {
            char +=
              creepySymbols[Math.floor(Math.random() * creepySymbols.length)];
          }

          return char;
        })
        .join("");

      // Add shadow characters if enabled
      if (addShadow) {
        result = result
          .split("")
          .map((c, i) => {
            if (c === " ") return c;
            if (i % 3 === 0) {
              return (
                shadowChars[Math.floor(Math.random() * shadowChars.length)] + c
              );
            }
            return c;
          })
          .join("");
      }

      return result;
    }

    // SYMBOLS TOOLS
    case "text-symbols": {
      const category = customSettings.category || "all";
      const density = customSettings.density || 5;

      const symbolSets: Record<string, string[]> = {
        arrows: [
          "→",
          "←",
          "↑",
          "↓",
          "↔",
          "⇒",
          "⇐",
          "⇑",
          "⇓",
          "➜",
          "➡",
          "⬅",
          "⬆",
          "⬇",
        ],
        stars: ["★", "☆", "✦", "✧", "✪", "✫", "✬", "✭", "✮", "✯", "⭐", "🌟"],
        hearts: [
          "♥",
          "♡",
          "❤",
          "❥",
          "❣",
          "💕",
          "💖",
          "💗",
          "💘",
          "💝",
          "💞",
          "💟",
        ],
        math: ["±", "×", "÷", "≠", "≤", "≥", "∞", "∑", "∏", "√", "∫", "π", "Ω"],
        currency: ["$", "€", "£", "¥", "₹", "₽", "₿", "¢", "₩", "₪", "₮", "₱"],
        all: [
          "★",
          "♥",
          "→",
          "✦",
          "♠",
          "♣",
          "♦",
          "☆",
          "◆",
          "●",
          "■",
          "▲",
          "◇",
          "○",
          "□",
          "△",
        ],
      };

      const symbols = symbolSets[category] || symbolSets.all;
      const insertFreq = Math.max(11 - density, 2);

      return workingText
        .split("")
        .map((c, i) => {
          if (c === " ") return c;
          if (i % insertFreq === 0) {
            return c + symbols[Math.floor(Math.random() * symbols.length)];
          }
          return c;
        })
        .join("");
    }
    case "aesthetic-symbols": {
      const style = customSettings.style || "sparkle";
      const wrap = customSettings.wrap !== false;

      const styleSets: Record<
        string,
        { symbols: string[]; prefix: string; suffix: string }
      > = {
        sparkle: {
          symbols: ["✧", "✦", "・", "˚", "✩"],
          prefix: "✧･ﾟ: *",
          suffix: "*:･ﾟ✧",
        },
        celestial: {
          symbols: ["☆", "★", "✫", "✬", "☾", "☽"],
          prefix: "☆.。.:*",
          suffix: "*:.。.☆",
        },
        floral: {
          symbols: ["❀", "✿", "❁", "❃", "✾", "✽"],
          prefix: "✿ﾟ❀ﾟ",
          suffix: "ﾟ❀ﾟ✿",
        },
        mystical: {
          symbols: ["✦", "✧", "⋆", "˚", "⁺"],
          prefix: "⋆｡˚✩",
          suffix: "✩˚｡⋆",
        },
      };

      const styleConfig = styleSets[style] || styleSets.sparkle;
      let result = workingText
        .split("")
        .map((c, i) => {
          if (c === " ")
            return (
              " " + styleConfig.symbols[i % styleConfig.symbols.length] + " "
            );
          return c;
        })
        .join("");

      if (wrap) {
        result = styleConfig.prefix + " " + result + " " + styleConfig.suffix;
      }

      return result;
    }
    case "special-characters": {
      const charType = customSettings.charType || "decorative";
      const addSpacing = customSettings.spacing === true;

      const charSets: Record<string, string[]> = {
        decorative: [
          "※",
          "†",
          "‡",
          "§",
          "¶",
          "•",
          "◦",
          "‣",
          "⁂",
          "❧",
          "☙",
          "❦",
        ],
        technical: ["⌘", "⌥", "⇧", "⌃", "⎋", "⏎", "⌫", "⇥", "⌧", "⏏"],
        legal: ["©", "®", "™", "℠", "℗", "§", "¶", "№", "℃", "℉"],
        musical: ["♩", "♪", "♫", "♬", "𝄞", "𝄢", "𝄫", "𝄪", "♭", "♮", "♯"],
      };

      const chars = charSets[charType] || charSets.decorative;
      const separator = addSpacing ? " " : "";

      return workingText
        .split("")
        .map((c, i) => {
          if (c === " ") return c;
          if (i % 3 === 0) {
            return (
              chars[Math.floor(Math.random() * chars.length)] + separator + c
            );
          }
          return c;
        })
        .join("");
    }
    case "text-emoticons": {
      const mood = customSettings.mood || "happy";
      const addBefore = customSettings.addBefore !== false;

      const emoticons: Record<string, string[]> = {
        happy: ["◕‿◕", "(◠‿◠)", "ヽ(◕ヮ◕)ノ", "(✿◠‿◠)", "☺", "ಡ‿ಡ", "(◕ᴗ◕✿)"],
        sad: ["ಥ_ಥ", "(╥_╥)", "(T_T)", "( ; _ ; )", "(´;ω;`)", "TT__TT"],
        angry: [
          "ಠ_ಠ",
          "(╬ಠ益ಠ)",
          "(ノಠ益ಠ)ノ",
          "ヽ(ಠ_ಠ)ノ",
          "(¬_¬)",
          "(-_-メ)",
        ],
        cute: ["ʕ•ᴥ•ʔ", "(=^・^=)", "ฅ^•ﻌ•^ฅ", "ʕ ᵔᴥᵔ ʔ", "(◕ᴗ◕✿)", "UwU"],
        shrug: ["¯\\_(ツ)_/¯", "┐(´д`)┌", "╮(︶▽︶)╭", "ヽ(。_°)ノ"],
      };

      const emoticonList = emoticons[mood] || emoticons.happy;
      const emote =
        emoticonList[Math.floor(Math.random() * emoticonList.length)];

      if (addBefore) {
        return emote + " " + workingText;
      } else {
        return workingText + " " + emote;
      }
    }
    case "lenny-face": {
      const lennyStyle = customSettings.lennyStyle || "classic";
      const position = customSettings.position || "after";

      const lennies: Record<string, string> = {
        classic: "( ͡° ͜ʖ ͡°)",
        surprised: "( ͡ᵔ ͜ʖ ͡ᵔ)",
        wink: "( ͡~ ͜ʖ ͡°)",
        flipped: "( ͜。 ͡ʖ ͜。)",
        bear: "ʕ ͡° ͜ʖ ͡°ʔ",
      };

      const lenny = lennies[lennyStyle] || lennies.classic;

      switch (position) {
        case "before":
          return lenny + " " + workingText;
        case "after":
          return workingText + " " + lenny;
        case "both":
          return lenny + " " + workingText + " " + lenny;
        default:
          return workingText + " " + lenny;
      }
    }

    // Defaults
    default:
      return workingText;
  }
}
