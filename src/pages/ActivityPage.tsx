import { useState, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getActivityById } from "@/data/mock-data";
import { EventHeader } from "@/components/EventHeader";
import { PhotoGallery, ViewMode } from "@/components/PhotoGallery";
import { PhotoControls } from "@/components/PhotoControls";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { NewPhotosAlert } from "@/components/NewPhotosAlert";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useEventPage } from "@/hooks/use-event-page";
import { useVisiblePhotos } from "@/hooks/use-visible-photos";

export function ActivityPage() {
  const { id } = useParams<{ id: string }>();
  const activity = getActivityById(id || "");

  const [viewMode, setViewMode] = useState<ViewMode>("masonry");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryRef = useRef<HTMLDivElement>(null);

  if (!activity) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">活动不存在</p>
        <Link to="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    );
  }

  const {
    selectedTag,
    setSelectedTag,
    hasNewPhotos,
    allTags,
    filteredPhotos,
    newPhotosCount,
    dismissAlert,
  } = useEventPage({ photos: activity.photos });

  const visibleCount = useVisiblePhotos({
    containerRef: galleryRef,
    totalCount: filteredPhotos.length,
  });

  const handlePhotoClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Cover & Header */}
      <EventHeader
        title={activity.title}
        date={activity.date}
        location={activity.location}
        description={activity.description}
        photoCount={activity.photos.length}
        schedule={activity.schedule}
        coverUrl={activity.coverUrl}
      />

      {/* Controls & Gallery */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        {/* Back link */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> 返回作品列表
        </Link>

        {/* New photos alert */}
        {hasNewPhotos && (
          <NewPhotosAlert
            photos={activity.photos.slice(0, newPhotosCount)}
            onDismiss={dismissAlert}
          />
        )}

        {/* Controls */}
        <div className="mb-6">
          <PhotoControls
            tags={allTags}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Gallery */}
        {filteredPhotos.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">没有找到符合条件的作品</p>
          </div>
        ) : (
          <PhotoGallery
            ref={galleryRef}
            photos={filteredPhotos}
            viewMode={viewMode}
            showInfo={false}
            onPhotoClick={handlePhotoClick}
          />
        )}
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        photos={filteredPhotos}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />

      <ScrollToTop currentCount={visibleCount} totalCount={filteredPhotos.length} />
    </div>
  );
}
