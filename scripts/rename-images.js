const fs = require("fs");
const path = require("path");

// 图片所在目录
const galleryDir = path.join(__dirname, "../public/images/gallery");

// 新的图片命名格式: gallery-image-001.jpg
const newNameFormat = "gallery-image-";

// 读取目录中的所有文件
fs.readdir(galleryDir, (err, files) => {
  if (err) {
    console.error("读取目录出错:", err);
    return;
  }

  // 筛选出图片文件
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
  });

  console.log(`找到 ${imageFiles.length} 个图片文件，开始重命名...`);

  // 重命名图片文件
  imageFiles.forEach((file, index) => {
    const fileExt = path.extname(file).toLowerCase();
    const oldPath = path.join(galleryDir, file);

    // 生成新文件名：gallery-image-001.jpg 格式（使用三位数填充）
    const newFileName = `${newNameFormat}${String(index + 1).padStart(
      3,
      "0"
    )}${fileExt}`;
    const newPath = path.join(galleryDir, newFileName);

    // 执行重命名
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`重命名 ${file} 失败:`, err);
      } else {
        console.log(`已重命名: ${file} -> ${newFileName}`);
      }
    });
  });
});
