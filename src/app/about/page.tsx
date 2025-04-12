export default function About() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>关于博客</h1>
      
      <p>
        这是一个基于NextJS和Tailwind CSS构建的Markdown博客。这个博客系统允许你使用Markdown格式编写文章，
        并通过简单的文件操作发布到网站上。
      </p>
      
      <h2>特点</h2>
      
      <ul>
        <li>简洁的设计：专注于内容本身</li>
        <li>Markdown格式：易于编写和维护</li>
        <li>基于NextJS：快速、SEO友好的现代React框架</li>
        <li>Tailwind CSS：灵活、现代的CSS框架</li>
        <li>完全静态：高性能、易于部署</li>
      </ul>
      
      <h2>如何使用</h2>
      
      <p>使用这个博客系统非常简单：</p>
      
      <ol>
        <li>将新的Markdown文件添加到<code>content/posts</code>目录</li>
        <li>使用前置元数据设置文章属性（标题、日期、标签等）</li>
        <li>提交并推送更改</li>
        <li>部署您的站点（GitHub Pages, Vercel, Netlify等）</li>
      </ol>
      
      <h2>联系方式</h2>
      
      <p>
        欢迎通过GitHub与我交流：
        <a href="https://github.com/Moqizhongyuan" target="_blank" rel="noopener noreferrer">
          @Moqizhongyuan
        </a>
      </p>
    </div>
  );
}