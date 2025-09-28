"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import type { TOCItemType } from "fumadocs-core/server";
import { TOCProvider, TOCScrollArea, TOCItems } from "./toc";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { useActiveAnchor } from "fumadocs-core/toc";

interface CollapsibleTOCProps {
  toc: TOCItemType[];
  className?: string;
}

function TOCTriggerContent({ toc }: { toc: TOCItemType[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeAnchor = useActiveAnchor();

  const currentSection = useMemo(() => {
    if (!activeAnchor || !toc.length) return "Table of Contents";

    const activeItem = toc.find((item) => item.url.slice(1) === activeAnchor);
    return activeItem ? activeItem.title : "Table of Contents";
  }, [activeAnchor, toc]);

  return (
    <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent/50 transition-colors">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-2 h-2 rounded-full bg-fd-primary flex-shrink-0" />
        <span className="truncate">{currentSection}</span>
      </div>
      <ChevronDown className="w-4 h-4 transition-transform duration-200 flex-shrink-0 data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
  );
}

export function CollapsibleTOC({ toc, className }: CollapsibleTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <div className={cn("lg:hidden", className)}>
      {/* Fixed Header */}
      <TOCProvider toc={toc}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="fixed top-14 left-0 right-0 z-50 bg-fd-background/80 backdrop-blur-sm border-b">
            <TOCTriggerContent toc={toc} />

            <CollapsibleContent className="border-t bg-fd-background/95">
              <div className="p-4 max-h-[50vh]">
                <TOCScrollArea className="max-h-[40vh]">
                  <TOCItems />
                </TOCScrollArea>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </TOCProvider>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className={cn("h-12", isOpen && "mb-4")} />

      {/* Backdrop for closing when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
