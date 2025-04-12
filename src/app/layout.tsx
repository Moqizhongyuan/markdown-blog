import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Markdown博客',
  description: '基于NextJS和Markdown的简洁博客',
};

function getRandomBackgroundImage() {
  const backgroundImages = [
    '/images/gallery/15_Shine1_8k.jpg',
    '/images/gallery/47_showroom2_8k.jpg',
    '/images/gallery/8_Snowy2_8k.jpg',
    '/images/gallery/17_Akali_8k.jpg',
    '/images/gallery/29_dark3_t_8k_abbd4.jpg',
    '/images/gallery/8_LunarNewYear2_4k.jpg',
    '/images/gallery/50_civilization5_4k.jpg',
  ];
  
  // 生成一个随机索引
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 在服务器端随机选择一个背景图片
  const backgroundImage = getRandomBackgroundImage();
  
  return (
    <html lang="zh-CN">
      <body 
        className={inter.className}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8 pb-4 border-b content-wrapper p-4">
            <h1 className="text-3xl font-bold">
              <a href="/">Markdown博客</a>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">首页</a></li>
                <li><a href="/posts" className="hover:underline">文章</a></li>
                <li><a href="/gallery" className="hover:underline">图库</a></li>
                <li><a href="/about" className="hover:underline">关于</a></li>
              </ul>
            </nav>
          </header>
          <main className="content-wrapper p-6">{children}</main>
          <footer className="mt-8 pt-4 border-t text-center text-sm text-gray-500 content-wrapper p-4">
            <p>© {new Date().getFullYear()} Markdown博客 - 基于NextJS和Tailwind构建</p>
          </footer>
        </div>
      </body>
    </html>
  );
}