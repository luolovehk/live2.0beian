import { LayoutGrid, List, Columns } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutMode } from "@/types";

interface LayoutSwitcherProps {
  value: LayoutMode;
  onChange: (mode: LayoutMode) => void;
}

export function LayoutSwitcher({ value, onChange }: LayoutSwitcherProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as LayoutMode)}
      className="gap-1"
    >
      <ToggleGroupItem value="grid" aria-label="网格布局" className="h-9 w-9 rounded-lg">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="masonry" aria-label="瀑布流布局" className="h-9 w-9 rounded-lg">
        <Columns className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="列表布局" className="h-9 w-9 rounded-lg">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
