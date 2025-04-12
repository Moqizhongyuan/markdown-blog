import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  tags?: string[];
};

export function getPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // 处理日期
      let dateStr = '';
      if (data.date) {
        const date = new Date(data.date);
        dateStr = format(date, 'yyyy年MM月dd日', { locale: zhCN });
      }
      
      // 提取摘要
      const excerpt = content.split('\n').slice(0, 3).join(' ').substring(0, 160) + '...';
      
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

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 处理日期
    let dateStr = '';
    if (data.date) {
      const date = new Date(data.date);
      dateStr = format(date, 'yyyy年MM月dd日', { locale: zhCN });
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