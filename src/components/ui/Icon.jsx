import React from 'react';

const Icon = ({ name, className = '', ...props }) => {
  return (
    <img src={`/${name}.svg`} alt={`${name} icon`} className={className} {...props} />
  );
};

export default Icon;