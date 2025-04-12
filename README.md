# Markdown博客

这是一个基于NextJS和Tailwind CSS构建的Markdown博客系统，用于发布和分享个人文章、笔记和思考。

## 特点

- 简洁的设计：专注于内容本身
- Markdown格式：易于编写和维护
- 现代技术栈：NextJS + TypeScript + Tailwind CSS
- 优秀的性能：快速、响应式、SEO友好
- 完全静态：高性能、易于部署

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
2. 添加前置元数据（YAML格式），例如：
   ```markdown
   ---
   title: 文章标题
   date: 2025-04-12
   tags: [标签1, 标签2]
   ---
   
   # 文章内容...
   ```
3. 编写Markdown内容

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

## 许可

MIT License