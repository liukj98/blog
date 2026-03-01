---
title: 零钱兑换
date: 2022-04-22
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/coin-change/)

给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。

示例 1：
```
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1
```

示例 2：
```
输入：coins = [2], amount = 3
输出：-1
```

示例 3：
```
输入：coins = [1], amount = 0
输出：0
```

## 代码

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    // 1. 确定 dp 数组以及下标的含义
    // dp[j] 表示凑出金额为j的最少硬币数为 dp[j]
    // 2. 确定状态转移方程
    // dp[j] = Math.min(dp[j], dp[j-coins[i]]+1)
    // 3. 确定 dp 数组的初始化
    // dp[0] = 0
    // 4. 确定 dp 数组的遍历顺序
    // 先遍历物品再遍历背包容量或先遍历背包容量再遍历物品都可以
    // 5. 返回最终的解
    // dp[amount]

    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) { // 完全背包问题 ==> 顺序遍历
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
        }
    }
    return dp[amount] == Infinity ? -1: dp[amount]
};
```