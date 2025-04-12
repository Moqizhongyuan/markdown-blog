"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { motion } from "framer-motion";
import "./NavBar.css";

export default function NavBar() {
  const pathname = usePathname();

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

  return (
    <motion.div initial="hidden" animate="visible" variants={navbarVariants}>
      <Navbar
        className="content-wrapper mb-8 border-b rounded-xl px-6 py-3"
        maxWidth="full"
      >
        <NavbarBrand className="items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="text-2xl font-bold flex items-center">
              Markdown博客
            </Link>
          </motion.div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {navItems.map((item) => (
            <NavbarItem
              key={item.href}
              isActive={pathname === item.href}
              className="flex items-center h-full"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextUILink
                  as={Link}
                  href={item.href}
                  color={pathname === item.href ? "primary" : "foreground"}
                  className={`${
                    pathname === item.href ? "font-bold active" : ""
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
      </Navbar>
    </motion.div>
  );
}
