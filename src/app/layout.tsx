import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/providers';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';

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
        <Providers>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <NavBar />
            <main className="content-wrapper p-6">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}