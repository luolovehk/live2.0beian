import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Camera } from "lucide-react";
import { activities } from "@/data/mock-data";
import { ScrollToTop } from "@/components/ScrollToTop";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 sm:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            个人作品展示
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            记录生活与创作的精彩瞬间，分享我的摄影作品和故事。选择下方作品集，浏览精彩内容。
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">🎉 作品集</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              to={`/activity/${activity.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.coverUrl}
                  alt={activity.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="line-clamp-2 text-sm text-muted-foreground">{activity.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(activity.date).toLocaleDateString("zh-CN")}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {activity.location}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {activity.photos.length} 张作品
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                    查看作品 <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
