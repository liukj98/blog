---
title: 不同的二叉搜索树
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/unique-binary-search-trees/)

给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。

示例 1：
```
输入：n = 3
输出：5
```

示例 2：
```
输入：n = 1
输出：1
```

## 代码

```js
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    // 1. 确定 dp 数组以及下标的含义：dp[i] 表示节点值从 1 到 i 互不相同的二叉搜索树有 dp[i] 个
    // 2. 确定状态转移方程：
    // 3. 确定 dp 数组的初始状态：dp[1] = 1
    // 4. 确定遍历顺序
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j-1]*dp[i-j]
        }
    }
    return dp[n]
};
```