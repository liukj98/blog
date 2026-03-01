---
title: 最长递增子序列的长度
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 
示例 1：
```
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
```

示例 2：
```
输入：nums = [0,1,0,3,2,3]
输出：4
```

示例 3：
```
输入：nums = [7,7,7,7,7,7,7]
输出：1
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    // 分析
    // 1. 明确 dp 数组以及下标的含义
    // dp[i] 表示在数组索引 0～i 范围内以 nums[i] 结尾的最长递增子序列的长度（时刻谨记dp[i]的含义）
    // 2. 确定状态转移方程（递推公式）：
    // 只要找到所有在下标为0～i-1的数中比nums[i]小的数，那么以那个数结尾的子序列的长度+1就是dp[i]的值
    // 然后我们从中取最大的一个值
    // dp[i] = Math.max(dp[j] + 1, dp[i]); 其中 nums[j] < nums[i]
    // 3. dp 数组的初始化，最小都为1
    // 4. 确定遍历顺序
    // 5. 返回最终的解：

    // 1. 构建 dp 数组，初始化为 1 （至少递增子串长度为 1）
    const dp = new Array(nums.length).fill(1);
    let res = 1;

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[j] + 1, dp[i]);
            }
        }
    }
    // 2. 从 dp 数组中找出最大的那个值
    for (let k = 0; k < dp.length; k++) {
        res = Math.max(dp[k], res);
    }
    return res;
};
```