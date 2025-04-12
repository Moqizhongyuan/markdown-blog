import { getPosts } from '@/lib/api';
import Link from 'next/link';

export default function Posts() {
  const posts = getPosts();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">所有文章</h1>
      
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
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
    </div>
  );
}