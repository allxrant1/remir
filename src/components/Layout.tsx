import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ModernTopBar } from "@/components/ModernTopBar";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        className={cn(
          "transition-all duration-300 relative z-10",
          { 'md:ml-64': sidebarOpen }
        )}
      >
        <ModernTopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}