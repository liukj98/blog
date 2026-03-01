---
title: 构造函数
date: 2022-04-08
---

# 导读

我们通过 `new Constructor()` 这种形式来创建对象应该非常熟悉了，但是 `new` 关键字内部究竟发生了什么，你是否有探究过呢？接下来让我们一步步揭开它神秘的面纱吧。

## 一、构造函数的内部原理

假设我们写了一个这样的构造函数：`function Person(){}`，系统会为 `Person` 构造函数添加一个静态属性 `prototype`，该属性为一个对象，该对象有两个属性，分别为 `constructor` 和 `__proto__`，代码如下
```js
function Person(){};
//下面代码是系统自动添加的
Person.prototype = {
  constructor: Person,//指向Person构造函数
  __proto__: Object//指向Object对象
}
```

然后我们通过 `new` 关键字来创建一个对象 `person` ，如 `const person = new Persopn();` 时，构造函数内部会发生以下三步：

1. 第一步：在函数体第一行系统开始添加如下代码（系统内部做的操作我们是看不见的）

   ```js {3-5}
   function Person(){
     // 1.第一步：系统添加如下代码
     var this = {
       __proto__ : Person.prototype,
     };
   }
   ```

2. 第二步：增属性(自己手动添加的)

   ```js {6}
   function Person(){
     // 1.第一步：系统添加如下代码
     var this = {
       __proto__ : Person.prototype,
     };
     // 2.第二步：我们手动添加的代码...，如 this.age=18
   }
   ```

3. 第三步：系统隐式返回 `this`

   ```js {8-9}
   function Person(){
     // 1.第一步：系统添加如下代码
     var this = {
       __proto__ : Person.prototype,
     };
     // 2.第二步：我们手动添加的代码...，如this.age=18
   
     // 3.第三步：系统添加如下代码
     return this;
   }
   ```
我们把以上通过 `new` 关键字构建一个对象时系统内部所做的操作称为**构造函数的隐式三段论**。

接下来我们通过实际的例子来验证一下以上三步是否正确执行。

**示例1**

```js
function Person(name, age){
  this.age = age;
  this.name = name;
}
const person = new Person("lkj", 18)
console.log(person)
```
控制台打印结果如下

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/web前端图片资源/JS/Snipaste_2022-03-23_11-24-41.44tn0y9u3my0.webp)

**示例2**

```js
function Student(){

}
const student  = new Student();
console.log(student); 
```

控制台打印结果如下
![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/web前端图片资源/JS/Snipaste_2022-03-23_11-25-00.7jojlbibzl80.webp)

更多例子大家可以自己多去测试验证啊，这里就不再举例了。

## 二、别样的礼物

根据上面的内容我们已经了解了构造函数内部的 `this` 原理了。接下来，我们再进一步探讨构造造函数体内我们若是显示地返回一个数据呢，构造函数是否仍然会返回 `this` ？

1. 显示返回一个原始值
    ```js
    function Test(){
      this.name = "lkj";
      this.age = 12;
      return 12;// 显示返回一个数字
    }
    const test = new Test();
    console.log(test);
    ```

    控制台打印结果如下

    ![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/web前端图片资源/JS/Snipaste_2022-03-23_11-24-20.1clfccaspxc0.webp)

2. 显示返回一个对象

    ```js
    function Test() {
      const obj = {
        number: 201730134057,
        sex: "male"
      }
      this.name = "lkj";
      this.age = 12;
      return obj; // 显示返回一个对象
    }
    const test = new Test();
    console.log(test); 
    ```

    控制台打印的结果如下

    ![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/web前端图片资源/JS/Snipaste_2022-03-23_11-23-48.62sg3pxbmm80.webp)


**总结**

由上面的例子我们可知：
- 若你在构造函数中显示返回一个对象(如普通对象、函数、数组等) ，那么隐式第三步（`return this`）就不会执行。
- 若你在构造函数中显示返回一个原始值(如数字、字符串、布尔值等)，那么隐式第三步（`return this`）仍会执行，而我们显示 `return` 的内容则会忽略。