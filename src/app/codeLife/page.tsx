import { getPosts, PostCategory } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";
import PostSearch from "@/components/PostSearch";
import AnimatedCard from "@/components/ui/AnimatedCard";

export default function Posts({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchQuery = searchParams.search || "";
  const allPosts = getPosts(PostCategory.codeLife);

  // 在服务器端过滤文章
  const posts = searchQuery
    ? allPosts.filter((post) => {
        const searchText = (
          post.title +
          " " +
          post.date +
          " " +
          (post.tags?.join(" ") || "")
        ).toLowerCase();
        return searchText.includes(searchQuery.toLowerCase());
      })
    : allPosts;

  return (
    <div>
      <AnimatedCard>
        <h1 className="text-3xl font-bold mb-6">所有文章</h1>
      </AnimatedCard>

      <Suspense
        fallback={
          <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mb-6"></div>
        }
      >
        <PostSearch initialQuery={searchQuery} className="mb-6" />
      </Suspense>

      {searchQuery && (
        <AnimatedCard delay={0.15} className="mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p>
              搜索结果: <span className="font-medium">"{searchQuery}"</span>
              {posts.length === 0
                ? " - 没有找到匹配的文章"
                : ` - 找到 ${posts.length} 篇文章`}
            </p>
          </div>
        </AnimatedCard>
      )}

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <AnimatedCard
              key={post.slug}
              delay={0.2 + index * 0.05}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2">
                <Link
                  href={`/${PostCategory.codeLife}/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {post.date}
              </p>
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {post.excerpt && (
                <p className="text-gray-700 dark:text-gray-300">
                  {post.excerpt}
                </p>
              )}
            </AnimatedCard>
          ))}
        </div>
      ) : (
        <AnimatedCard delay={0.2}>
          <p>
            {searchQuery
              ? "没有找到匹配的文章，请尝试不同的搜索关键词。"
              : "暂无文章。添加Markdown文件到content/posts目录来创建你的第一篇文章。"}
          </p>
        </AnimatedCard>
      )}
    </div>
  );
}
