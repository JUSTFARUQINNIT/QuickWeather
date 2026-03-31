import React, { useState } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

interface UserProfileProps {
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-profile">
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <User size={20} />
        <p>John Doe</p>
        <ChevronDown />
      </div>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="user-info">
              <User size={24} />
              <div className="user-details">
                <div className="user-name">John Doe</div>
                <div className="user-email">john.doe@example.com</div>
              </div>
            </div>
          </div>

          <div className="profile-menu">
            <button className="menu-item">
              <Settings size={18} />
              <p>Settings</p>
            </button>
            <button className="menu-item logout" onClick={onLogout}>
              <LogOut size={18} />
              <p>Sign Out</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
