import React from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div
      className="icon-toggle"
      onClick={toggleDarkMode}
      title="Toggle Dark Mode"
    >
      {darkMode ? '🌙' : '🌞'}
    </div>
  );
};

export default DarkModeToggle;
