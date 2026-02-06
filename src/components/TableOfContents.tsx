import Link from "next/link";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="mb-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden self-start sticky top-32">
      <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        Table of Contents
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium border-l-2 border-transparent hover:border-red-500 pl-3 block"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
