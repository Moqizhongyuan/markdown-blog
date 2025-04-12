# Markdown 博客

这是一个基于 NextJS 和 Tailwind CSS 构建的 Markdown 博客系统，用于发布和分享个人文章、笔记和思考。

## 特点

- 简洁的设计：专注于内容本身
- Markdown 格式：易于编写和维护
- 现代技术栈：NextJS + TypeScript + Tailwind CSS
- 优秀的性能：快速、响应式、SEO 友好
- 完全静态：高性能、易于部署
- 流畅动画：使用 framer-motion 实现平滑的过渡效果

## 目录结构

```
/
├── src/                # 源代码目录
│   ├── app/            # Next.js App Router
│   ├── components/     # React组件
│   └── lib/            # 工具库和API
├── content/            # 内容目录
│   └── posts/          # 博客文章（Markdown格式）
├── public/             # 静态资源
└── ...配置文件
```

## 如何使用

### 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 添加文章

1. 在`content/posts`目录中创建新的`.md`文件
2. 添加前置元数据（YAML 格式），例如：

   ```markdown
   ---
   title: 文章标题
   date: 2025-04-12
   tags: [标签1, 标签2]
   ---

   # 文章内容...
   ```

3. 编写 Markdown 内容

### 构建与部署

```bash
# 构建生产版本
npm run build

# 本地预览生产版本
npm run start
```

## 自定义

- 修改`src/app/layout.tsx`来更改网站布局
- 编辑`tailwind.config.js`自定义设计系统
- 更新`src/lib/api.ts`来扩展内容处理逻辑

## 动画效果

本项目使用 framer-motion 实现了平滑的过渡动画：

- 页面切换动画：使用 `PageTransition` 组件实现平滑的页面转场效果
- 主题切换动画：切换主题时的图标过渡动画
- 导航栏动画：包括导航链接的悬停效果和选中指示器
- 内容卡片动画：使用 `AnimatedCard` 组件为内容块添加淡入和悬停效果

如需自定义动画，可以修改相应组件中的 framer-motion 配置。

## 许可

MIT License
