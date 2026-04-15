import { Bell } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Photo } from "@/types";

interface NewPhotosAlertProps {
  photos: Photo[];
  onDismiss: () => void;
}

export function NewPhotosAlert({ photos, onDismiss }: NewPhotosAlertProps) {
  const newPhotos = photos.filter((p) => p.isNew);
  if (newPhotos.length === 0) return null;

  return (
    <Alert className="mb-6 border-primary/20 bg-primary/5">
      <Bell className="h-5 w-5 text-primary" />
      <div className="flex w-full items-start justify-between">
        <div>
          <AlertTitle className="text-primary">📸 新照片已上传</AlertTitle>
          <AlertDescription className="mt-1 text-muted-foreground">
            有 {newPhotos.length} 张新照片，快来看看吧！
          </AlertDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={onDismiss} className="ml-4 flex-shrink-0">
          知道了
        </Button>
      </div>
    </Alert>
  );
}
