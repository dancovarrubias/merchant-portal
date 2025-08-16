import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-3 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            w-36 py-2.5 rounded-full text-sm font-inter font-medium transition-all border
            ${activeTab === tab.id 
              ? 'bg-primary text-white border-primary shadow-sm' 
              : 'bg-white text-text-secondary border-border-light hover:border-gray-300 hover:text-text-primary'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;