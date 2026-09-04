"use client";

import { preloadCalendly, scrollToContact } from "app/lib/scroll";

// One button, two placements: a floating badge on the photo card at lg+, and a
// pill in the CTA row below that — where the stacked mobile layout pushes the
// photo (and anything pinned to it) past the fold.
export function BookChatButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={scrollToContact}
      onMouseEnter={preloadCalendly}
      onFocus={preloadCalendly}
      className={`group inline-flex items-center gap-1.5 rounded-full bg-cardinal-700 dark:bg-cardinal-400 text-white dark:text-neutral-900 pl-4 pr-3.5 py-2.5 text-[13px] font-medium tracking-[0.02em] hover:bg-cardinal-800 dark:hover:bg-cardinal-300 transition-all duration-200 ${className}`}
    >
      Book a chat
      <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
    </button>
  );
}
