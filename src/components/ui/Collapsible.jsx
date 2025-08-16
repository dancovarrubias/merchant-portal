import React, { useState } from 'react';
import Card from './Card';
import Icon from './Icon';

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer p-4"
        onClick={toggleCollapse}
      >
        <h3 className="text-lg font-medium text-text-primary">{title}</h3>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          className="w-6 h-6 text-text-primary"
        />
      </div>
      {isOpen && <div className="p-4 border-t border-border-light">{children}</div>}
    </Card>
  );
};

export default Collapsible;
