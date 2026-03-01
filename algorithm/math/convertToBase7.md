---
title: 七进制数
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/base-7/)

给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。

示例 1:
```
输入: num = 100
输出: "202"
```

示例 2:
```
输入: num = -7
输出: "-10"
```
## 代码

```js
/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
    if(num == 0) return "0";
    let res = "";
    let negative = num < 0;
    num = Math.abs(num)
    while (num > 0) {
        let a = num % 7; // 余数
        let b = Math.floor(num / 7);
        num = b;
        res = a + res;
    }
    if(negative){ // 是负数
        res = "-" + res;
    }
    return res;
};