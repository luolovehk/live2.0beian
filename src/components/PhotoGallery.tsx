import { useMemo, useEffect, useRef, useState, forwardRef } from "react";
import { Photo } from "@/types";
import { PhotoCard } from "@/components/PhotoCard";

export type ViewMode = "grid" | "list" | "masonry";

interface PhotoGalleryProps {
  photos: Photo[];
  viewMode: ViewMode;
  showInfo?: boolean;
  onPhotoClick: (index: number) => void;
}

function getColumnCount(width: number): number {
  if (width >= 1024) return 5;
  if (width >= 768) return 4;
  if (width >= 640) return 3;
  return 2;
}

export const PhotoGallery = forwardRef<HTMLDivElement, PhotoGalleryProps>(
  ({ photos, viewMode, showInfo = true, onPhotoClick }, ref) => {
    const [columnCount, setColumnCount] = useState(2);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const updateColumns = () => {
        if (containerRef.current) {
          setColumnCount(getColumnCount(containerRef.current.offsetWidth));
        }
      };
      updateColumns();
      window.addEventListener("resize", updateColumns);
      return () => window.removeEventListener("resize", updateColumns);
    }, [viewMode]);

    const renderGrid = () => (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((photo, index) => (
          <div key={photo.id} data-photo-card={photo.id}>
            <PhotoCard
              photo={photo}
              layout="grid"
              showInfo={showInfo}
              onClick={() => onPhotoClick(index)}
            />
          </div>
        ))}
      </div>
    );

    const renderList = () => (
      <div className="flex flex-col gap-3">
        {photos.map((photo, index) => (
          <div key={photo.id} data-photo-card={photo.id}>
            <PhotoCard
              photo={photo}
              layout="list"
              showInfo={showInfo}
              onClick={() => onPhotoClick(index)}
            />
          </div>
        ))}
      </div>
    );

    const renderMasonry = useMemo(() => {
      // 分配照片到各列
      const columns: { height: number; photos: { photo: Photo; index: number }[] }[] = Array.from(
        { length: columnCount },
        () => ({ height: 0, photos: [] }),
      );

      photos.forEach((photo, index) => {
        const aspectRatio = photo.height / photo.width;
        const shortestCol = columns.reduce((min, col, i) =>
          col.height < columns[min].height ? i : min,
        0);
        columns[shortestCol].height += aspectRatio;
        columns[shortestCol].photos.push({ photo, index });
      });

      return (
        <div className="flex gap-3">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex-1 space-y-3">
              {col.photos.map(({ photo, index }) => (
                <div key={photo.id} data-photo-card={photo.id}>
                  <PhotoCard
                    photo={photo}
                    layout="masonry"
                    showInfo={showInfo}
                    onClick={() => onPhotoClick(index)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }, [photos, columnCount, showInfo, onPhotoClick]);

    const renderContent = () => {
      switch (viewMode) {
        case "grid":
          return renderGrid();
        case "list":
          return renderList();
        case "masonry":
          return renderMasonry;
        default:
          return renderGrid();
      }
    };

    return (
      <div ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}>
        {renderContent()}
      </div>
    );
  },
);

PhotoGallery.displayName = "PhotoGallery";
