---
title: 买卖股票的最佳时机 IV
date: 2022-04-09
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1：
```
输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
```

示例 2：
```
输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
```

## 代码

```js
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
    // 分析：有多少种状态？
    // 0：没有任何操作
    // 1：第一次买入操作
    // 2：第一次卖出操作（第一笔交易结束）
    // 3：第二次买入操作
    // 4：第二次卖出操作（第二笔交易结束）
    // ....
    // 最多有k笔交易，则共有 2*k+1 种状态，所以我们需要推导这 2*k+1 种状态，这和推导至多有两笔交易是类似的
    if(prices.length == 0) return 0;
    let len = prices.length;
    let dp = new Array(len).fill(new Array(2 * k + 1).fill(0))
    for (let j = 1; j < 2 * k; j += 2) { // dp数组的初始化
        dp[0][j] = -prices[0]
    }
    for (let i = 1; i < len; i++) {
        for (let j = 1; j <= 2 * k; j++) {
            if (j % 2) { // 奇数
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i])
            } else { // 偶数
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j-1] + prices[i])
            }
        }
    }
    return dp[len-1][2*k];
};
```
