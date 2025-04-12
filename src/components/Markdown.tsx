import React from "react";
import MarkdownIt from "markdown-it";
import { Card, CardBody } from "@nextui-org/react";
import { useTheme } from "@/context/ThemeContext";

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

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardBody>
        <div
          className={`prose max-w-none
            ${theme === "light" ? "prose-slate" : ""} 
            ${theme === "dark" ? "prose-invert" : ""}
            ${theme === "fantasy" ? "prose-invert fantasy-prose" : ""}
          `}
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </CardBody>
    </Card>
  );
}
