import { useState, useEffect, useRef, useCallback } from "react";

interface UseVisiblePhotosOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  totalCount: number;
}

/**
 * 根据滚动位置计算当前已浏览到的照片数量
 */
export function useVisiblePhotos({ containerRef, totalCount }: UseVisiblePhotosOptions) {
  const [visibleCount, setVisibleCount] = useState(0);
  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || totalCount === 0) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = rect.height;
    const viewportBottom = window.scrollY + window.innerHeight;

    // 计算照片容器内已滚动过的比例
    const scrollInContainer = viewportBottom - containerTop;
    const ratio = Math.min(Math.max(scrollInContainer / containerHeight, 0), 1);
    const count = Math.max(1, Math.ceil(ratio * totalCount));

    setVisibleCount(count);
  }, [containerRef, totalCount]);

  useEffect(() => {
    if (!containerRef.current || totalCount === 0) {
      setVisibleCount(0);
      return;
    }

    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          handleScroll();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // 初始计算
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef, totalCount, handleScroll]);

  return visibleCount;
}
