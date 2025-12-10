import { useState, useEffect, useMemo, useRef, RefObject } from "react";

type ScrollDirection = "up" | "down" | null;

interface UseElementTrackerOptions {
  threshold?: number;
  targetKeys?: string | string[];
}

interface ElementTrackerState {
  scrollDirection: ScrollDirection;
  pressedKey: string | null;
}

export function useElementTracker(
  elementRef: RefObject<HTMLElement>,
  options: UseElementTrackerOptions = {}
): ElementTrackerState {
  const { threshold = 0, targetKeys = [] } = options;
  const keys = useMemo(() => 
    Array.isArray(targetKeys) ? targetKeys : [targetKeys], 
    [targetKeys]
  );

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Scroll tracking
    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      if (Math.abs(scrollTop - lastScrollTopRef.current) < threshold) return;

      setScrollDirection(scrollTop > lastScrollTopRef.current ? "down" : "up");
      lastScrollTopRef.current = scrollTop;
    };

    // Key tracking
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) setPressedKey(e.key);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) setPressedKey(null);
    };

    el.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [elementRef, threshold, keys]);

  return { scrollDirection, pressedKey };
}
