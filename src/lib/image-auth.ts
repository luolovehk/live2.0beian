// 图片鉴权管理器
class ImageAuthManager {
  private cache: Map<string, { url: string; expiresAt: number }> = new Map();
  private ttl: number; // Token 有效期（秒）

  constructor(ttl: number = 3600) {
    this.ttl = ttl;
  }

  // 生成鉴权参数
  private generateAuthParams(): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const token = btoa(`${timestamp}-kindergarten-2024-secret`).substring(0, 24);
    return `t=${timestamp}&token=${token}`;
  }

  // 获取带鉴权的 URL
  getAuthUrl(originalUrl: string): string {
    // 检查缓存
    const cached = this.cache.get(originalUrl);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.url;
    }

    // 生成新的鉴权 URL
    const separator = originalUrl.includes("?") ? "&" : "?";
    const authParams = this.generateAuthParams();
    const authUrl = `${originalUrl}${separator}${authParams}`;

    // 缓存
    this.cache.set(originalUrl, {
      url: authUrl,
      expiresAt: Date.now() + this.ttl * 1000,
    });

    return authUrl;
  }

  // 批量处理
  getAuthUrls(urls: string[]): string[] {
    return urls.map((url) => this.getAuthUrl(url));
  }

  // 清除缓存
  clearCache(): void {
    this.cache.clear();
  }
}

// 导出单例
export const imageAuthManager = new ImageAuthManager();

// 便捷函数
export function getAuthImageUrl(url: string): string {
  return imageAuthManager.getAuthUrl(url);
}

export function getAuthImageUrls(urls: string[]): string[] {
  return imageAuthManager.getAuthUrls(urls);
}
