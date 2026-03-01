---
title: 最大子数组和
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/maximum-subarray/)

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

示例 1：
```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

示例 2：
```
输入：nums = [1]
输出：1
```

示例 3：
```
输入：nums = [5,4,-1,7,8]
输出：23
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	// 1. 确定 dp 数组以及下标的含义
    // dp[i] 表示在数组索引 0～i 范围内以 nums[i] 结尾的连续子数组的最大和为dp[i]
    // 2. dp[i] = max(dp[i - 1] + nums[i], nums[i]);
    // 3. 明确 dp 数组的遍历顺序
    let len = nums.length;
    let dp = new Array(len).fill(-Infinity);
    dp[0] = nums[0];
    let res = -Infinity;
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        res = Math.max(res, dp[i]);
    }
    res = Math.max(res, dp[0])
    return res;
};

// 空间优化：状态压缩
// i 状态的值只取决于 i-1 状态的值（当前状态只取决于前一个状态），
// 则可以进行优化（空间优化）
var maxSubArray1 = function (nums) {
  // 维护两个指针 dp_0 和 dp_1，与最终结果 res
  let dp_0 = nums[0],
        dp_1 = 0,
        res = dp_0;
    for (let i = 1; i < nums.length; i++) {
        dp_1 = max(dp_0 + nums[i], nums[i]);
        dp_0 = dp_1;
        res = max(res, dp_1);
    }
    return res;
};
```