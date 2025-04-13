"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SearchBox from "@/components/ui/SearchBox";
import AnimatedCard from "@/components/ui/AnimatedCard";

interface PostSearchProps {
  initialQuery: string;
  className?: string;
}

export default function PostSearch({
  initialQuery,
  className = "",
}: PostSearchProps) {
  const [searchValue, setSearchValue] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();

  // 当initialQuery改变时更新内部状态
  useEffect(() => {
    setSearchValue(initialQuery);
  }, [initialQuery]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("search", value.trim());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <AnimatedCard delay={0.1} className={className}>
      <SearchBox
        className="w-full"
        placeholder="搜索文章..."
        initialValue={searchValue}
        onSearch={handleSearch}
      />
    </AnimatedCard>
  );
}
