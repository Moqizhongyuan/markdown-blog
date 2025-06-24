---
title: "live2d食用手册"
date: 2025-06-24
tags: ["JavaScript", "前端", "webgl"]
---

## live2d 食用手册

### 引言：为什么使用 live2d

随着大模型的迅速发展，ai 不仅在工作提效上有了很多应用，同样在情绪价值类应用有不错的表现，那么在么提供渲染效率高，且沉浸式的交互，就比较关键了，live2d 就恰好具有这些特征，当然，目前实现数字人的技术基本也是使用的 live2d

- 底层基于 webGL，渲染时只占用少量 cpu 资源
- 通过 live2d 官方提供的 editor 可以轻松制作 2d 动效（必要时可以采用 2d 渲 3d 的效果）
- live2d 官方提供了点击区域判定的函数，让 live2d 能实现常规的 web 点击交互

### 一些问题

不过 live2d 也存在一些问题

- live2d 本身是闭源的，目前官方只提供一个 demo 和压缩之后的 js core 源码
- 社区生态不够完善，live2d 和其他可视化技术不兼容

> 这二者直接导致 live2d 在 web 中集成相当的不方便，目前笔者唯一找到的比较傻瓜式部署的方式只有 pixi 生态提供的 pixi-live2d-display 的插件，如果不使用这个就要去看那个 live2d 提供的又臭又长的示例源码 😩

