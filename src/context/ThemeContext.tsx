'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'fantasy';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 从localStorage读取主题，默认为light
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    // 组件挂载时，从localStorage获取主题
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme && ['light', 'dark', 'fantasy'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.classList.remove('light', 'dark', 'fantasy');
      document.documentElement.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // 如果没有保存的主题，但系统偏好是暗色模式
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    // 更新document的类名以切换主题
    document.documentElement.classList.remove('light', 'dark', 'fantasy');
    document.documentElement.classList.add(newTheme);
    // 保存到localStorage
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}