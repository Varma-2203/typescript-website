
import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <div className="features-section">
      <h2>Key Features</h2>
      <ul className="features-list">
        <li>
          <span className="feature-bullet">•</span>
          <span className="feature-text">Comprehensive Annotations</span>
        </li>
        <li>
          <span className="feature-bullet">•</span>
          <span className="feature-text">Advanced Search</span>
        </li>
        <li>
          <span className="feature-bullet">•</span>
          <span className="feature-text">Export Tools</span>
        </li>
      </ul>
    </div>
  );
};

export default FeaturesSection;
