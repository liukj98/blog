---
title: 浮动
date: 2022-04-08
---

## 两个 bug

在了解 `float` 之前我们先来看看两个 bug

### margin塌陷

1. **什么是margin塌陷**

   垂直方向的 `margin` 父子元素是结合在一起的，取最大的一个值。就是父级元素包裹了一个子元素，你给父级元素加了一个 `margin-top` 值，给子元素也加了一个 `margin-top` 值，但是你会发现：当子元素的 `margin-top` 值小于父元素的 `margin-top`  值时，子元素的 `margin-top` 值不起作用；当子元素的 `margin-top` 值大于父元素的 `margin-top` 值时，只有子元素的 `margin-top` 值起作用，父元素随子元素一起移动

2. **如何解决margin塌陷**

   触发父元素为 `bfc` 元素（block format context 块级上下文），使父元素不再遵循原来默认的布局格式

3. **如何触发bfc**

    以下四种方式均可触发 `bfc`

   - `position: absolute;`
   - `float: left;`
   - `display: inline-block;`
   - `overflow: hidden;`
     `overflow: hidden;` 对清除浮动也起到一定的作用，因为它们触发了 `bfc`

### margin合并

1. **什么是margin合并**

   两个兄弟级别的元素垂直方向上的 `margin` 会合并，就是上边的元素你设置一个` margin-bottom` 值，下边元素的也设定一个 `margin-top` 值时，浏览器只会让其中一个值起作用（谁大听谁的，一样大的话只让一个值起作用）

2. **弥补方法（不能用）**

   创建一个父级元素 `div`，包裹兄弟级别的一个元素。或者创建两个父级元素 `div`，把两个兄弟级别的元素分别包裹起来，然后给父级元素触发 `bfc`。但是在前端开发的过程中，由于 `HTML` 是框架，不能随便改变，否则会对 `css` 和 `JavaScript` 有影响，所以我们允许这个 `bug` 存在，选择不解决，但是我们可以通过计算来弥补（如增大一个元素的 `margin` 值）
   
## 探究float属性

### 来源 

它的出现最初就是为了解决如何实现文字环绕图片问题的，但是随着前端开发人员的不断开发摸索于是就有了一些其它的功能

### 特点

- 浮动元素会产生浮动流，而产生了浮动流的元素，块级元素是看不到它们的
- 产生了 `bfc` 的元素和文本类属性（inline或inline-block）的元素以及文本都能看到浮动元素
- 不同于完全的分层（position）

### 如何解决因浮动带来的高度坍塌问题

1. **清除浮动**  
   
    ```css
    父元素::after{
        content: '';
        display: block;
        clear: both;
    }
    ```
    
    本质还是在浮动元素后面添加一个块级元素再给它一个 `clear: both;` 属性
    
    ::: tip
    clear属性只有块级元素能用，它是专门为了清除浮动而出现的，而伪元素默认为行级元素，所以你需要显示的将其设置为块级元素
    :::
    
2. **触发父级元素为 `bfc` 元素使其能够看到浮动元素** 

    所以我们经常会写 `overflow: hidden;` 其实就是触发父级元素为 `bfc` 元素，让其能够看到浮动元素从而解决高度坍塌问题
    
    ```css
    父元素{
        overflow: hidden;
        /*position: absolute;*/
        /*float: left;*/
        /*display: inline-block;*/
    }
    ```

