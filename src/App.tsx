import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { HomePage } from "@/pages/HomePage";
import { ActivityPage } from "@/pages/ActivityPage";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activity/:id" element={<ActivityPage />} />
        </Routes>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-background">
      <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">粤ICP备2023134752号</a>
      </footer>
      <SonnerToaster />
    </div>
  );
}

export default App;
