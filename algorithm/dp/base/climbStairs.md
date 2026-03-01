---
title: 爬楼梯
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/climbing-stairs/)

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

示例 1：
```
输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶
```

示例 2：
```
输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
```
## 代码

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    // 1. 确定 dp 数组以及下标的含义：dp[i] 表示爬到第 i 阶共有 dp[i] 种方法数
    // 2. 确定状态转移方程：dp[i] = dp[i-1] + dp[i-2]
    // 3. 确定 dp 数组初始化状态：dp[1] = 1, dp[2]=2
    // 4. 确定 dp 数组的遍历顺序
    // const dp = new Array(n+1).fill(0);
    // dp[1] = 1;
    // dp[2] = 2;
    // for(let i = 3; i <= n; i++){
    //     dp[i] = dp[i-1] + dp[i-2];
    // }
    // return dp[n];

    // 优化：空间压缩
    if(n == 1) return dp[1];
    const dp = new Array(3).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    for(let i = 3; i <= n; i++){
        let sum = dp[1] + dp[2];
        dp[1] = dp[2];
        dp[2] = sum;
    }
    return dp[2];
};
```