import { getPosts, PostCategory } from "@/lib/api";
import Link from "next/link";
import AnimatedCard from "@/components/ui/AnimatedCard";
import SearchBox from "@/components/ui/SearchBox";
import { getRandomQuote } from "@/data/quotes";
import dynamic from "next/dynamic";

// 使用动态导入，因为QuoteRotator是客户端组件
const QuoteRotator = dynamic(() => import("@/components/ui/QuoteRotator"), {
  ssr: false,
  loading: () => (
    <blockquote className="border-l-4 border-gray-300 pl-4 py-2 italic text-gray-600 dark:text-gray-400 min-h-[120px] flex items-center">
      <p>加载中...</p>
    </blockquote>
  ),
});

export default function Home() {
  const posts = getPosts(PostCategory.frontEnd);
  // 获取一个初始名言，用于SSR和QuoteRotator的初始值
  const initialQuote = getRandomQuote();

  return (
    <div>
      <AnimatedCard>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">欢迎访问我的博客</h2>
          <div className="space-y-4">
            {/* 使用动态加载的名言轮换组件 */}
            <QuoteRotator initialQuote={initialQuote} interval={10000} />
          </div>
        </section>
      </AnimatedCard>

      <AnimatedCard delay={0.15} className="mb-6">
        <SearchBox className="w-full" placeholder="搜索你感兴趣的文章..." />
      </AnimatedCard>

      <section>
        <AnimatedCard delay={0.1}>
          <h2 className="text-2xl font-bold mb-4">最新文章</h2>
        </AnimatedCard>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <AnimatedCard
                key={post.slug}
                delay={0.2 + index * 0.1}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">
                  <Link
                    href={`/${PostCategory.frontEnd}/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">{post.date}</p>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {post.excerpt && (
                  <p className="text-gray-700">{post.excerpt}</p>
                )}
              </AnimatedCard>
            ))}
          </div>
        ) : (
          <AnimatedCard delay={0.2}>
            <p>
              暂无文章。添加Markdown文件到content/posts目录来创建你的第一篇文章。
            </p>
          </AnimatedCard>
        )}
      </section>
    </div>
  );
}
