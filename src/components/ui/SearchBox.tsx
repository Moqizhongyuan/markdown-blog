"use client";

import React, { useState, useEffect } from "react";
import { Input } from "antd";
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

  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value);
    } else if (value.trim()) {
      router.push(`/frontEnd?search=${encodeURIComponent(value.trim())}`);
    }
  };

  // 根据主题设置不同的样式
  const getThemeStyles = () => {
    return {
      borderRadius: "0.5rem",
    };
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchValue);
      }}
      className={`w-full ${className}`}
    >
      <Input.Search
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        placeholder={placeholder}
        enterButton
        size="large"
        style={getThemeStyles()}
        className={`search-box ${theme === "fantasy" ? "fantasy-search" : ""}`}
      />
    </form>
  );
}
