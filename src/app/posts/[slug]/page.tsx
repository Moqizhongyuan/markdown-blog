import { getPostBySlug, getPosts } from '@/lib/api';
import Markdown from '@/components/Markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article>
      <div className="mb-4">
        <Link href="/posts" className="text-blue-500 hover:underline">
          ← 返回所有文章
        </Link>
      </div>
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-600 mb-4">{post.date}</div>
        
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      <div className="prose prose-slate max-w-none">
        <Markdown content={post.content} />
      </div>
    </article>
  );
}