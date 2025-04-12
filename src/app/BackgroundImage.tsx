'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

// 精选的背景图片路径，两边有内容，构图更平衡的图片
const backgroundImages = [
  '/images/gallery/47_showroom2_8k.jpg',      // 室内场景，左右平衡
  '/images/gallery/CCD8F51C80C270293E5E4FF1FC47E1A5.jpg', // 在林中的人物，两边有树木
  '/images/gallery/AC8C52428587F83B1E79D35D8EF37C91.jpg',  // 广阔的风景与人物
  '/images/gallery/1_DressingRoom2_4k.jpg',   // 精美的室内空间
  '/images/gallery/280DFEB906D3742B3DD2AB25782CF861.jpg'  // 空间感强的场景
];

export default function BackgroundImage() {
  const { theme } = useTheme();
  const [imagePath, setImagePath] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 组件挂载时随机选择一张图片
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setImagePath(backgroundImages[randomIndex]);
  }, []);
  
  if (!imagePath) return null;
  
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden">
      <Image
        src={imagePath}
        alt="Background"
        fill
        priority
        quality={85}
        sizes="100vw"
        className={`object-cover transition-all duration-1500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center',
          filter: theme === 'light' 
            ? 'saturate(0.85) brightness(1.05)' 
            : theme === 'dark' 
              ? 'saturate(0.7) brightness(0.6)' 
              : 'saturate(0.75) hue-rotate(-5deg) brightness(0.65)'
        }}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
}