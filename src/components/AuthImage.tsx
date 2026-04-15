import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AuthImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// 生成鉴权参数
function generateAuthParams(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const token = btoa(`${timestamp}-kindergarten-2024`).substring(0, 16);
  return `t=${timestamp}&token=${token}`;
}

function addAuth(url: string): string {
  if (!url) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${generateAuthParams()}`;
}

export function AuthImage({ src, alt, className, onLoad, onError }: AuthImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [authSrc, setAuthSrc] = useState("");

  useEffect(() => {
    setAuthSrc(addAuth(src));
    setLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
    onError?.();
  };

  return (
    <div className="relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-xs text-muted-foreground">
          加载失败
        </div>
      )}
      <img
        src={authSrc}
        alt={alt}
        className={cn("transition-opacity duration-300", loading ? "opacity-0" : "opacity-100", className)}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
