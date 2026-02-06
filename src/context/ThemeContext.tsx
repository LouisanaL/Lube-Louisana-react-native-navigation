import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightColors = {
    primary: '#8B4513',        // Saddle Brown
    secondary: '#A0522D',      // Sienna
    background: '#FFF8F0',     // Soft cream
    cardBackground: '#FFFFFF',
    text: '#2C1810',
    textSecondary: '#6B5446',
    border: '#E6D5C3',
    success: '#7C6A46',        // Warm olive
    error: '#C85A54',
  };

  const darkColors = {
    primary: '#B87333',        // Copper
    secondary: '#CD853F',      // Peru
    background: '#1A1410',     // Very dark brown
    cardBackground: '#2A2018',
    text: '#F5EDE3',
    textSecondary: '#C4B5A0',
    border: '#3D3228',
    success: '#A89968',        // Warm gold
    error: '#D97066',
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};