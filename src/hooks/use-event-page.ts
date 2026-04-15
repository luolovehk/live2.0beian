import { useState, useMemo, useEffect, useCallback } from "react";
import { Photo } from "@/types";

interface UseEventPageOptions {
  photos: Photo[];
  checkInterval?: number;
}

export function useEventPage({ photos, checkInterval = 30000 }: UseEventPageOptions) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [hasNewPhotos, setHasNewPhotos] = useState(false);
  const [photoCount, setPhotoCount] = useState(photos.length);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    photos.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (!selectedTag) return photos;
    return photos.filter((p) => p.tags.includes(selectedTag));
  }, [photos, selectedTag]);

  const newPhotosCount = useMemo(() => {
    return photos.filter((p) => p.isNew).length;
  }, [photos]);

  // Simulate checking for new photos
  useEffect(() => {
    if (newPhotosCount > 0 && !alertDismissed) {
      setHasNewPhotos(true);
    }
  }, [newPhotosCount, alertDismissed]);

  // Periodic check simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // In real app, this would fetch from API
      const currentCount = photos.length;
      if (currentCount > photoCount) {
        setPhotoCount(currentCount);
        setHasNewPhotos(true);
        setAlertDismissed(false);
      }
    }, checkInterval);

    return () => clearInterval(interval);
  }, [photoCount, photos.length, checkInterval]);

  const dismissAlert = useCallback(() => {
    setAlertDismissed(true);
    setHasNewPhotos(false);
  }, []);

  return {
    selectedTag,
    setSelectedTag,
    alertDismissed,
    setAlertDismissed,
    hasNewPhotos,
    allTags,
    filteredPhotos,
    newPhotosCount,
    dismissAlert,
  };
}
