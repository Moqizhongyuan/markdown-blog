"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  initialValue?: string;
  onSearch?: (value: string) => void;
}

export default function SearchBox({
  placeholder = "搜索文章...",
  className = "",
  initialValue = "",
  onSearch,
}: SearchBoxProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialValue);

  // 当initialValue改变时更新内部状态
  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  // 根据主题返回不同的视觉样式
  const getThemeStyles = () => {
    if (theme === "light") {
      return {
        variant: "bordered" as const,
        color: "primary" as const,
      };
    } else if (theme === "dark") {
      return {
        variant: "bordered" as const,
        color: "primary" as const,
      };
    } else {
      // fantasy
      return {
        variant: "bordered" as const,
        color: "secondary" as const,
      };
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    } else if (searchValue.trim()) {
      router.push(`/posts?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const styles = getThemeStyles();

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <Input
        type="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        variant={styles.variant}
        color={styles.color}
        radius="lg"
        size="lg"
        startContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 flex-shrink-0 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        }
        classNames={{
          base: "max-w-full",
          mainWrapper: "h-full",
          input: "text-sm py-2 min-h-[2.5rem]",
          inputWrapper: `shadow-sm h-12 min-h-[3rem] py-1 flex items-center ${
            theme === "fantasy" ? "bg-opacity-20" : ""
          }`,
        }}
      />
    </form>
  );
}
