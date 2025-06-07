import { HeroSection } from "@/components/HeroSection";
import { BentoGrid } from "@/components/BentoGrid";
import { FloatingElements } from "@/components/FloatingElements";

const Index = () => {
  return (
    <>
      {/* Floating background elements */}
      <FloatingElements />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Bento Grid Layout */}
      <div className="px-4 lg:px-8 pb-16">
        <BentoGrid />
      </div>
    </>
  );
};

export default Index;
