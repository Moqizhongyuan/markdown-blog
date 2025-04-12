import React from 'react';
import MarkdownIt from 'markdown-it';
import { Card, CardBody } from '@nextui-org/react';

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
    <Card className="border-none bg-transparent shadow-none">
      <CardBody>
        <div 
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedContent }} 
        />
      </CardBody>
    </Card>
  );
}