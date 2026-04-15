export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  tags: string[];
  width: number;
  height: number;
  uploadedAt: string;
  isNew?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  coverUrl: string;
  schedule: { time: string; title: string }[];
  photos: Photo[];
}

export type LayoutMode = "grid" | "list" | "masonry";
