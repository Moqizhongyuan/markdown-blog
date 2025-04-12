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

  // 为每个主题定义颜色样式
  const getThemeStyles = (itemTheme: string) => {
    if (itemTheme === theme) {
      // 选中状态的颜色
      if (theme === "light") return "text-blue-600 font-medium";
      if (theme === "dark") return "text-blue-400 font-medium";
      if (theme === "fantasy") return "text-purple-400 font-medium";
    }
    // 未选中状态的颜色
    return "";
  };

  // 为图标定义颜色样式
  const getIconStyles = (iconTheme: string) => {
    if (iconTheme === "light") return "text-amber-500";
    if (iconTheme === "dark") return "text-blue-400";
    if (iconTheme === "fantasy") return "text-purple-400";
    return "";
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
                className={getIconStyles("light")}
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
                className={getIconStyles("dark")}
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
                className={getIconStyles("fantasy")}
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
        classNames={{
          base: "min-w-[150px]",
        }}
      >
        <DropdownItem
          key="light"
          startContent={<SunIcon className={getIconStyles("light")} />}
          className={getThemeStyles("light")}
        >
          浅色
        </DropdownItem>
        <DropdownItem
          key="dark"
          startContent={<MoonIcon className={getIconStyles("dark")} />}
          className={getThemeStyles("dark")}
        >
          深色
        </DropdownItem>
        <DropdownItem
          key="fantasy"
          startContent={<SparklesIcon className={getIconStyles("fantasy")} />}
          className={getThemeStyles("fantasy")}
        >
          奇幻
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
