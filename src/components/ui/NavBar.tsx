'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NextUILink } from '@nextui-org/react';
import ThemeSwitcher from './ThemeSwitcher';

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
      className="content-wrapper mb-8 border-b rounded-xl"
      maxWidth="full"
    >
      <NavbarBrand>
        <Link href="/" className="text-2xl font-bold">
          Markdown博客
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <NextUILink
              as={Link}
              href={item.href}
              color={pathname === item.href ? "primary" : "foreground"}
              className={pathname === item.href ? "font-bold" : ""}
            >
              {item.label}
            </NextUILink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}