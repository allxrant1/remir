
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import { VerseCard } from "@/components/VerseCard";
import { ComeAsYouAreCard } from "@/components/ComeAsYouAreCard";
import { UpcomingEventsSection } from "@/components/UpcomingEventsSection";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64 transition-all duration-300">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8 space-y-8">
          <WelcomeBanner />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComeAsYouAreCard />
            <VerseCard />
          </div>
          <UpcomingEventsSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
