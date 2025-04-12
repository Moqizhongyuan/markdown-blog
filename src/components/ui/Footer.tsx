'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-8 pt-4 border-t text-center text-sm text-default-500 content-wrapper p-4">
      <p>© {new Date().getFullYear()} Markdown博客 - 基于NextJS和Tailwind构建</p>
    </footer>
  );
}