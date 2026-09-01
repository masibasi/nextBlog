import Link from "next/link";

const LINK_CLASS =
  "text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-7 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} Ji Min Lee &middot; MIT Licensed
        </p>
        <div className="flex gap-5">
          {[
            // route: client-side nav, so the homepage booking section is one
            // hop away from every page
            { label: "Book a chat", href: "/#contact", external: false, route: true },
            { label: "RSS", href: "/rss", external: false, route: false },
            { label: "GitHub", href: "https://github.com/masibasi", external: true, route: false },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/jiminlee4015/", external: true, route: false },
            { label: "Email", href: "mailto:leejimin@usc.edu", external: false, route: false },
          ].map(({ label, href, external, route }) =>
            route ? (
              <Link key={label} href={href} className={LINK_CLASS}>
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={LINK_CLASS}
              >
                {label}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
