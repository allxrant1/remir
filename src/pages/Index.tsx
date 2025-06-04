
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModernTopBar } from "@/components/ModernTopBar";
import { HeroSection } from "@/components/HeroSection";
import { BentoGrid } from "@/components/BentoGrid";
import { FloatingElements } from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating background elements */}
      <FloatingElements />
      
      <div className="relative z-10">
        <div className="flex items-center p-4">
          <SidebarTrigger className="text-white hover:bg-white/10" />
          <div className="flex-1">
            <ModernTopBar onMenuClick={() => {}} />
          </div>
        </div>
        
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
