import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();


export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Check for saved theme, default to dark
    if (savedTheme) {
      return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    // Apply the theme class to the body
    document.body.className = ''; // Clear existing theme classes
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};