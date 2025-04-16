"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 pt-4 border-t text-center text-sm text-default-500 content-wrapper p-4">
      <p>
        © {new Date().getFullYear()}{" "}
        欢迎来到小余的博客，这里有些文章是ai文，请仔细甄别，逛的愉快
      </p>
    </footer>
  );
}
