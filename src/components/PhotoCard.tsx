import { Share2, Download, ZoomIn, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Photo } from "@/types";

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
  layout: "grid" | "list" | "masonry";
  showInfo?: boolean;
}

export function PhotoCard({ photo, onClick, layout, showInfo = true }: PhotoCardProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: photo.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("链接已复制到剪贴板");
      });
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = photo.url;
    a.download = photo.title;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("开始下载照片");
  };

  if (layout === "list") {
    return (
      <div
        className="group flex cursor-pointer gap-4 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md"
        onClick={onClick}
      >
        <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {photo.isNew && (
            <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              新
            </span>
          )}
        </div>
        {showInfo && (
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <h3 className="truncate font-medium text-card-foreground">{photo.title}</h3>
              <div className="mt-1 flex flex-wrap gap-1">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(photo.uploadedAt).toLocaleDateString("zh-CN")}
              </span>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleShare}>
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleDownload}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const isMasonry = layout === "masonry";

  return (
    <div
      className={`group relative cursor-pointer rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md ${
        isMasonry ? "" : "overflow-hidden"
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={photo.thumbnailUrl}
          alt={photo.title}
          className={`block w-full transition-transform duration-500 group-hover:scale-105 ${
            isMasonry ? "h-auto" : "h-auto object-cover"
          }`}
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          loading="lazy"
        />
        {photo.isNew && (
          <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            新
          </span>
        )}
        {/* Overlay & actions - only for grid */}
        {!isMasonry && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex gap-1.5">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  <ZoomIn className="h-4 w-4 text-white" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 text-white" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 text-white" />
                </Button>
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success("已收藏照片");
                }}
              >
                <Heart className="h-4 w-4 text-white" />
              </Button>
            </div>
          </>
        )}
      </div>
      {showInfo && (
        <div className="p-3">
          <h3 className="truncate text-sm font-medium text-card-foreground">{photo.title}</h3>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {photo.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
