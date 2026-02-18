"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { LangToggle } from "./lang-toggle";
import { usePathname } from "next/navigation";

const navItems = {
  "/": { name: "home" },
  "/posts": { name: "posts" },
  "/projects": { name: "projects" },
  "/about": { name: "about" },
  "/resume": { name: "resume" },
};

export function Navbar() {
  const pathname = usePathname();
  const isPostsPage = /^\/posts(\/|$)/.test(pathname) || /^\/ko\/posts(\/|$)/.test(pathname);

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="flex justify-between items-center lg:sticky lg:top-20 relative">
        <nav className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative w-full" id="nav">
          <div className="flex flex-row space-x-0 pr-10 w-full">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path || (path !== "/" && pathname?.startsWith(path));
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 ${
                    isActive ? "font-semibold underline underline-offset-4" : ""
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="flex items-center gap-1 min-w-0 max-w-full flex-shrink-0 overflow-visible absolute right-2 top-2 sm:static sm:right-auto sm:top-auto">
          <div className="flex items-center gap-1 w-full max-w-[96px] sm:max-w-none">
            {isPostsPage && <LangToggle />}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </aside>
  );
}
