# TypeWarp

> The professional-grade cursed text and glitchy typography toolkit for digital architects.

TypeWarp is a comprehensive text transformation platform offering **66+ tools** across 6 categories. Generate cursed text, Zalgo script, glitchy fonts, fancy text styles, and encode/decode text in various formats.

![TypeWarp](public/og-image.png)

## Features

### Dark & Horror (13 tools)

Unleash chaos with cursed, zalgo, and glitch text generators. Perfect for creating eerie, corrupted, or unsettling typography.

### Social Fonts (7 tools)

Perfect fonts for Instagram, Discord, TikTok, Twitter, Facebook, and gaming platforms. Stand out on social media with unique text styles.

### Style & Fancy (10 tools)

Aesthetic, vaporwave, and stylish text designs. Create beautiful calligraphy, cursive, bubble text, and more.

### Text Tools (15 tools)

Essential text formatting and manipulation tools including bold, italic, underline, strikethrough, small text, mirror text, and character counters.

### Symbols (5 tools)

Special characters, emoticons, aesthetic symbols, and the famous Lenny Face generator.

### Translators (16 tools)

Convert text to Morse code, binary, braille, Base64, hex, and more. Includes cipher tools like Caesar cipher, ROT13, and Atbash.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Content**: MDX with syntax highlighting (Shiki)
- **Icons**: Lucide React & Heroicons
- **Smooth Scrolling**: Lenis

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/typewarp.git
cd typewarp

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    [category]/           # Dynamic category pages
    [category]/[tool]/    # Dynamic tool pages
    about/                # About page
    arsenal/              # All tools overview
    blog/                 # Blog section
    contact/              # Contact page
    privacy/              # Privacy policy
    terms/                # Terms of service
  components/             # React components
    ui/                   # UI components (ToolCard, CyberInput, etc.)
    BackgroundEffect.tsx  # Animated background
    Footer.tsx            # Site footer
    Header.tsx            # Navigation header
    Hero.tsx              # Homepage hero section
    ToolView.tsx          # Tool interface component
  content/
    blog/                 # MDX blog posts
    tools/                # MDX tool content
  lib/                    # Utility functions
    categories.ts         # Tool categories & definitions
    tools.ts              # Tool content loader
    blog.ts               # Blog content loader
```

## Adding New Tools

1. Create a new MDX file in `src/content/tools/your-tool-slug.mdx`
2. Add frontmatter with tool metadata:
   ```mdx
   ---
   title: "Your Tool Name"
   description: "Tool description"
   category: "category-slug"
   ---
   ```
3. Add the tool definition in `src/lib/categories.ts`

## Features Highlights

- **Real-time Preview**: See transformations instantly as you type
- **Copy to Clipboard**: One-click copy functionality
- **Dark Theme**: Cyberpunk-inspired design with glitch aesthetics
- **Responsive**: Fully responsive design for all devices
- **SEO Optimized**: Structured data, Open Graph, and Twitter cards
- **Blog Section**: Guides and tutorials for text transformation

## License

This project is private and proprietary.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
