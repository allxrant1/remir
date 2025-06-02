
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ModernTopBar } from "@/components/ModernTopBar";
import { HeroSection } from "@/components/HeroSection";
import { BentoGrid } from "@/components/BentoGrid";
import { FloatingElements } from "@/components/FloatingElements";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating background elements */}
      <FloatingElements />
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64 transition-all duration-300 relative z-10">
        <ModernTopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="relative">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Bento Grid Layout */}
          <div className="px-4 lg:px-8 pb-16">
            <BentoGrid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
