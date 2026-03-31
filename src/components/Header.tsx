import React from 'react';
import { UserProfile } from './UserProfile';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  unit: 'C' | 'F';
  onSearch: (query: string) => void;
  isSidebarExpanded?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, isSidebarExpanded = false }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className={`header ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      <div className="header-content">
        <form className="search-form" onSubmit={handleSubmit}>
            <SearchBar 
            onSearch={onSearch}/>
            
        </form>
        
        <div className="header-actions">
          <UserProfile />
        </div>
      </div>

     
    </header>
  );
};
