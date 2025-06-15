import React from 'react';
import Header from '../Header/Header';
import './Layout.css';

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <div className="layout-container">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