这里也推荐大家去阅读一下该插件的官方文档[**pixi-live2d-display**插件文档](https://github.com/guansss/pixi-live2d-display/blob/master/README.zh.md)

那么接下来本文将结合 pixi-live2d-display 插件在 web 项目中尝试集成 live2d

### 准备工作

#### live2d 资源

```txt
Mao
  ├─ expressions (表情文件夹)
  ├─ Mao.2048 (存放的图片资源)
  ├─ Mao.cdi3.json
  ├─ Mao.moc3 (模型数据文件)
  ├─ Mao.model3.json (模型配置文件)
  ├─ Mao.physics3.json (物理参数文件)
  ├─ Mao.pose3.json (姿势参数文件)
  └─ motions (动作文件夹)
```

#### live2d 文件结构详解（选读）

##### 📁 核心文件

**`Mao.model3.json`** (1.7KB)

- **作用**: Live2D 模型的**主配置文件**，是整个模型的入口点
- **功能**: 定义了模型的基本信息、纹理路径、动作文件路径、表情文件路径等
- **重要性**: ⭐⭐⭐⭐⭐ (最重要，加载模型时首先读取此文件)

**`Mao.moc3`** (859KB)

- **作用**: Live2D 模型的**二进制数据文件**
- **功能**: 包含模型的几何信息、网格数据、参数定义等核心数据
- **重要性**: ⭐⭐⭐⭐⭐ (模型的本体，不可缺少)

##### 📁 物理和动画文件

**`Mao.physics3.json`** (21KB)

- **作用**: **物理模拟配置文件**
- **功能**: 定义头发、衣服等部件的物理运动效果（如重力、风力、惯性等）
- **效果**: 实现更自然的动态效果

**`Mao.pose3.json`** (254B)

- **作用**: **姿势参数配置文件**
- **功能**: 定义模型的默认姿势和参数组合
- **用途**: 快速设置模型到特定状态

##### 📁 动作和表情

**`motions/`** 文件夹

- **作用**: 存放**动作动画文件**
- **内容**: 包含各种动作的 motion3.json 文件（如待机、点击反应等）
- **格式**: 通常是.motion3.json 文件

**`expressions/`** 文件夹

- **作用**: 存放**表情动画文件**
- **内容**: 包含各种表情的 exp3.json 文件（如开心、生气、害羞等）
- **格式**: 通常是.exp3.json 文件

##### 📁 纹理和渲染

**`Mao.2048/`** 文件夹

- **作用**: 存放**纹理贴图文件**
- **内容**: 模型的 png 纹理图片（2048 表示纹理分辨率为 2048x2048）
- **重要性**: 决定模型的视觉外观

**`Mao.cdi3.json`** (16KB)

- **作用**: **绘制信息配置文件**
- **功能**: 定义模型的渲染参数、混合模式、剔除信息等
- **用途**: 优化渲染性能和视觉效果

##### 🔄 文件加载顺序

1. `Mao.model3.json` → 读取配置信息
2. `Mao.moc3` → 加载模型数据
3. `Mao.2048/` → 加载纹理贴图
4. `Mao.physics3.json` → 应用物理效果
5. `motions/` 和 `expressions/` → 按需加载动作和表情

> 这个就是 live2d 的完整资源，基本都是 live2d editor 帮我们直接生成的，我们其实只用关注这里的 Mao.model3.json 即可，这个文件中会记录 live2d 的动作资源，以及触发动作的判定方式

### 在 web 中集成

```txt
// pnpm-lock.yaml
pixi-live2d-display:
  specifier: ^0.4.0
  version: 0.4.0(0736f5bd67d2e4de7e9fff36ad63fa2e)
pixi.js-legacy:
  specifier: '6'
  version: 6.5.10(39ecb39a2905c2654efd24fdc9f3fb28)
```

#### 要求

- PixiJS：>6
- 浏览器：WebGL，ES6

> 目前 pixi-live2d-display 插件支持的是 PixiJS V6 的版本，版本过高貌似也是不兼容

#### 使用方法

- 使用 cubism2.js+live2d.min.js 以支持 Cubism 2.1 模型
- 使用 cubism4.js+live2dcubismcore.min.js 以支持 Cubism 3 和 Cubism 4 模型
- 使用 index.js+live2d.min.js+live2dcubismcore.min.js 以支持所有版本的模型

```ts
import { Live2DModel } from "pixi-live2d-display";

// 如果只需要 Cubism 2.1
import { Live2DModel } from "pixi-live2d-display/cubism2";

// 如果只需要 Cubism 4
import { Live2DModel } from "pixi-live2d-display/cubism4";
```

> Cubism 4 需要加载 live2dcubismcore.min.js，可以从 [Cubism 4 SDK](https://www.live2d.com/sdk/download/web/) 里解压出来，或者直接引用这个[链接](https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js) （链接偶尔会挂掉，不要在生产版本中使用！）
>
> Cubism 2.1 需要加载 live2d.min.js，从 [2019/9/4](https://help.live2d.com/en/other/other_20/) 起 ，官方已经不再提供该版本 SDK 的下载，但是可以从 [这里](https://github.com/dylanNew/live2d/tree/master/webgl/Live2D/lib) 找到，以及你大概想要的 [CDN 链接](https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js)

这里 pixi-live-display 插件提供了 CDN 的引入方式，也支持使用 npm 来引入，这里就看大家喜好了，然后 core.js 文件笔者是下载下来直接放到 public 中当作静态文件请求的，也可以根据性能需要在 CDN 中引入

```js
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";

// 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
window.PIXI = PIXI;

(async function () {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
  });

  const model = await Live2DModel.from("shizuku.model.json");

  app.stage.addChild(model);

  // 变换
  model.x = 100;
  model.y = 100;
  model.rotation = Math.PI;
  model.skew.x = Math.PI;
  model.scale.set(2, 2);
  model.anchor.set(0.5, 0.5);

  // 交互
  model.on("hit", (hitAreas) => {
    if (hitAreas.includes("body")) {
      model.motion("tap_body");
    }
  });
})();
```

> 这是插件给出的官方代码，基本按照这个做一些更改就可以将 live2d 集成到 web 应用中

然后如果是 NextJS 这种全栈式的框架，会有 ssr 的过程的话，需要做一些特殊处理，因为 pixi-live2d-display 并没有做运行时的环境校验，所以这里需要在运行时通过 import 将依赖包导入，也就是通过懒加载的方式实现导入

```ts
const [{ Live2DModel }, PIXI] = await Promise.all([
  import("pixi-live2d-display/cubism4"),
  import("pixi.js-legacy"),
]);

if (typeof window !== "undefined") {
  (window as any).PIXI = PIXI;
}

// ...其他代码
```

### 小结

本文主要讲解了 live2d 的使用场景以及如何在 web 中集成 live2d，笔者个人觉得 live2d 本身还是非常不错的技术，美中不足的是社区发展不太完善，但不可否认，live2d 交互性和性能都非常不错，有了大模型的加持，也让这个技术更加成熟，至少在情绪价值类应用中还有很多提升空间，和应用场景，未来也期待社区会有更多发展
