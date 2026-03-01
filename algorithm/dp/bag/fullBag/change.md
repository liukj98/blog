---
title: 零钱兑换 II
date: 2022-04-10
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/coin-change-2/)

给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。

请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。

假设每一种面额的硬币有无限个。 

题目数据保证结果符合 32 位带符号整数。

示例 1：
```
输入：amount = 5, coins = [1, 2, 5]
输出：4
解释：有四种方式可以凑成总金额：
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

示例 2：
```
输入：amount = 3, coins = [2]
输出：0
解释：只用面额 2 的硬币不能凑成总金额 3 。
```

示例 3：
```
输入：amount = 10, coins = [10] 
输出：1
```

## 代码

```js
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    // 1. 确定 dp 数组以及下标的含义
    // dp[j] 表示在一个整数数组 coins 中凑出金额总数为 j 的组合数为 dp[j]
    // 2. 确定状态转移方程：
    // 针对每一个满足条件的 coins[i] 都有 dp[j-coins[i]] 中组合数，将这些组合数累加即为 dp[j]
    // dp[j] += dp[j-coins[i]]
    // 3. 确定 dp 数组的初始状态
    // dp[0] = 1
    // 4. 确定遍历顺序
    // 5. 返回最终的解
    // dp[amount]

    const dp = new Array(amount + 1).fill(0)
    // 初始化
    dp[0] = 1;
    for (let i = 0; i < coins.length; i++) { // 遍历物品（钱币）
        for (let j = coins[i]; j <= amount; j++) { // 遍历背包容量（金额）
            dp[j] += dp[j-coins[i]]
        }
    }
    // 返回最终的解
    return dp[amount]
};
```

## 总结

### 一、关于完全背包核心代码

```js
// 物品集
const weight = [1, 3, 4] // 重量
const value = [15, 20, 30] // 价值
const bagWeight = 4;

// 先遍历物品，再遍历背包容量
for (let i = 0; i < weight.length; i++) { // 遍历物品
  for (let j = weight[i]; j <= bagWeight; j++) { // 遍历背包容量，背包容量应从当前的物品重量开始，由前往后遍历（顺序遍历）
    dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
  }
}

// 先遍历背包容量，再遍历物品
for (let j = 1; j <= bagWeight; j++) { // 遍历背包容量，直接从 1 开始遍历，因为背包容量为0的背包不可能装入任何物品，可直接将dp数组初始化为0
  for (let i = 0; i < weight.length; i++) { // 遍历物品
    if (j >= weight[i]) { // 背包容量必须大于会等于当前物品的容量才能装
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }
}
```

### 二、关于完全背包问题变种

在实际应用中经常会出现 01背包、完全背包的变种问题

比如，问题求的是满足背包条件的组合数（方案总数）而不是求最大价值是多少

就拿这道题为例，这道题其实和 [目标和](../01bag/findTargetSumWays.md) 有异曲同工之妙，求的都是组合数，或是方案总数，而不是最大价值，其递推公式都是 $dp[j] += dp[j-nums[i]]$

但是这道题的遍历顺序就有讲究了，必须是先遍历硬币（物品）再遍历金额（背包容量），这样才能保证组合数不重复