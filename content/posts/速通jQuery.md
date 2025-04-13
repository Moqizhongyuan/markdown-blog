---
title: "速通jQuery"
date: 2024-07-21
tags: ["JavaScript", "前端", "jQuery"]
---

# 速通 jQuery

## 一、基础概念和选择器

### 1.基本概念及作用，如何简化 js 编程

1. 简介的语法：简化 DOM 操作
2. 跨浏览器兼容性
3. 丰富的功能库：DOM 操作、事件处理、动画效果、AJAX 请求
4. 强大的选择器：类似于 CSS 选择器，使开发人员轻松选取 DOM 元素
5. 插件生态系统
6. 社区支持和文档资源

### 2.jQuery 选择器语法

1. 元素选择器
   - 选择所有 p 元素：$("p")
   - 选择所有 div 元素：$("div")
2. 类选择器
   - 选择所有 example 类的元素：$(".example")
   - 选择同时具有 class1 和 class2 类的元素：$(".class1.class2")
3. ID 选择器
   - 选择具有 myId ID 的元素：$("#myId")
4. 属性选择器
   - 选择具有 data-name 属性的元素：$("[data-name]")
   - 选择具有 data-cagetory 属性且值为 books 的元素：$("[data-category='books']")
5. 子元素选择器：
   - 选择所有 ul 元素下的 li 子元素：$("ul > li")
6. 后代元素选择器：
   - 选择所有 div 元素下的 p 后代元素：$("div p")
7. 兄弟元素选择器：
   - 选择紧接在 h2 元素后的所有 p 元素的兄弟元素：$("h2 + p")
8. 过滤选择器
   - 选择第一个 div 元素：$("div:first")
   - 选择最后一个 p 元素：$("p:last")
   - 选择所有偶数位置的 li 元素：$("li:even")
   - 选择所有包含文本 example 的元素：$(":contains('example')")

## 二、DOM 操作和事件处理

### 1.jQuery 常见操作 DOM 元素方法

1. 添加元素

   - append()：挂载节点末尾（子节点）
   - prepend()：挂载节点开头（子节点）
   - after()：挂载节点之后（兄弟节点）
   - before()：挂载节点之前（兄弟节点）

2. 删除元素

   - remove()：移除节点
   - empty()：清空节点内容（元素、文本）

3. 移动元素

   - appendTo()：移动到节点末尾（子节点）
   - prependTo()：移动到节点开头（子节点）
   - insertAfter()：移动到节点之后（兄弟节点）
   - insertBefore()：移动到节点之前（兄弟节点）

4. 替换元素
   - replaceWith()：替换节点（文本/元素）

### 2.jQuery 常见的 DOM 操作方法

1. addClass()：增加 class
2. removeClass()：移除 class
3. toggleClass()：切换 class 属性
4. attr()：获取节点属性
5. removeAttr()：移除节点属性
6. val()：获取表单值
7. text()：获取文本节点内容
8. html()：获取节点内容，包括子节点，返回一个字符串

### 3.jQuery 处理事件的基本概念和用法

1. 绑定事件处理
2. 事件委托
3. 解除事件绑定
4. 事件对象

## 三、动画效果和特效

### 1.动画效果

1. 淡入淡出（fadeIn/fadeOut）
2. 滑动效果（slideUp / slideDown）
3. 动态调整样式（animate）

### 2.与用户交互添加特效和动态效果

1. hover()
2. click()
3. scroll()

## 四、AJAX 和数据交互

### 1.使用 jQuery 来进行 AJAX 请求，从服务器获取数据并更新页面内容

1. $.ajax(url, method, dataType, success(), error())
2. $.get(url, data, function)
3. $.post(url, data, function)

## 五、插件和扩展

### 1.jQuery 插件的概念和用法

1. 选择合适的插件
2. 引入 jQuery 和插件
3. 配置和初始化插件
4. 调用插件方法
5. 处理插件回调
6. 样式和定制

### 2.编写自定义的 jQuery 插件，以便根据自己的需求扩展 jQuery 的功能

1. 引入 jQuery 库

2. 创建插件函数

   ```jQuery
     $.fn.myPlugin = function(options) {
       // 插件的代码逻辑
     };
   })(jQuery);
   ```

3. 处理选项

   ```jQuery
     $.fn.myPlugin = function(options) {
       var settings = $.extend({
         option1: defaultValue1,
         option2: defaultValue2
       }, options);
       // 使用 settings.option1 和 settings.option2 处理插件逻辑
         };
   })(jQuery);
   ```

4. 遍历元素集合

   ```jQuery
   (function($) {
     $.fn.myPlugin = function(options) {
       var settings = $.extend({
         option1: defaultValue1,
         option2: defaultValue2
       }, options);
       return this.each(function() {
         // 在这里处理每个元素的逻辑，使用 $(this) 引用当前元素
       });
     };
   })(jQuery);
   ```

5. 创建插件函数

```jQuery
(function($) {
  $.fn.myPlugin = function(options) {
    var settings = $.extend({
      option1: defaultValue1,
      option2: defaultValue2
    }, options);

    return this.each(function() {
      var $element = $(this);

      // 操作元素，绑定事件等等
      $element.text(settings.option1);
      $element.on('click', function() {
        // 处理点击事件
      });
    });
  };
})(jQuery);
```

6. 使用插件

```jQuery
<script src="your-plugin.js"></script>
<script>
  $(document).ready(function() {
    $('.target-elements').myPlugin({
      option1: value1,
      option2: value2
    });
  });
</script>
```
