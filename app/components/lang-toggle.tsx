"use client";
import { usePathname, useRouter } from "next/navigation";

export function LangToggle() {
  const pathname = usePathname();
  const router = useRouter();

  const isKorean = pathname.startsWith("/ko");
  const isPostsPage = /^\/posts(\/|$)/.test(pathname) || /^\/ko\/posts(\/|$)/.test(pathname);
  const targetPath = isKorean ? pathname.replace(/^\/ko/, "") || "/" : "/ko" + pathname;
  const [localKorean, setLocalKorean] = require('react').useState(isKorean);

  require('react').useEffect(() => {
    setLocalKorean(isKorean);
  }, [isKorean]);

  // On posts pages, change route. On others, just toggle local state.
  const handleClick = () => {
    if (isPostsPage) {
      router.push(targetPath);
    } else {
      setLocalKorean((prev) => !prev);
    }
  };

  // Show 'EN' when in Korean, 'KO' when in English, but allow local toggle on non-posts pages
  return (
    <button
      onClick={handleClick}
      className="ml-1 px-1.5 py-0.5 rounded text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label="Toggle language"
      style={{ minWidth: 32 }}
    >
      {localKorean ? "EN" : "KO"}
    </button>
  );
}
