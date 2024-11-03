"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Authentication", href: "/docs/authentication" },
      { title: "Rate Limits", href: "/docs/rate-limits" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Chat", href: "/docs/api-reference/minds/chat" },
      { title: "Minds", href: "/docs/api-reference/minds" },
      { title: "Error Handling", href: "/docs/api-reference/errors" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Streaming Responses", href: "/docs/guides/streaming" },
      { title: "Managing Conversations", href: "/docs/guides/conversations" },
      { title: "Best Practices", href: "/docs/guides/best-practices" },
    ],
  },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 pr-8 space-y-6">
      {navItems.map((section) => (
        <div key={section.title} className="space-y-3">
          <h4 className="font-semibold text-sm">{section.title}</h4>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm ${
                  pathname === item.href 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
} 