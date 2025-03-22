
import React from 'react';

interface ThreeColumnLayoutProps {
  leftContent: React.ReactNode;
  middleContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  leftContent,
  middleContent,
  rightContent,
  className = '',
}) => {
  return (
    <div className={`three-column-layout ${className}`}>
      <div className="column left-column">{leftContent}</div>
      <div className="column middle-column">{middleContent}</div>
      <div className="column right-column">{rightContent}</div>
    </div>
  );
};

export default ThreeColumnLayout;
