---
title: 立即执行函数
date: 2022-04-08
---

## 一、基本概念

- 在函数定义的时就执行，执行完后释放内存空间，你不能再通过函数名（变量）找到它了，所以它也称为匿名函数
- **只有表达式才能被执行符号`()`执行**

## 二、立即执行函数的演变
```js 
var demo = function () {
  console.log('dd');//控制台打印出'dd'。原因是这是一个函数表达式再加一个执行符()可以被立即执行
}()

function test() {
  console.log('dd');//报错。这是函数声明加执行符() 不能被立即执行
} ();

!function test() {
  console.log('dd');//控制台打印出'dd'。函数声明前加一个"!"会使函数声明变成表达式然后被执行符()执行
}();

+function test() {
  console.log('dd');//控制台打印出'dd'。原因同上
}();

-function test() {
  console.log('dd');//控制台打印出'dd'。原因同上
}();

function test() {
  console.log("hshsh");//即不报错，也不输出。系统会这样执行显示别函数声明test，再识别(1,2,3)为表达式，所以即不报错，也不输出
} (1, 2, 3);

(function test() {
  console.log('dd');//控制台打印出'dd'。函数声明test会被外面的小括号()包裹变成一个表达式然后再被执行符()执行
})()

(function () {
console.log('dd');//控制台打印出'dd'。原因同上
}())

// 针对初始化功能的函数
(function (a, b, c) {
console.log(a + b + c);
}(1, 2, 3))
// 也可以有返回值
var num = (function (a, b) {
  return a + b;
}(1, 2))
```

## 三、两种形式
根据上面的演示，但又由于在实际开发过程中我们用的最多的也就是下面两种形式，所以就把它单独拿出来讲，并命名为立即执行函数，但是它的本质还是**只有表达式才能被执行符号`()`执行**
1. `(function(){}())` W3C推荐
2. `(function(){})()  `  
```js
//结果是不报错也不执行（阿里巴巴出的题。真的很恶心）
function test(x) {
  console.log(arguments);
} (1, 2, 3, 4);

//若是下面的话，它就是错误的  它只是函数声明再加执行符号() 并不是表达式加执行符号()
function test() {
  console.log(arguments);
} ()

+ function test() {
  console.log("a");
}();//自动忽略函数名

! function test() {
  console.log("a");
}();//自动忽略函数名

- function test() {
  console.log("a");
}();//自动忽略函数名

//这样是错误的，因为它不是表达式，它是函数声明，函数声明不可以被立即执行符号()执行
function test() {
  console.log('a');
} ()

var demo = function test() {
  console.log()
}()//执行完后自动销毁 你不能再通过函数名再次执行了
```

## 四、用途
- **解决闭包问题**

现在我们来看一个需求：如下，我在一个函数体内通过for循环生成十个函数并将其作为返回值返回，在外部执行该函数并用一个变量来接收它，然后循环遍历执行这十个函数，你却会发现在控制台打印的全是10。而我们理想的结果因该是依次打印0,1,2,3,4,5,6,7,8,9,这该怎么办？（有什么解决方法吗？）可以用立即执行函数来解决。至于为什么会产生这种结果，这涉及到执行期上下文，作用域链等的知识，内容非常多，该篇博客暂时不讲，以后抽时间会将其作为单独的一篇文章来讲的。

```js {17-21}
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i);
    }
  }
  return arr;
}
var myArr = test();
for (var j = 0; j < 10; j++) {
  myArr[j]();//打印出10个10
}
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    (function (j) {//通过立即执行函数解决闭包问题
      arr[j] = function () {
        console.log(j);
      }
    }(i));
  }
  return arr;
}
var myArr = test();
for (var j = 0; j < 10; j++) {
  myArr[j]();//分别打印出1、2、3、4、5、6、7、8、9、10
}
```

当然，你也可以通过es6的新语法`let`声明变量的方式来解决闭包问题

```js
function test() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i);
    }
  }
  return arr;
}
let myArr = test();
for (let j = 0; j < 10; j++) {
  myArr[j]();//分别打印出1、2、3、4、5、6、7、8、9、10
}
```

- **模块化开发**

在实际的开发过程中，一个项目往往是由多人合作完成的，进而这就带来了一个问题：你定义的变量和我定义的变量有可能发生冲突，并且也会污染全局变量。这个问题又如何解决？

1. 在早期我们可以通过立即执行函数，将我们开发的代码放到这个立即执行函数中，由于立即执行函数也是函数，它也会形成函数作用域，进而来避免污染全局变量
2. 现在由于前端工程化的发展（**webpack**，**ES6模块化**等），也很少自己手动写一个立即执行函数来避免污染全局变量了，但是对它的了解还是非常有必要的

如果大家学过jquery源码的话，就会发现它在最外层就用到了立即执行函数