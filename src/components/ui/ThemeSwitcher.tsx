"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { SunIcon, MoonIcon, SparklesIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const iconVariants = {
    initial: { opacity: 0, rotate: -90, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.5 },
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          aria-label="切换主题"
          className="text-foreground"
        >
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.div
                key="light"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <SunIcon />
              </motion.div>
            ) : theme === "dark" ? (
              <motion.div
                key="dark"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <MoonIcon />
              </motion.div>
            ) : (
              <motion.div
                key="fantasy"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <SparklesIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="主题选择"
        selectionMode="single"
        selectedKeys={new Set([theme])}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0];
          if (
            selected === "light" ||
            selected === "dark" ||
            selected === "fantasy"
          ) {
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
