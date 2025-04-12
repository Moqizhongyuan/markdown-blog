'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { SunIcon, MoonIcon, SparklesIcon } from './Icons';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          isIconOnly 
          variant="light" 
          aria-label="切换主题"
          className="text-foreground"
        >
          {theme === 'light' ? (
            <SunIcon />
          ) : theme === 'dark' ? (
            <MoonIcon />
          ) : (
            <SparklesIcon />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="主题选择"
        selectionMode="single"
        selectedKeys={new Set([theme])}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0];
          if (selected === 'light' || selected === 'dark' || selected === 'fantasy') {
            setTheme(selected);
          }
        }}
      >
        <DropdownItem key="light" startContent={<SunIcon />}>
          浅色
        </DropdownItem>
        <DropdownItem key="dark" startContent={<MoonIcon />}>
          深色
        </DropdownItem>
        <DropdownItem key="fantasy" startContent={<SparklesIcon />}>
          奇幻
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}