import { getPosts, PostCategory } from "@/lib/api";
import Link from "next/link";
import AnimatedCard from "@/components/ui/AnimatedCard";
import SearchBox from "@/components/ui/SearchBox";

export default function Home() {
  const posts = getPosts(PostCategory.frontEnd);

  return (
    <div>
      <AnimatedCard>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">欢迎访问我的博客</h2>
          <p className="text-lg">
            很高兴你能来到我的个人空间！这里是我分享思考、记录生活和技术探索的地方。希望你能在这里找到有趣或有用的内容，欢迎常来逛逛~
          </p>
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
