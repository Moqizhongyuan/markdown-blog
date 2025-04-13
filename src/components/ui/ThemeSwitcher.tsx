"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { SunIcon, MoonIcon, SparklesIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const iconVariants = {
    initial: { opacity: 0, rotate: -90, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.5 },
  };

  // 使用classnames库处理主题样式
  const getThemeStyles = (itemTheme: string) => {
    return classNames({
      "font-medium": itemTheme === theme,
      "text-blue-600": itemTheme === theme && itemTheme === "light",
      "text-blue-400": itemTheme === theme && itemTheme === "dark",
      "text-purple-400": itemTheme === theme && itemTheme === "fantasy",
    });
  };

  // 使用classnames库处理图标样式
  const getIconStyles = (iconTheme: string) => {
    return classNames({
      "text-amber-500": iconTheme === "light",
      "text-blue-400": iconTheme === "dark",
      "text-purple-400": iconTheme === "fantasy",
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "light",
      label: "浅色",
      icon: <SunIcon className={getIconStyles("light")} />,
      className: getThemeStyles("light"),
      onClick: () => setTheme("light"),
    },
    {
      key: "dark",
      label: "深色",
      icon: <MoonIcon className={getIconStyles("dark")} />,
      className: getThemeStyles("dark"),
      onClick: () => setTheme("dark"),
    },
    {
      key: "fantasy",
      label: "奇幻",
      icon: <SparklesIcon className={getIconStyles("fantasy")} />,
      className: getThemeStyles("fantasy"),
      onClick: () => setTheme("fantasy"),
    },
  ];

  const getMotionIconClasses = (themeType: string) => {
    return classNames(getIconStyles(themeType));
  };

  const currentIcon = () => {
    if (theme === "light") {
      return (
        <motion.div
          key="light"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={getMotionIconClasses("light")}
        >
          <SunIcon />
        </motion.div>
      );
    } else if (theme === "dark") {
      return (
        <motion.div
          key="dark"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={getMotionIconClasses("dark")}
        >
          <MoonIcon />
        </motion.div>
      );
    } else {
      return (
        <motion.div
          key="fantasy"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={getMotionIconClasses("fantasy")}
        >
          <SparklesIcon />
        </motion.div>
      );
    }
  };

  // 为按钮使用classnames
  const buttonClasses = classNames(
    "flex",
    "items-center",
    "justify-center",
    "text-foreground",
    "p-0",
    "min-w-8",
    "w-8",
    "h-8"
  );

  return (
    <Dropdown
      menu={{ items, selectedKeys: [theme] }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button
        type="text"
        aria-label="切换主题"
        className={buttonClasses}
        icon={<AnimatePresence mode="wait">{currentIcon()}</AnimatePresence>}
      />
    </Dropdown>
  );
}
