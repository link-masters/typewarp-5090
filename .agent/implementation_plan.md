---
description: Master plan for massive tool upgrade across all TypeWarp categories
---

# TypeWarp Tool Upgrade - Master Implementation Plan

## Architecture

- `toolConfig.ts` — UI controls (selects, sliders, toggles) per tool
- `transformers.ts` — Transformation logic per tool (uses fontMappings.ts)
- `fontMappings.ts` — Unicode character maps (UNICODE_MAPS)

## Phase 1: Dark & Horror (Tools 4-13) ✅ CURRENT

- [x] weird-text: Add 40 font options + fix weirdness scale
- [x] creepy-text: Add 20+ font options + fix creepiness scale
- [x] corrupted-text: Add multiple creepy font options
- [x] demonic-text: Add 40 demonic style options
- [x] scary-text: Add 50 scary font options
- [x] gothic-font: Add more gothic styles
- [x] special-text: Add more style options
- [x] extra-thicc-text: Add 40 font styles
- [x] glitter-text: Add 20 glitter styles + 30 font options
- [x] square-text: Add more square style options

## Phase 2: Symbols Category ✅ COMPLETE

- [x] text-symbols: Add 24 category types (arrows, dividers, flowers, music, chess, dice, braille, etc.)
- [x] aesthetic-symbols: Add 41 aesthetic styles (ocean, butterfly, kawaii, cyberpunk, gothic, etc.)
- [x] special-characters: Add 40 character types (greek, phonetic, dingbats, alchemical, ballot, etc.)
- [x] text-emoticons: Add 50 emoticon moods (love, wizard, zombie, pirate, celebration, etc.)
- [x] lenny-face: Add 50 lenny styles + eachWord position mode

## Phase 3: Style & Fancy Category ✅ COMPLETE

- [x] fancy-font: 25 font styles + fancy level slider + ornament density
- [x] aesthetic-font: 18 font styles + 14 aesthetic vibes
- [x] stylish-font: 25 font styles + decorations toggle
- [x] vaporwave-text: 10 font styles + width slider + retro wrap toggle
- [x] aesthetic-text: 12 font styles + 10 aesthetic styles + spacing slider
- [x] cute-font: 12 font styles + 16 cute themes + emoticons toggle
- [x] calligraphy-font: 15 font styles + flourishes toggle
- [x] cursive-font: 16 font styles
- [x] bubble-text: 8 bubble types + 6 base fonts (bracket, corner, parenthesized, filledSquare, negativeCircle)
- [x] wide-text: 10 font styles + width slider + fullwidth toggle

## Phase 4: Text Tools Category ✅ COMPLETE

- [x] bold-text: 15 font styles + italic toggle
- [x] italic-text: 15 font styles + bold toggle
- [x] underline-text: 12 fonts + 10 underline styles (single, double, wavy, diaeresis, ring, caron, bridge, etc.)
- [x] strikethrough-text: 12 fonts + 8 strike positions (center, high, low, short, diagonal, tilde, x, slash) + double
- [x] small-text: 12 fonts + 6 size modes (super, sub, smallcaps, superSmall, subSmall, alternate)
- [x] tiny-text: 12 fonts + 6 types (super, sub, smallcaps, alternate, superCaps, subCaps)
- [x] big-text: 12 fonts + 8 text styles (upper, bold, wide, normal, lower, alternating, random, title) + spacing
- [x] superscript: 12 fonts + 4 modes (super, sub, alternate, wordAlternate)
- [x] upside-down-text: 12 fonts + 3 rotation angles + mirror toggle
- [x] mirror-text: 12 fonts + 5 directions (horizontal, vertical, both, wordReverse, lineReverse)
- [x] space-remover: 12 fonts + 5 modes (all, extra, trim, dash, underscore)
- [x] text-cleaner: 12 fonts + 10 clean types (special, numbers, punctuation, all, emojis, html, urls, whitespace, diacritics, nonascii)
- [x] sentence-case: 12 fonts + 8 case types (sentence, title, lower, upper, alternating, inverse, random, camel)
- [x] character-counter: 12 output font styles + detailed stats toggle
- [x] invisible-character: 12 fonts + 8 invisible char types (zwsp, zwj, zwnj, hair, thin, sixPerEm, separator, wordJoiner)

## Phase 5: Translators ✅ COMPLETE

- [x] reverse-text: 12 font styles + 5 reverse modes (entire, words, vertical, lines, sentences)
- [x] caesar-cipher: 12 font styles + 3 alphabet sets (standard, ASCII, alphanumeric) + shift slider + encode/decode
- [x] rot13: 12 font styles + 4 rotation variants (ROT13, ROT5, ROT18, ROT47)
- [x] nato-phonetic: 12 font styles + 5 phonetic alphabets (NATO, US Military, Royal Navy, Western Union, German) + 6 separators + show original toggle
- [x] atbash: 12 font styles + include numbers toggle + maintain case toggle
- [x] leetspeak: 12 font styles + 5 levels (basic, advanced, elite, ultra, random) + 4 caps modes
- [x] hex-code: encode/decode mode + 6 separators + 5 output formats (raw, CSS color, HTML entities, URL encoded, C-style)
- [x] base64: 4 encoding variants (Standard, Base32, URL encoding, ASCII85) + URL safe + padding + line breaks toggles
- [x] morse-code, wingdings, runic, old-english, sign-language, braille, binary: Already expanded in previous phases

## Phase 6: Global Features (ALL tools) ✅ COMPLETE

- [x] Download as Image (text → PNG with dark bg, accent border, TypeWarp branding, uses output color)
- [x] Copy History (saves last 5 copies with timestamps, re-copy from history)
- [x] Character Counter + Platform Limits (Twitter/X 280, Instagram Bio 150, Instagram Caption 2200, Discord 2000, TikTok Bio 80, TikTok Caption 2200, YouTube Title 100, Facebook 63206, LinkedIn 3000, WhatsApp 139, Reddit Title 300) with progress bars
- [x] Global Overrides section with labeled header
