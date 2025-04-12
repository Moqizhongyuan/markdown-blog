'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

// 所有可能的背景图片路径
const backgroundImages = [
  '/images/gallery/15_Shine1_8k.jpg',
  '/images/gallery/47_showroom2_8k.jpg',
  '/images/gallery/8_Snowy2_8k.jpg',
  '/images/gallery/17_Akali_8k.jpg',
  '/images/gallery/29_dark3_t_8k_abbd4.jpg',
  '/images/gallery/8_LunarNewYear2_4k.jpg',
  '/images/gallery/50_civilization5_4k.jpg',
];

export default function BackgroundImage() {
  const { theme } = useTheme();
  const [imagePath, setImagePath] = useState('');
  
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
        quality={75}
        sizes="100vw"
        className="object-cover transition-opacity duration-1000"
        style={{ 
          objectFit: 'cover',
          filter: theme === 'light' 
            ? 'none' 
            : theme === 'dark' 
              ? 'brightness(0.7)' 
              : 'hue-rotate(-10deg) brightness(0.7)'
        }}
      />
    </div>
  );
}