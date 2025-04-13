import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

const codeEngineeringDirectory = path.join(
  process.cwd(),
  "content/codeEngineering"
);
const codeLifeDirectory = path.join(process.cwd(), "content/codeLife");
const frontEndDirectory = path.join(process.cwd(), "content/frontEnd");

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  tags?: string[];
};

export enum PostCategory {
  codeEngineering = "codeEngineering",
  codeLife = "codeLife",
  frontEnd = "frontEnd",
}

export function getPosts(category: PostCategory): Post[] {
  let postsDirectory = "";
  switch (category) {
    case PostCategory.codeEngineering:
      postsDirectory = codeEngineeringDirectory;
      break;
    case PostCategory.codeLife:
      postsDirectory = codeLifeDirectory;
      break;
    case PostCategory.frontEnd:
      postsDirectory = frontEndDirectory;
      break;
    default:
      postsDirectory = codeEngineeringDirectory;
      break;
  }
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // 处理日期
      let dateStr = "";
      if (data.date) {
        const date = new Date(data.date);
        dateStr = format(date, "yyyy年MM月dd日", { locale: zhCN });
      }

      // 提取摘要
      const excerpt =
        content.split("\n").slice(0, 3).join(" ").substring(0, 160) + "...";

      return {
        slug,
        title: data.title || slug,
        date: dateStr,
        content,
        excerpt,
        tags: data.tags || [],
      };
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(
  slug: string,
  category: PostCategory
): Post | null {
  let postsDirectory = "";
  switch (category) {
    case PostCategory.codeEngineering:
      postsDirectory = codeEngineeringDirectory;
      break;
    case PostCategory.codeLife:
      postsDirectory = codeLifeDirectory;
      break;
    case PostCategory.frontEnd:
      postsDirectory = frontEndDirectory;
      break;
    default:
      postsDirectory = codeEngineeringDirectory;
      break;
  }
  try {
    // 对slug进行URL解码，处理中文文件名
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // 处理日期
    let dateStr = "";
    if (data.date) {
      const date = new Date(data.date);
      dateStr = format(date, "yyyy年MM月dd日", { locale: zhCN });
    }

    return {
      slug,
      title: data.title || slug,
      date: dateStr,
      content,
      tags: data.tags || [],
    };
  } catch (e) {
    return null;
  }
}
