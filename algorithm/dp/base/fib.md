---
title: 斐波那契数列
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/fibonacci-number/)

斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1
给定 n ，请计算 F(n) 。

示例 1：
```
输入：n = 2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1
```

示例 2：
```
输入：n = 3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2
```

示例 3：
```
输入：n = 4
输出：3
解释：F(4) = F(3) + F(2) = 2 + 1 = 3
```

## 代码

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const dp = new Array(n + 1);
  // dp 数组的初始化
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // 状态转移方程
  }
  // 返回最终的解
  return dp[n]
};

// 状态压缩：空间优化
var fib = function (n) {
    if(n <= 1) return n;
    let pre = 0,
        cur = 1;
    for (let i = 2; i <= n; i++) {
        let sum = pre + cur;
        pre = cur;
        cur = sum;
    }
    return cur;
};
```