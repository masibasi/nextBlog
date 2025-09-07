"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "../components/theme-switcher";
import { LangToggle } from "../components/lang-toggle";
import { usePathname } from "next/navigation";

const navItems = {
  "/": {
    name: "home",
  },
  "/posts": {
    name: "posts",
  },
  "/about": {
    name: "about",
  },
  "/projects": {
    name: "projects",
  },
};

export function Navbar() {
  const handleResumeClick = (e: React.MouseEvent) => {
    const link = document.createElement("a");
    link.href = "/Ji_Min_Lee_Resume_SWE.pdf";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pathname = usePathname();
  const isPostsPage = /^\/posts(\/|$)/.test(pathname) || /^\/ko\/posts(\/|$)/.test(pathname);

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="flex justify-between lg:sticky lg:top-20">
        <nav className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative" id="nav">
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link key={path} href={path} className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1">
                  {name}
                </Link>
              );
            })}
            <div className="relative">
              <button onClick={handleResumeClick} className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1">
                resume
              </button>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-1 min-w-0">
          {isPostsPage && <LangToggle />}
          <ThemeSwitcher />
        </div>
      </div>
    </aside>
  );
}
