import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  unit: "C" | "F";
  onUnitToggle: (unit: "C" | "F") => void;
  onSearch: (query: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  unit,
  onUnitToggle,
  onSearch,
}) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      setIsSidebarExpanded(e.detail.expanded);
    };

    window.addEventListener(
      "sidebarToggle",
      handleSidebarChange as EventListener,
    );
    return () =>
      window.removeEventListener(
        "sidebarToggle",
        handleSidebarChange as EventListener,
      );
  }, []);

  return (
    <div className="app-wrapper">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onToggle={(expanded) => setIsSidebarExpanded(expanded)}
      />

      <div
        className={`main-content ${isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}
      >
        <Header
          unit={unit}
          onUnitToggle={onUnitToggle}
          onSearch={onSearch}
          isSidebarExpanded={isSidebarExpanded}
        />

        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};
