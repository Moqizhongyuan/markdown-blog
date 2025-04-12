import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

type ImageData = {
  name: string;
  path: string;
  displayName: string;
};

function getImages(): ImageData[] {
  const galleryDir = path.join(process.cwd(), "public/images/gallery");

  // 确保目录存在
  if (!fs.existsSync(galleryDir)) {
    console.error(`图库目录不存在: ${galleryDir}`);
    return [];
  }

  try {
    // 读取目录中的图片文件
    const fileNames = fs.readdirSync(galleryDir);

    // 过滤出图片文件并创建图片数据对象
    const imageFiles = fileNames
      .filter((fileName) => {
        const ext = path.extname(fileName).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
      })
      .map((fileName) => {
        // 为使用统一格式命名的图片创建更友好的显示名称
        let displayName = "";

        if (fileName.startsWith("gallery-image-")) {
          // 从新命名的文件提取编号
          const numberMatch = fileName.match(/gallery-image-(\d+)/);
          if (numberMatch && numberMatch[1]) {
            displayName = `鬼刀插画 #${parseInt(numberMatch[1])}`;
          } else {
            displayName = fileName
              .replace(/\.[^/.]+$/, "") // 移除扩展名
              .replace(/[_-]/g, " ") // 将下划线和连字符替换为空格
              .replace(/\b\w/g, (l) => l.toUpperCase()); // 将每个单词的首字母大写
          }
        } else {
          // 处理其他格式的文件名
          displayName = fileName
            .replace(/\.[^/.]+$/, "") // 移除扩展名
            .replace(/[_-]/g, " ") // 将下划线和连字符替换为空格
            .replace(/\b\w/g, (l) => l.toUpperCase()); // 将每个单词的首字母大写
        }

        // 构建图片路径并确保其有效
        const imagePath = `/images/gallery/${fileName}`;

        return {
          name: fileName,
          path: imagePath,
          displayName,
        };
      });

    // 按文件名排序，使gallery-image-001在前面
    imageFiles.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true })
    );

    return imageFiles;
  } catch (error) {
    console.error("读取图库出错:", error);
    return [];
  }
}

export default function GalleryPage() {
  const images = getImages();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">鬼刀插画图库</h1>

      <p className="mb-8">
        这里展示了一系列精美的鬼刀风格插画作品。您可以点击图片查看大图。
      </p>

      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.name}
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={image.path} target="_blank">
                <div className="relative h-64 w-full">
                  <Image
                    src={image.path}
                    alt={image.displayName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform hover:scale-105"
                    priority={false}
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-semibold truncate">
                    {image.displayName}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-lg">未找到图片，请确保图片文件已正确放置。</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/posts/gallery"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          查看详细介绍
        </Link>
      </div>
    </div>
  );
}
