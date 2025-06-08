---
title: "关于日常学习api失效的的问题"
date: "2025-06-08"
tags: ["mock", "软件开发思想", "api", "学习方法"]
---

## 关于日常学习 api 失效的的问题

> 引言：我们在日常搓项目造轮子的时候往往会遇到一件非常头疼的事情，那就是部分下游的 api 会失效，导致我们有时候没办法跟随课程完成整个项目，又或者说我们在开发的过程中，后端的 api 还没有开发完成，但是又不想延后开发进度，可以使用一些方法 mock 数据，本文将以 json 数据格式的 api 为例提供一种解决这类问题的思路

### 项目结构

```text
my-react-app/
├─ fixtures/ #这里其实就是我们需要进行mock数据的文件夹
│   └─ getContent.json
├─ src/
│   ├─ App.stories.ts #通过storybook来mock数据
│   └─ App.tsx
└─ node_modules/
```

### api 异常的文件

```ts
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [contents, setContents] = useState<{ id: number; title: string }[]>([]);
  useEffect(() => {
    fetch("http://balabala/api/contents")
      .then((res) => res.json())
      .then((data) => setContents(data));
  }, []);

  return (
    <>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>{content.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

假如说这里的 `http://balabala/api/contents` 就是一个挂掉的 api，我们没办法正确拉取到这个列表数据来进行渲染，这时候我们就可以通过在 fixture 文件夹下手动写一个 json 文件来 mock 数据

### mock 数据

```json
[
  { "id": 1, "title": "Hello World", "content": "Welcome to my blog" },
  { "id": 2, "title": "Second Post", "content": "React is awesome!" }
]
```

然后在原有的组件中去通过 import 的方式来加载这个数据

```ts
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // ...other code
  useEffect(() => {
    import("../fixtures/getContent.json").then((mod) =>
      setContents(mod.default)
    );
  }, []);

  // ...other code
}

export default App;
```

这样我们就完成了数据的 mock，并不需要依赖任何第三方的依赖也可以完成对接口请求的模拟，那么其实对于 vite 来说，在开发阶段也并不会打包我们开发的代码，也就是说，这里使用的 import 语句其实也是实时发送的网络请求，模拟的最真实的网络请求

![模拟网络请求](/images/posts/关于日常学习api失效的问题/1.png)

### 解耦 mock 与开发

那么需求升级一下，这里我们不仅仅需要在后端没有开发出来接口的时候模拟数据，我们同时还希望现在 mock 之后的代码不要干扰我们以后的联调和测试，我们就需要把这里请求数据的逻辑解耦出去，放到外部实现，然后通过 props 传递给组件，这样就不需要在后面正式上线的时候还要删掉没用的代码，那么也就是我们常说的 CDD（component driven development），通过 storybook，我们可以单独开发组件，然后在 storybook 中发送网络请求 mock 数据，最后整体上线测试的时候正常传入 props 就可以了

```ts
// App.stories.ts
import type { Meta, StoryObj } from "@storybook/react-vite";
import App from "./App";

const meta = {
  title: "Example/App",
  component: App,
  tags: ["autodocs"],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

const contents = await import("../fixtures/getContent.json").then(
  (mod) => mod.default
);

export const Default: Story = {
  args: {
    contents,
  },
};

// App.tsx
import "./App.css";

function App({ contents }: { contents: { id: number; title: string }[] }) {
  return (
    <>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>{content.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

有同学可能就要说了，你这样不就是把请求数据的部分放到了父组件，我还是没办法拉取到正常的数据吗，但是对于开发来说，把一个复杂组件拆分成多个组件，优先开发子组件是非常重要的，这里相当于把复杂的软件工程拆分细化，很大程度上减缓了后面的开发压力，同时这也是一种单元测试和集成测试的思想，这里通过 storybook 展示组件其实就是一个单测，而开发组件最后联调其实就是集成测试的过程

其实我们在开发过程中也不会在某个组件的 useEffect 中去发送网络请求然后获取到数据在进行渲染，因为这种行为是不可控的，我们并不能很好的知道某个网络请求是从哪里的哪个逻辑产生的，这会导致我们的代码非常难管理，更多时候我们应该在顶层统一发送 get 请求（这里的顶层一般就是路由级别的组件了），然后把需要的数据通过 props 透传到子组件，让组件进行展示

当然层层透传其实也是不现实的，更贴近实际的做法其实是通过 mobx 来统一管理 model，然后组件再进行使用，一般是大型且复杂的前端项目会这么做

> 不过这其实并不意味着我们在组件中不发送网络请求了，这里只是强调说不应该通过 useEffect 副作用来管理网络请求，这样会导致不可控，但是我们将网络请求和按钮的点击或者屏幕滚动关联起来，通过具体的动作来发送网络请求其实是一件可控的事情

### 拓展一下

那么其实说了这么多，我们应该怎么开发软件，什么样的模块是好模块，我认为，不过多产生副作用、可单测的模块，就是好模块，那么抛开组件，回到数据层面，我们的模块其实应该具有两个方法

- getData（具体发送网络请求，fetch，XMLrequest）
- getResponseByJSON（拿到网络请求的 json 数据，转换成模块中各个字段的值）

```ts
module {
  getData() {
    const res = await fetch('/api/aaa')
    this.getResponseByJSON(res)
  }

  getResponseByJSON(res: JSON) {
    // 其他逻辑
  }
}
```

那么通过这种形式，我们只需要在单测的时候调用 module.getResponseByJSON，传入 mock 数据，就可以测试我们的模块是否正常工作

> 这里再延伸一下，其实单测也是验收 AI 编程的方式之一

### 小结

本文主要是讲解通过 import 导入一个 json 来 mock 前端所需要的数据，这个其实是比较依赖于 ESModule 生态的，所以有一定的限制性，除了这种方法，用 mock.js 也是可以完成这样 mock 数据的操作的，这也是更广泛的做法，不过主要还是希望传递一个思想，就是我们在进行组件化开发或者 OOP 的时候，应该如何去写一个模块，怎么去拆分一个软件工程，这其实是值得思考的一件事情，数据在笔者看来，也只是依赖的一种，怎么传入这个依赖，怎么管理依赖，才是问题的关键。
