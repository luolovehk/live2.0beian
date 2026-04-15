import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TagFilterProps {
  tags: string[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selected, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag className="h-4 w-4 text-muted-foreground" />
      <Badge
        variant={selected === null ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => onSelect(null)}
      >
        全部
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selected === tag ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSelect(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
