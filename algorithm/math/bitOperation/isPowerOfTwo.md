---
title: 2 的幂
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/power-of-two/)

给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。

如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方。

示例 1：
```
输入：n = 1
输出：true
解释：20 = 1
```

示例 2：
```
输入：n = 16
输出：true
解释：24 = 16
```

示例 3：
```
输入：n = 3
输出：false
```

示例 4：
```
输入：n = 4
输出：true
```
## 代码

向这种类似的题目一般都会利用二进制相关的性质（`按位与`、`按位或`、`按位异或`的计算结果等）来求解

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n-1)) === 0;
};
```