import { useState, useCallback, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Photo } from "@/types";

interface PhotoLightboxProps {
  photos: Photo[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function PhotoLightbox({ photos, initialIndex, open, onClose, onIndexChange }: PhotoLightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  const handleIndexChange = useCallback(
    (i: number) => {
      setIndex(i);
      onIndexChange?.(i);
    },
    [onIndexChange],
  );

  const slides = photos.map((p) => ({
    src: p.url,
    width: p.width,
    height: p.height,
  }));

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      onIndexChange={handleIndexChange}
      // 滚动预加载配置：预加载当前图片前后各 3 张
      preload={3}
      // 轮播配置
      carousel={{
        finite: false,
        preload: 3,
        animation: 300,
      }}
      // 缩放配置
      zoom={{
        maxZoomPixelRatio: 5,
        zoomInMultiplier: 1.5,
        doubleClickDelay: 300,
        doubleTapDelay: 300,
      }}
      // 幻灯片配置
      slideshow={{
        autoplay: true,
        delay: 3000,
      }}
      // 缩略图配置（仅显示图片，不显示标签和名称）
      thumbnails={{
        position: "bottom",
        width: 80,
        height: 60,
        gap: 4,
      }}
      // 插件
      plugins={[Zoom, Thumbnails, Fullscreen, Slideshow]}
      // 工具栏按钮
      toolbar={{
        buttons: ["close", "zoom-in", "zoom-out", "download", "fullscreen", "slideshow"],
      }}
      // 国际化
      locales={{
        zoom_in: "放大",
        zoom_out: "缩小",
        fullscreen: "全屏",
        slideshow: "幻灯片",
        download: "下载",
        close: "关闭",
        next: "下一张",
        previous: "上一张",
        loading: "加载中...",
      }}
    />
  );
}
