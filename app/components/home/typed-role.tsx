"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  roles: string[];
};

export function TypedRole({ roles }: Props) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [roleIndex, setRoleIndex] = useState(0);
  const charIndex = useRef(0);

  useEffect(() => {
    const current = roles[roleIndex];

    if (phase === "typing") {
      if (charIndex.current < current.length) {
        const t = setTimeout(() => {
          charIndex.current += 1;
          setDisplayText(current.slice(0, charIndex.current));
        }, 85);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), 1800);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 200);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (charIndex.current > 0) {
        const t = setTimeout(() => {
          charIndex.current -= 1;
          setDisplayText(current.slice(0, charIndex.current));
        }, 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setPhase("typing");
        }, 300);
        return () => clearTimeout(t);
      }
    }
  }, [phase, roleIndex, roles]);

  return (
    <span>
      {displayText}
      <span className="inline-block w-[2px] h-[1em] ml-0.5 align-middle bg-cardinal-700 dark:bg-cardinal-400 animate-pulse" />
    </span>
  );
}
