'use client';

import { AnchorProvider, ScrollProvider, TOCItem } from 'fumadocs-core/toc';
import { useRef, useState } from 'react';
import type { TOCItemType } from 'fumadocs-core/server';

interface TOCProps {
  items: TOCItemType[];
}

export function TableOfContents({ items }: TOCProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <AnchorProvider toc={items}>
      {/* Mobile TOC Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-fd-secondary rounded-md hover:bg-fd-secondary/80 transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Table of Contents
        </button>

        {isOpen && (
          <div className="mt-2 p-4 bg-fd-secondary rounded-md">
            <div
              ref={containerRef}
              className="max-h-64 overflow-auto"
            >
              <ScrollProvider containerRef={containerRef}>
                <nav className="space-y-1">
                  {items.map((item) => (
                    <TOCItem
                      key={item.url}
                      href={item.url}
                      className="block py-1 px-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors data-[active=true]:text-fd-primary data-[active=true]:font-medium rounded-md hover:bg-fd-accent"
                      style={{
                        paddingLeft: `${Math.max(item.depth - 1, 0) * 12 + 8}px`,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </TOCItem>
                  ))}
                </nav>
              </ScrollProvider>
            </div>
          </div>
        )}
      </div>

      {/* Desktop TOC */}
      <div className="hidden lg:block sticky top-20 h-fit">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-fd-foreground mb-2">
            On This Page
          </h3>
        </div>
        <div
          ref={containerRef}
          className="max-h-[calc(100vh-8rem)] overflow-auto"
        >
          <ScrollProvider containerRef={containerRef}>
            <nav className="space-y-1">
              {items.map((item) => (
                <TOCItem
                  key={item.url}
                  href={item.url}
                  className="block py-1 px-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors data-[active=true]:text-fd-primary data-[active=true]:font-medium rounded-md hover:bg-fd-accent"
                  style={{
                    paddingLeft: `${Math.max(item.depth - 1, 0) * 12 + 8}px`,
                  }}
                >
                  {item.title}
                </TOCItem>
              ))}
            </nav>
          </ScrollProvider>
        </div>
      </div>
    </AnchorProvider>
  );
}
