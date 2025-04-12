---
title: "关于封装axios网络请求降低代码耦合度"
date: "2024-06-03"
tags: ["前端", "Axios", "JavaScript"]
---

## 引言

- 在项目中直接使用`Axios`或其他第三方库来发送网络请求获取数据时，会导致代码与网络请求的逻辑耦合度过高，导致难以维护。
- 本文将讲解如何将网路请求的代码进行封装来进行解耦操作

## 理解耦合度

- 代码耦合分为两种，直接依赖的结构耦合和间接依赖的内容耦合，这两种耦合都会导致**可维护性下降**、**可测试性下降**、**可复用性下降**、**可扩展性下降**。
- 这里在项目中直接使用`Axios`发送网络请求就是结构耦合，如果`Axios`的第三方库发生更新或者废弃，会导致我们的项目非常难以维护，这时将`Axios`封装到一个类中，就可以降低这种直接依赖带来的影响

## Axios 概述

Axios 是一个流行的用于发起 HTTP 请求的 JavaScript 库。它提供了一种简洁、灵活且易于使用的方式来处理网络请求，并且可以在浏览器和 Node.js 环境中使用。

以下是 Axios 的一些主要功能：

1. **支持多种请求方式**：Axios 支持常见的 HTTP 请求方法，如 GET、POST、PUT、DELETE 等，可以满足不同类型的请求需求。

2. **拦截器支持**：Axios 提供了拦截器（Interceptors）功能，可以在请求发送或响应返回之前对它们进行拦截和处理。这使得可以在请求和响应的不同阶段添加全局的处理逻辑，例如认证、错误处理、请求/响应转换等。

3. **Promise API**：Axios 基于 Promise 提供了一致的 API，可以使用链式调用来处理请求和响应。这使得可以更容易地处理异步操作，并使用 Promise 的特性，如 `.then()`、`.catch()`、`.finally()` 等。

4. **请求和响应的转换**：Axios 允许自定义请求和响应的数据转换逻辑。可以通过拦截器将请求数据格式化为特定格式（如 JSON），或者将响应数据进行解析和转换，以适应项目的需求。

5. **错误处理**：Axios 提供了全面的错误处理机制。它会自动检测和处理 HTTP 错误状态码，并将其包装为可读的错误对象。此外，还可以添加自定义的错误处理逻辑，以便更好地处理错误情况。

6. **取消请求**：Axios 允许取消尚未完成的请求。这对于需要中止或忽略之前发出的请求非常有用，例如在用户取消操作或页面导航时。

Axios 成为流行的发起 HTTP 请求的工具有以下原因：

- **易于使用**：Axios 提供了简洁而直观的 API，使得发送和处理 HTTP 请求变得简单和容易上手。

- **广泛的应用**：Axios 可以在浏览器和 Node.js 环境中使用，使得它在前端和后端开发中都具有广泛的适用性。

- **功能丰富**：Axios 提供了许多实用的功能，如拦截器、请求和响应的转换、错误处理等，使得开发人员能够更好地控制和处理网络请求。

- **活跃的社区支持**：Axios 有一个活跃的社区，拥有广泛的用户群体，因此可以获得广泛的支持和资源。这包括文档、示例代码、问题解答等。

总而言之，Axios 是一个功能强大、易于使用且受欢迎的用于发起 HTTP 请求的工具，它提供了许多便捷的功能和良好的开发体验，使得处理网络请求变得更加简单和高效。

## 封装`Axios`

1. 在项目目录中创建一个 services 文件夹来封装网络请求的逻辑。
   ![services文件夹](/images/posts/封装axios降低代码耦合度/image1.png)
2. 在 services 中创建 modules 文件夹来编写复杂的网络请求逻辑，在 request 中封装`Axios`逻辑，创建 index 文件作为 services 统一出口。

![services文件结构](/images/posts/封装axios降低代码耦合度/image2.png)

3. 在 request 中配置 index.js 文件封装一个类来处理网络请求，在 config.js 文件中配置基本选项，例如 BASE_URL、TIMEOUT。

![request文件结构](/images/posts/封装axios降低代码耦合度/image3.png)

4. 配置 request 中的 index.js 文件

```js
import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class HYRequest {
  // 创建构造函数
  constructor(baseURL, timeout) {
    // 创建instance实例
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    // 配置拦截器，对获取数据进行响应
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );
  }

  // request请求
  request(config) {
    return this.instance.request(config);
  }

  // 配置get请求方法
  get(config) {
    return this.request({ ...config, method: "get" });
  }

  // 配置post请求方法
  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

const hyRequest = new HYRequest(BASE_URL, TIMEOUT);

export default hyRequest;
```

> 这里通过类的内聚性将网络请求的逻辑汇集到一起，用`axios.create`函数创建`instance`实例，构造函数接收`baseUrl`和`timeout`来配置`instance`，通过`interceptor`拦截器拦截`response`结果，在通过配置`request`、`get`、`post`实现对`Axios`的调用来完成网络请求，最后用创建好的类来创建一个实例，接收的参数为在`config`文件中配置好的基本选项，然后导出这个实例即可在项目代码中进行使用。

5. 配置 request 中的 config 文件

```js
export const BASE_URL = "http://codercba.com:1888/airbnb/api";

export const TIMEOUT = 10000;
```

> 这里简单配置`request`的基本选项来方便我们发送网络请求

6. 对封装好的 hyRequest 进行导出

```js
import hyRequest from "./request";

export default hyRequest;
```

> 这里是`services`文件夹的统一导出出口，方便进行代码维护

## 使用这里封装的类进行网络请求

```js
import React, { memo, useEffect } from "react";
import hyRequest from "@/services";

const Home = memo(() => {
  // 网络请求的代码
  useEffect(() => {
    hyRequest.get({ url: "/home/highscore" }).then((res) => {
      console.log(res);
    });
  }, []);

  return <div>Home</div>;
});

export default Home;
```

> 这里在 home 组件中先进行导入 hyRequest，即可发送网络请求，配置 config 参数，传入`{ url: "/home/highscore" }`来发送网络请求。

![请求结果](/images/posts/封装axios降低代码耦合度/image4.png)

> 这便是通过封装好的`hyRequest`类发送网络请求得到的结果

## 总结

封装 Axios 的好处：

1.  **降低代码耦合度**：通过封装 Axios，可以将网络请求的具体实现细节隐藏在封装的模块或类中，其他模块只需要与封装后的接口进行交互，从而降低了代码的耦合度。
2.  **提高可维护性**：封装 Axios 可以将网络请求的逻辑集中在一个地方，使得对网络请求的修改和维护更加方便和一致。如果需要更换或升级网络请求库，只需在封装层进行修改，而不需要在整个项目中的各个地方进行修改。
3.  **增强可测试性**：通过封装 Axios，可以更容易地进行单元测试。由于网络请求的逻辑被封装在一个独立的模块或类中，可以方便地模拟请求和响应，编写针对封装层的单元测试。
4.  **提升代码的可复用性**：封装 Axios 可以使得网络请求的代码在不同的项目中更易于复用。封装后的模块或类可以被多个模块或项目共享，而不需要重复编写发送网络请求的代码。

## 结束语

通过封装 Axios 来降低项目代码对于 Axios 的直接依赖，即使后面要更换使用网络请求的第三方库，也可以更加方便的修改和维护代码，在编写项目的时候我们也应该多应用这种思路，合理抽取代码逻辑，使代码更容易维护，提高代码复用性。
