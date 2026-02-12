"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { LangToggle } from "./lang-toggle";
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
  const pathname = usePathname();
  const isPostsPage = /^\/posts(\/|$)/.test(pathname) || /^\/ko\/posts(\/|$)/.test(pathname);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Ji_Min_Lee_resume2.11.pdf";
    link.download = "Ji_Min_Lee_resume.pdf";
    link.click();
    setShowDownloadModal(false);
  };

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="flex justify-between items-center lg:sticky lg:top-20 relative">
        <nav className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative w-full" id="nav">
          <div className="flex flex-row space-x-0 pr-10 w-full">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link key={path} href={path} className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1">
                  {name}
                </Link>
              );
            })}
            <button
              onClick={() => setShowDownloadModal(true)}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
            >
              resume
            </button>
          </div>
        </nav>
        {/* Responsive: absolutely position on small screens to prevent overflow */}
        <div className="flex items-center gap-1 min-w-0 max-w-full flex-shrink-0 overflow-visible absolute right-2 top-2 sm:static sm:right-auto sm:top-auto">
          <div className="flex items-center gap-1 w-full max-w-[96px] sm:max-w-none">
            {isPostsPage && <LangToggle />}
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowDownloadModal(false)}
        >
          <div
            className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-neutral-900 dark:text-neutral-100 mb-4">
              Download resume?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-2 rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
