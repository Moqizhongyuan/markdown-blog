"use client";

import React from "react";
import MarkdownIt from "markdown-it";
import { Card } from "antd";
import { useTheme } from "@/context/ThemeContext";
import classNames from "classnames";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  const { theme } = useTheme();

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const renderedContent = md.render(content);

  const contentClasses = classNames("prose", "max-w-none", {
    "prose-slate": theme === "light",
    "prose-invert": theme === "dark" || theme === "fantasy",
    "fantasy-prose": theme === "fantasy",
  });

  return (
    <Card
      bordered={false}
      className="border-none bg-transparent shadow-none"
      bodyStyle={{ padding: "24px" }}
    >
      <div
        className={contentClasses}
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </Card>
  );
}
