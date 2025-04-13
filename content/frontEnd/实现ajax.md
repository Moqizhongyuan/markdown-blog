---
title: '实现ajax'
date: '2024-10-16'
tags: ["JavaScript", "前端", "网络请求"]
---

## 实现 ajax

### 什么是 ajax

Ajax（Asynchronous JavaScript and XML）是一种用于创建交互式网页应用程序的技术。Ajax 利用 JavaScript、XML（现在更常用 JSON）、HTML 和 CSS 等技术，通过在后台与服务器进行少量数据交换，实现无需刷新整个页面的动态加载内容的功能。ajax 的出现标志着前后端分离的开始，正是 ajax 与各种前端框架的出现，使得前端可以应对复杂的开发情况，可以局部更新网页，通过 diff 算法更新虚拟 dom，极大的优化了用户体验，并衍生了 spa 等开发模式。

### http 请求

请求报⽂有 4 部分组成:

- 请求⾏
- 请求头部
- 空⾏
- 请求体
  ![alt text](/images/posts/实现ajax/http-request.png)

> 所谓的 ajax，说的其实是发送 http 请求，拿到数据之后局部更新网页，ajax 代表的是一种思想，它的本质还是发送 http 请求，只不过在这里我们从服务端获取到的不再是完整的 html，而是一个可以在前端被我们解析的数据，通过处理，更新 html 节点，来达到局部更新的效果，所以我们的目的就是通过写 http 请求拿到我们想要的数据。

### ajax 获取的数据

当谈论到 ajax 获取的数据时，大多数时候指的都是 XML 和 JSON，以下是关于 XML 和 JSON 的一些重要信息：

#### XML（Extensible Markup Language）

- **结构化数据**：XML 是一种标记语言，用于描述数据的结构。它由标签、属性和文本组成，可以表示复杂的数据结构。
- **可扩展性**：XML 具有很高的扩展性，可以定义自定义标签和结构，适用于各种不同领域和应用。
- **繁琐性**：XML 的语法相对冗长，标签需要成对出现，可能会导致文件体积较大。
- **解析**：在 JavaScript 中，可以使用`XMLHttpRequest`对象或现代浏览器提供的`DOMParser`或`XMLSerializer`来解析和处理 XML 数据。

```xml
<!-- 书籍信息示例 -->
<bookstore>
  <book category="fiction">
    <title>Harry Potter</title>
    <author>J.K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="non-fiction">
    <title>Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>
```

#### JSON（JavaScript Object Notation）

- **轻量级**：JSON 是一种轻量级的数据交换格式，易于阅读和编写，也易于解析和生成。
- **数据结构**：JSON 由键值对构成，数据可以是数组或对象，非常适合表示结构化数据。
- **可读性**：与 XML 相比，JSON 的语法更为简洁，易于理解和处理，也更适合在网络传输中使用。
- **解析**：在 JavaScript 中，可以使用`JSON.parse()`方法将 JSON 字符串解析为 JavaScript 对象，使用`JSON.stringify()`方法将 JavaScript 对象序列化为 JSON 字符串。

```json
{
  "bookstore": {
    "books": [
      {
        "category": "fiction",
        "title": "Harry Potter",
        "author": "J.K. Rowling",
        "year": 2005,
        "price": 29.99
      },
      {
        "category": "non-fiction",
        "title": "Learning XML",
        "author": "Erik T. Ray",
        "year": 2003,
        "price": 39.95
      }
    ]
  }
}
```

> 在现代 Web 开发中，JSON 通常被认为是更优选的数据交换格式，因为它更简洁、轻量且易于处理。XML 则在某些特定场景仍然有其用武之地，特别是需要严格结构化数据或复杂文档的情况下。

### 用 xmlHttpRequest 实现 ajax

```js
const SERVER_URL = "/sever";
// 创建xhr对象
const xhr = new xmlHttpRequest();

// 配置请求行，这里的true是指异步请求
xhr.open("GET", SERVER_URL, true);

// 监听xhr请求状态变化
xhr.onreadystatechange = function () {
  if (this.readyStatus !== 4) {
    return;
  }

  if (this.status === 200) {
    // 请求成功
    handle(this.response);
  } else {
    // 请求失败，这里失败的原因有很多种，可能是206，也有可能是3xx，总之就是服务器返回了状态码，但并不受我们想要的状态码
    console.error(this.statusText);
  }
};

// 监听xhr请求失败，这里失败的原因可能是超时等问题，服务器没有正常返回状态码
xhr.onerror = function () {
  console.error(this.statusText);
};

// 配置请求头
xhr.responseType = "json";
xhr.setRequestHeader("accept", "application/json");

xhr.send(null);
```

### 用 Promise 封装 ajax 请求

在实际应用中，我们习惯对网路请求对方法进行一次封装，这样可以达到解耦的目的，简单来说，就是如果那一天`xmlHttpRequest`或是`axios`不能用了，或者是 api 接口改了，我们更方便的更新我们的业务代码，所以这里我们讲用 promise 对 ajax 请求进行一次封装

```js
function getJSON(url) {
  return new Promise((resolve, reject) => {
    // 创建xhr对象
    const xhr = new xmlHttpRequest();

    // 配置请求行，这里的true是指异步请求
    xhr.open("GET", url, true);

    // 监听xhr请求状态变化
    xhr.onreadystatechange = function () {
      if (this.readyStatus !== 4) {
        return;
      }

      if (this.status === 200) {
        // 请求成功
        resolve(this.response);
      } else {
        // 请求失败，这里失败的原因有很多种，可能是206，也有可能是3xx，总之就是服务器返回了状态码，但并不受我们想要的状态码
        reject(this.statusText);
      }
    };

    // 监听xhr请求失败，这里失败的原因可能是超时等问题，服务器没有正常返回状态码
    xhr.onerror = function () {
      reject(this.statusText);
    };

    // 配置请求头
    xhr.responseType = "json";
    xhr.setRequestHeader("accept", "application/json");

    xhr.send(null);
  });
}
```

### 小结

总的来说，ajax 的出现确实推动的前后端分离的发展，将一部分后端逻辑放在前端实现，让前端可以应对复杂情况的开发，同时优化用户体验