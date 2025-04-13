"use client";

import React from "react";
import { ConfigProvider, theme as antTheme } from "antd";
import { ThemeProvider } from "@/context/ThemeContext";
import { useTheme } from "@/context/ThemeContext";

function AntConfigProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  // 根据当前主题设置Ant Design的主题
  const getAntTheme = () => {
    const baseTheme = {
      token: {
        borderRadius: 6,
        colorPrimary: theme === "fantasy" ? "#8B5CF6" : "#3B82F6",
      },
    };

    if (theme === "dark" || theme === "fantasy") {
      return {
        ...baseTheme,
        algorithm: antTheme.darkAlgorithm,
      };
    }

    return baseTheme; // 默认使用light主题
  };

  return <ConfigProvider theme={getAntTheme()}>{children}</ConfigProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AntConfigProvider>{children}</AntConfigProvider>
    </ThemeProvider>
  );
}
