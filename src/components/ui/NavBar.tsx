"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ThemeSwitcher from "./ThemeSwitcher";

const { Header } = Layout;

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>(pathname);

  // 当路径变化时更新选中的菜单项
  useEffect(() => {
    setSelectedKey(pathname);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "首页" },
    { href: "/frontEnd", label: "前端" },
    { href: "/codeEngineering", label: "工程化" },
    { href: "/codeLife", label: "代码人生" },
    { href: "/about", label: "关于" },
  ];

  // 为移动设备的菜单生成菜单项
  const menuItems = navItems.map((item) => ({
    key: item.href,
    label: (
      <Link
        href={item.href}
        className="relative transition-all duration-300 ease-in-out hover:opacity-90"
      >
        {item.label}
      </Link>
    ),
  }));

  return (
    <div className="transition-all duration-300 ease-in-out">
      <Header className="flex justify-between items-center mb-8 border-b rounded-xl px-4 sm:px-6 py-2 bg-white dark:bg-gray-800 h-auto">
        <div className="flex items-center">
          <Button
            type="text"
            className="md:hidden mr-2"
            onClick={() => setIsMenuOpen(true)}
            icon={<MenuOutlined />}
          />
          <div className="hover:scale-105 active:scale-95 transition-transform">
            <Link href="/" className="text-xl sm:text-2xl font-bold">
              Markdown博客
            </Link>
          </div>
        </div>

        {/* 桌面导航 */}
        <div className="hidden md:flex items-center">
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            className="border-none"
            style={{ minWidth: 400 }}
            items={menuItems}
          />
        </div>

        <div className="flex items-center">
          <ThemeSwitcher />
        </div>

        {/* 移动端导航抽屉 */}
        <Drawer
          title="导航菜单"
          placement="left"
          onClose={() => setIsMenuOpen(false)}
          open={isMenuOpen}
          width={280}
        >
          <Menu
            mode="vertical"
            selectedKeys={[selectedKey]}
            className="border-none"
            style={{ marginBottom: 20 }}
            items={menuItems}
            onClick={() => setIsMenuOpen(false)}
          />
        </Drawer>
      </Header>
    </div>
  );
}
