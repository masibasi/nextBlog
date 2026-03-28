"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { LangToggle } from "./lang-toggle";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/projects", name: "projects" },
  { path: "/posts", name: "posts" },
  { path: "/about", name: "about" },
  { path: "/resume", name: "resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isPostsPage = /^\/posts(\/|$)/.test(pathname) || /^\/ko\/posts(\/|$)/.test(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-300 ${
        scrolled
          ? "border-b border-neutral-200/60 dark:border-neutral-800/60"
          : "border-b border-transparent"
      } bg-[#f9f8f4]/85 dark:bg-neutral-950/85 backdrop-blur-xl`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-12 h-full flex items-center justify-between gap-2">
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-[16px] sm:text-[18px] tracking-[-0.01em] text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity shrink-0"
        >
          Ji Min Lee
        </Link>

        {/* Nav links + controls */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-0">
            {navItems.map(({ path, name }) => {
              const isActive = pathname.startsWith(path);
              return (
                <Link
                  key={path}
                  href={path}
                  className={`relative px-2 sm:px-3 py-1.5 text-[12px] sm:text-[13px] tracking-[0.02em] transition-colors ${
                    isActive
                      ? "text-cardinal-700 dark:text-cardinal-400"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  {name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-px rounded-full bg-cardinal-700 dark:bg-cardinal-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div
              className={`transition-opacity duration-150 ${
                isPostsPage ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <LangToggle />
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
