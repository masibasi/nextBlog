// Fired when the visitor signals intent to book (hover/focus on the hero
// badge), so CalendlySection can start loading before the scroll lands.
export const CALENDLY_PRELOAD = "calendly:preload";

export function preloadCalendly() {
  window.dispatchEvent(new Event(CALENDLY_PRELOAD));
}

// Scoped smooth scroll rather than `html { scroll-behavior: smooth }`, which
// would also animate App Router's scroll-to-top on every route change.
export function scrollToContact() {
  const el = document.getElementById("contact");
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
