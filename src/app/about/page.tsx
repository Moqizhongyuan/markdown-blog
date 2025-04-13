"use client";

export default function About() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none [&>*]:text-black dark:[&>*]:text-white">
      <h1 className="text-slate-900 dark:text-white text-opacity-100 font-bold text-shadow">
        关于我
      </h1>

      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-full md:w-1/3">
          <img
            src="https://avatars.githubusercontent.com/u/130364829?v=4"
            alt="个人头像"
            className="rounded-lg shadow-lg w-full border-2 border-slate-200 dark:border-slate-700"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-slate-900 dark:text-white font-semibold">
            个人简介
          </h2>
          <p className="text-slate-800 dark:text-slate-200">
            我是 Moqizhongyuan，一位热衷于技术和开发的软件工程师。我的 GitHub
            账号记录了我的技术成长历程。
          </p>

          <h3 className="text-slate-900 dark:text-white font-semibold">
            GitHub 项目
          </h3>
          <p className="text-slate-800 dark:text-slate-200">
            在我的 GitHub 主页上，您可以找到我参与和创建的各种项目，其中包括
            Chart-Library-Sparrow 等项目。
            这些项目展示了我在软件开发方面的技能和兴趣。
          </p>

          <h3 className="text-slate-900 dark:text-white font-semibold">
            联系方式
          </h3>
          <p className="text-slate-800 dark:text-slate-200">
            欢迎通过 GitHub 与我交流：
            <a
              href="https://github.com/Moqizhongyuan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200 font-medium underline"
            >
              @Moqizhongyuan
            </a>
          </p>
        </div>
      </div>

      <hr className="my-8 border-slate-400 dark:border-slate-600" />

      <h1 className="text-slate-900 dark:text-white font-bold text-shadow">
        关于博客
      </h1>

      <p className="text-slate-800 dark:text-slate-200">
        这是一个基于NextJS和Tailwind
        CSS构建的Markdown博客。这个博客系统允许你使用Markdown格式编写文章，
        并通过简单的文件操作发布到网站上。
      </p>

      <h2 className="text-slate-900 dark:text-white font-semibold">特点</h2>

      <ul className="text-slate-800 dark:text-slate-200">
        <li>简洁的设计：专注于内容本身</li>
        <li>Markdown格式：易于编写和维护</li>
        <li>基于NextJS：快速、SEO友好的现代React框架</li>
        <li>Tailwind CSS：灵活、现代的CSS框架</li>
        <li>完全静态：高性能、易于部署</li>
      </ul>

      <h2 className="text-slate-900 dark:text-white font-semibold">如何使用</h2>

      <p className="text-slate-800 dark:text-slate-200">
        使用这个博客系统非常简单：
      </p>

      <ol className="text-slate-800 dark:text-slate-200">
        <li>
          将新的Markdown文件添加到
          <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-normal text-slate-900 dark:text-white">
            content/posts
          </code>
          目录
        </li>
        <li>使用前置元数据设置文章属性（标题、日期、标签等）</li>
        <li>提交并推送更改</li>
        <li>部署您的站点（GitHub Pages, Vercel, Netlify等）</li>
      </ol>

      <style jsx global>{`
        .text-shadow {
          text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
        }
        [data-theme="fantasy"] h1,
        [data-theme="fantasy"] h2,
        [data-theme="fantasy"] h3 {
          color: #f8fafc !important;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        }
        [data-theme="fantasy"] p,
        [data-theme="fantasy"] li {
          color: #e2e8f0 !important;
        }
        [data-theme="fantasy"] a {
          color: #93c5fd !important;
          text-decoration: underline;
          font-weight: 500;
        }
        [data-theme="fantasy"] a:hover {
          color: #bfdbfe !important;
        }
        [data-theme="fantasy"] code {
          background-color: rgba(30, 41, 59, 0.8) !important;
          color: #f1f5f9 !important;
          border-radius: 4px;
          padding: 2px 6px;
          font-weight: normal;
        }
      `}</style>
    </div>
  );
}
