import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="app-header">
      <Link to="/" className="logo">
        Learning Support Providers
      </Link>

      <div className="nav-right">
        <button
          className="dark-mode-icon"
          onClick={toggleDarkMode}
          title="Toggle Dark Mode"
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
      </div>
    </header>
  );
};

export default Header;
