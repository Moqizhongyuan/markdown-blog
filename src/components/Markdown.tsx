import React from 'react';
import MarkdownIt from 'markdown-it';

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  
  const renderedContent = md.render(content);
  
  return (
    <div 
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: renderedContent }} 
    />
  );
}