---
title: 整数拆分
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/integer-break/)

给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。

返回 你可以获得的最大乘积 。

示例 1:
```
输入: n = 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
```

示例 2:
```
输入: n = 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
```
## 代码

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
    // 1. 确定 dp 数组以及下标的含义：dp[i] 表示查分数字i得到的最大乘积为 dp[i]
    // 2. 确定状态转移方程：dp[i] = max{j*(i-j), j*dp[i-j]}
    // 3. 确定 dp 数组的初始状态：dp[0] = 0, dp[1] = 0, dp[2] = 1
    // 4. 确定遍历顺序
    const dp = new Array(n + 1).fill(0);
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        let maxVal = 0;
        for (j = 1; j < i; j++) {
            maxVal = max(maxVal, max(j * (i - j), j * dp[i - j]))
        }
        dp[i] = maxVal;
    }
    return dp[n]
};
function max(a, b) {
    return a > b ? a : b;
}
```