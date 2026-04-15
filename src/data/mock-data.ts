import { Activity, Photo } from "@/types";

// Generate a secure-ish token for URL auth
function generateAuthParams(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const token = btoa(`${timestamp}-personal-website-2024`).substring(0, 16);
  return `t=${timestamp}&token=${token}`;
}

function addAuth(url: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${generateAuthParams()}`;
}

function generatePhotos(count: number, prefix: string): Photo[] {
  const tags = ["风景", "人像", "街拍", "建筑", "自然", "旅行", "生活", "艺术"];
  const photos: Photo[] = [];

  for (let i = 0; i < count; i++) {
    const w = 400 + Math.floor(Math.random() * 200);
    const h = 300 + Math.floor(Math.random() * 300);
    const seed = `${prefix}-${i}`;
    const baseThumb = `https://picsum.photos/seed/${seed}/${w}/${h}`;
    const baseFull = `https://picsum.photos/seed/${seed}/1200/900`;

    photos.push({
      id: `${prefix}-${i}`,
      url: addAuth(baseFull),
      thumbnailUrl: addAuth(baseThumb),
      title: `${prefix} - 作品 ${i + 1}`,
      tags: [tags[Math.floor(Math.random() * tags.length)], tags[Math.floor(Math.random() * tags.length)]],
      width: w,
      height: h,
      uploadedAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
      isNew: i < 3,
    });
  }
  return photos;
}

export const activities: Activity[] = [
  {
    id: "graduation",
    title: "🎓 毕业旅行记录",
    date: "2024-07-15",
    location: "云南大理",
    description:
      "毕业季的旅行，记录下青春最美的时光。在旅途中感受自然的魅力，留下珍贵的回忆。",
    coverUrl: "https://picsum.photos/seed/graduation-cover/1200/600",
    schedule: [
      { time: "Day 1", title: "抵达大理" },
      { time: "Day 2", title: "洱海环游" },
      { time: "Day 3", title: "古城探索" },
      { time: "Day 4", title: "苍山徒步" },
      { time: "Day 5", title: "古镇漫步" },
      { time: "Day 6", title: "返程" },
    ],
    photos: generatePhotos(30, "grad"),
  },
  {
    id: "sports",
    title: "🏃 城市街头摄影",
    date: "2024-05-20",
    location: "上海市区",
    description:
      "穿梭在城市的街头巷尾，捕捉生活中的精彩瞬间。用镜头记录这座城市的独特魅力。",
    coverUrl: "https://picsum.photos/seed/sports-cover/1200/600",
    schedule: [
      { time: "上午", title: "外滩晨光" },
      { time: "中午", title: "南京路繁华" },
      { time: "下午", title: "田子坊探索" },
      { time: "傍晚", title: "新天地光影" },
      { time: "晚上", title: "陆家嘴夜景" },
      { time: "深夜", title: "城市不眠" },
    ],
    photos: generatePhotos(25, "sport"),
  },
  {
    id: "art",
    title: "🎨 自然风光摄影",
    date: "2024-06-01",
    location: "西藏林芝",
    description:
      "春末夏初的林芝，桃花盛开，雪山连绵。用镜头记录大自然的壮美与细腻。",
    coverUrl: "https://picsum.photos/seed/art-cover/1200/600",
    schedule: [
      { time: "日出", title: "南迦巴瓦峰" },
      { time: "上午", title: "桃花沟" },
      { time: "中午", title: "雅鲁藏布江" },
      { time: "下午", title: "鲁朗林海" },
      { time: "傍晚", title: "巴松措" },
      { time: "夜晚", title: "星空摄影" },
    ],
    photos: generatePhotos(20, "art"),
  },
];

export function getActivityById(id: string): Activity | undefined {
  return activities.find((a) => a.id === id);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  activities.forEach((a) => a.photos.forEach((p) => p.tags.forEach((t) => tagSet.add(t))));
  return Array.from(tagSet);
}
