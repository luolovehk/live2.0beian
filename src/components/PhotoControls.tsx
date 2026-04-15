import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List, Columns } from "lucide-react";
import type { ViewMode } from "@/components/PhotoGallery";

interface PhotoControlsProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function PhotoControls({ tags, selectedTag, onTagSelect, viewMode, onViewModeChange }: PhotoControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedTag === null
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground hover:bg-accent/80"
          }`}
          onClick={() => onTagSelect(null)}
        >
          全部
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedTag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground hover:bg-accent/80"
            }`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* View mode */}
      <Tabs value={viewMode} onValueChange={(v) => onViewModeChange(v as ViewMode)}>
        <TabsList className="grid h-9 w-[160px] grid-cols-3">
          <TabsTrigger value="masonry" className="p-0">
            <Columns className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="grid" className="p-0">
            <LayoutGrid className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="list" className="p-0">
            <List className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
