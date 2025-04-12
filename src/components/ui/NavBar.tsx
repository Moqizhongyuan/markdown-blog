'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NextUILink } from '@nextui-org/react';
import ThemeSwitcher from './ThemeSwitcher';
import './NavBar.css';

export default function NavBar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: '首页' },
    { href: '/posts', label: '文章' },
    { href: '/gallery', label: '图库' },
    { href: '/about', label: '关于' },
  ];
  
  return (
    <Navbar 
      className="content-wrapper mb-8 border-b rounded-xl px-6 py-3"
      maxWidth="full"
    >
      <NavbarBrand className="items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          Markdown博客
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href} className="flex items-center h-full">
            <NextUILink
              as={Link}
              href={item.href}
              color={pathname === item.href ? "primary" : "foreground"}
              className={`${pathname === item.href ? "font-bold active" : ""} nav-link text-base h-full flex items-center px-2`}
            >
              {item.label}
            </NextUILink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="items-center">
        <NavbarItem className="flex items-center">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}