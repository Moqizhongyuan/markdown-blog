"use client";

import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; 
import { Card } from "antd";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str: string, lang: string): string => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs
            .highlight(str, { language: lang, ignoreIllegals: true })
            .value}</code></pre>`;
        } catch (__) {}
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

  const renderedContent = md.render(content);

  return (
    <Card
      bordered={false}
      className="border-none bg-transparent shadow-none"
      bodyStyle={{ padding: "24px" }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </Card>
  );
}
