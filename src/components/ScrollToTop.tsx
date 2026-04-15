import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  threshold?: number;
  currentCount?: number;
  totalCount?: number;
}

const SCROLL_STOP_DELAY = 800;

export function ScrollToTop({ threshold = 400, currentCount, totalCount }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
      setIsScrolling(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_STOP_DELAY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showCount = currentCount !== undefined && totalCount !== undefined && totalCount > 0;
  const displayCount = showCount && isScrolling;

  return (
    <Button
      className={cn(
        "fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-xl rounded-r-none shadow-lg transition-all duration-300",
        "flex h-10 w-24 items-center justify-center gap-1.5",
        visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0",
      )}
      onClick={scrollToTop}
    >
      <ArrowUp className="h-4 w-4" />
      {displayCount && (
        <span className="text-[11px] font-medium leading-tight">
          {currentCount}/{totalCount}
        </span>
      )}
    </Button>
  );
}
