---
title: 圣杯模式
date: 2022-04-08
---
## 一、知识回顾

在了解圣杯模式之前 我们先来简单的学习下**原型**及其**原型链**
现在以Person函数为例```function Person() {}```

1. 当我们定义一个函数时 系统内部会有这样一段代码生成
```js
Person.prototype = {
    contructor: Person,
    __proto__: Object.prototype
}
```
2. 当我们通过new关键字来创建一个对象时```var person = new Person()``` 系统内部在函数体内首先会生成这样一段代码
```js
var this = {
    __proto__:  Person.prototype
}
//...是我们写的代码
return this;
```
## 二、圣杯模式
```js
Father.prototype.lastName = "Deng";
function Father(){
}
function Son(){
}

// 圣杯模式
function inherit(Target, Origin) {
    function F(){};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;//使Target的构造器为Target
    Target.prototype.uber = Origin;//Target由Origin继承而来
}
inherit(Son, Father);
var son = new Son();
var father = new Father();
console.log(son.lastName); //输出"Deng"
Son.prototype.sex = "male";
console.log(son.sex);//输出"male"
console.log(father.sex)//输出undefined
```
- 当执行完这一行代码```var son = new Son();```时son为如下对象
```js
son = {
    __proto__: {//Son.prototype 而Son.prototype指向new F(); 
        __proto__: {//F.prototype 而F.prototype指向Father.prototype
            lastName: "Deng",
            constructor: Father,
            __proto__: Object.prototype
        }
    }
}
```
- 当你添加这一行代码```Son.prototype.sex = "male";```时 son会变为如下对象
```js {3}
son = {
    __proto__: {
        sex: "male",
        __proto__: {
            lastName: "Deng",
            constructor: Father,
            __proto__: Object.prototype
        }
    }
}
```
- 圣杯模式的升级版
```js
// YUI
var inherit = (function(){
    function F(){};
    return function(Target, Origin){
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin;
    }
}())
```