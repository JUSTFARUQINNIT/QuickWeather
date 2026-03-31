import React, { useState } from "react";
import { Home, MapPin, Settings, Cloud } from "lucide-react";

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onToggle?: (expanded: boolean) => void;
} 

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection = "home",
  onSectionChange,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "locations", icon: MapPin, label: "Locations" },
    { id: "forecast", icon: Cloud, label: "Forecast" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="logo">
            <img src="../src/assets/logo.png" alt="" />
            {isExpanded && <span className="logo-text">QuickWeather</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => onSectionChange?.(item.id)}
                title={item.label}
              >
                <Icon size={20} />
                {isExpanded && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <button
        className="sidebar-toggle"
        onClick={handleToggle}
        title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <div className="toggle-line"></div>
        <div className="toggle-line"></div>
        <div className="toggle-line"></div>
      </button>
    </aside>
  );
};
