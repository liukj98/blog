---
title: 不同路径II
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/unique-paths-ii/)

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 1 和 0 来表示。

示例 1：
```
输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
```

示例 2：
```
输入：obstacleGrid = [[0,1],[0,0]]
输出：1
```

## 代码

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    // 1. 确定 dp 数组以及下标的含义：dp[i][j] 表示从坐标（0，0）到坐标（i，j）的方案数有 dp[i][j] 种
    // 2. 确定状态转移方程：dp[i][j] = dp[i-1][j] + dp[i][j-1]
    // 3. 确定 dp 数组的初始化
    // 4. 确定遍历顺序
    const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    const dp = Array(m).fill().map(item => Array(n).fill(0))
    for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
        dp[i][0] = 1
    }
    for (let j = 0; j < n && obstacleGrid[0][j] === 0; ++j) {
        dp[0][j] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = obstacleGrid[i][j] == 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m-1][n-1]
};
```