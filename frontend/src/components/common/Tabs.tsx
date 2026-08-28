import React, { useState } from 'react';
import '../styles/Tabs.css';

export interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  variant?: 'line' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className = '',
  variant = 'line'
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : '')
  );

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeTabContent = tabs.find((t) => t.id === activeTabId)?.content;

  return (
    <div className={`tabs-container tabs-${variant} ${className}`}>
      <div className="tabs-header-wrapper">
        <div className="tabs-header" role="tablist">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                disabled={tab.disabled}
                className={`tab-btn ${isActive ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
                onClick={() => handleTabClick(tab.id, tab.disabled)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="tabs-content" role="tabpanel" id={`panel-${activeTabId}`}>
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;
