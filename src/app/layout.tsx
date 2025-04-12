import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/providers';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';
import BackgroundImage from './BackgroundImage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Markdown博客',
  description: '基于NextJS和Markdown的简洁博客',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Providers>
          <BackgroundImage />
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