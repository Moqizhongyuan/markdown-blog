import { getPosts } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const posts = getPosts();
  
  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">欢迎来到Markdown博客</h2>
        <p className="text-lg">
          这是一个基于NextJS和Tailwind构建的Markdown博客网站。在这里你可以发布和分享你的文章、笔记和思考。
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">最新文章</h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <div key={post.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-2">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">{post.date}</p>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {post.excerpt && (
                  <p className="text-gray-700">{post.excerpt}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>暂无文章。添加Markdown文件到content/posts目录来创建你的第一篇文章。</p>
        )}
      </section>
    </div>
  );
}