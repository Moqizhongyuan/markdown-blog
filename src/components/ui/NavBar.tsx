"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as NextUILink,
  Divider,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import "./NavBar.css";

export default function NavBar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "首页" },
    { href: "/posts", label: "文章" },
    { href: "/gallery", label: "图库" },
    { href: "/about", label: "关于" },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const getNavItemColor = (isActive: boolean) => {
    if (isActive) {
      if (theme === "light") return "primary";
      if (theme === "dark") return "primary";
      if (theme === "fantasy") return "secondary";
    }
    return "foreground";
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="navbar-container"
    >
      <Navbar
        className="content-wrapper mb-8 border-b rounded-xl px-4 sm:px-6 py-2"
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          wrapper: "max-w-full px-2 sm:px-4",
          item: "h-full",
          menu: "navbar-menu mt-2 pt-2",
          menuItem: "navbar-menu-item py-2",
          toggle: "navbar-menu-toggle",
        }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            className="sm:hidden"
          />
          <NavbarBrand className="items-center ml-2 sm:ml-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold flex items-center"
              >
                Markdown博客
              </Link>
            </motion.div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 md:gap-6 justify-center mx-auto">
          {navItems.map((item) => (
            <NavbarItem
              key={item.href}
              isActive={pathname === item.href}
              className="flex items-center h-full px-1"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="h-full"
              >
                <NextUILink
                  as={Link}
                  href={item.href}
                  color={getNavItemColor(pathname === item.href)}
                  className={`${
                    pathname === item.href ? "font-medium active" : ""
                  } nav-link text-base h-full flex items-center px-2`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      className="underline-indicator"
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </NextUILink>
              </motion.div>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="items-center">
          <NavbarItem className="flex items-center">
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="pt-6 pb-6">
          <div className="flex flex-col gap-6 items-center justify-center h-full page-transition">
            {navItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <NextUILink
                  as={Link}
                  href={item.href}
                  color={getNavItemColor(pathname === item.href)}
                  size="lg"
                  className={`${
                    pathname === item.href ? "font-bold" : "font-normal"
                  } w-full text-center py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {pathname === item.href && (
                    <div className="h-0.5 w-8 bg-current mx-auto mt-1 rounded-full" />
                  )}
                </NextUILink>
              </NavbarMenuItem>
            ))}
            <Divider className="my-4 max-w-[80%]" />
            <div className="mt-2 mb-6 flex justify-center">
              <ThemeSwitcher />
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
    </motion.div>
  );
}
