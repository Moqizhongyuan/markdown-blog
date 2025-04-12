---
title: "深入理解 BFC"
date: 2024-10-31
tags: ["CSS", "前端", "BFC"]
---

## 深入理解 BFC

### 什么是 BFC

BFC（Block Formatting Context，块级格式化上下文）是 CSS 中的一个重要概念，用于描述页面上的一个独立的渲染区域，其中块级盒子按照特定的规则进行布局。BFC 的形成可以影响盒子的布局、浮动、清除浮动以及外边距塌陷等方面。

### BFC 的特性

- **内部的浮动元素不会影响外部的元素**： 在 BFC 内部的浮动元素不会改变外部元素的布局。这意味着外部元素不会围绕 BFC 内部的浮动元素进行调整。

- **外边距的合并**： 在 BFC 内部，元素的垂直外边距不会与外部元素的垂直外边距合并。这可以避免意外的布局问题。

- **包含浮动元素**： BFC 可以包含浮动的元素，使其在 BFC 的高度中得到包含，从而避免父元素的高度为 0 的问题。

- **避免外部的影响**： BFC 中的元素不受外部元素的影响，例如外部的外边距、浮动等。

### BFC 的形成条件

- `overflow` 属性设置为 `hidden`、`auto` 或 `scroll`
- `display` 设置为 `flex` 或 `grid`
- `position` 设置为 `absolute` 或 `fixed`
- `float` 设置为 `left` 或 `right`
- 存在 `border`，`padding` 等属性

### 讨论 BFC 与边界坍塌的关系

对于早期的浏览器来说，我们为了让内容显示的更紧凑，浏览器会自动采用外边距合并的操作，取两个外边距较大的那个，以此来使用更少的页面展示更多的内容，而我们通过触发 BFC，让浏览器判断我们这里的内容是一个独立的块，或者让我们的内容脱离正常的文本流，都可以解决边界坍塌的问题（当然后者其实也不需要解决边界坍塌的问题）。

### 代码实践

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BFC Example</title>
    <style>
      .contain {
        border: 1px solid black; /* 为了方便观察 */
        overflow: hidden; /* 触发 BFC */
      }

      .flex-contain {
        border: 1px solid black;
        display: flex;
        flex-direction: column;
      }

      .float-box {
        float: left;
        width: 100px;
        height: 100px;
        background-color: lightblue;
        margin: 10px;
      }

      .normal-box {
        width: 100px;
        height: 100px;
        background-color: lightcoral;
        margin: 10px;
      }

      .fixed-box {
        position: fixed;
        width: 100px;
        height: 100px;
        background-color: lightcoral;
        margin: 10px;
        right: 0;
      }

      .absolute-box {
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: lightcoral;
        margin: 10px;
        right: 0;
      }
    </style>
  </head>
  <body>
    <div class="contain">
      <div class="float-box">Float Box 1</div>
      <div class="float-box">Float Box 2</div>
    </div>

    <div class="contain">
      <div class="normal-box">Normal Box 1</div>
      <div class="normal-box">Normal Box 2</div>
    </div>

    <div class="flex-contain">
      <div class="normal-box">Normal Box 1</div>
      <div class="normal-box">Normal Box 2</div>
    </div>

    <div class="contain" style="position: relative; height: 150px; width: 50vw">
      <div class="fixed-box">Normal Box 1</div>
      <div class="absolute-box">Normal Box 2</div>
    </div>
  </body>
</html>
```
