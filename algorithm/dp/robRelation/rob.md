---
title: 打家劫舍
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/house-robber/)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1：
```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

示例 2：
```
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // 1. 确定 dp 数组以及下标的含义：dp[i] 表示打劫下标为 0～i 房屋所能偷窃到的最高金额为 dp[i]
    // 2. 确定状态转移方程：dp[i] = max(dp[i-2] + nums[i], dp[i-1]);
    // 3. 确定 dp 数组的初始状态：dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
    // 4. 确定 dp 数组遍历顺序：顺序遍历（从左到右）
    let len = nums.length;
    if(len == 1) return nums[0];
    let dp = new Array(len).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for(let i = 2; i < len; i++){
        dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1]);
    }
    return dp[len-1];
};
```