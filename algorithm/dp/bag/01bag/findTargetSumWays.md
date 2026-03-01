---
title: 目标和
date: 2022-04-20
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/target-sum/)

给你一个整数数组 nums 和一个整数 target 。

向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

示例 1：
```
输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

示例 2：
```
输入：nums = [1], target = 1
输出：1
```

## 代码

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    // 如何转化为 01 背包问题呢？
    // 一般而言，给出的 nums 数组就是对应 01 背包的物品集
    // 从物品集中选择若干个物品（nums中选择若干个数字）归类为 ‘+’ 符号
    // 那么剩下的未被选择的数字就自然归为 ‘-’ 符号
    // 假设归为 ‘+’ 符号的数字总和为 x，那么归为 ‘-’ 符号的数字总和一定为 sum-x
    // 根据题意可知 x - (sum - x) = target; 可得 x = (target+sum)/2 
    // 此时问题转化为：从给出的 nums 数组选出若干个数字使得所选的数字之和为(target+sum)/2，总共有多少中选法
    // 等价于装满容量为 x 的背包有多少种方法
    // 此时的 0<x<sum，并且 x 为正整数，所以 target+sum 一定为偶数
    
    // 1. dp[i] 表示从给出的 nums 数组选出若干个数字使得所选的数字之和为i的方法种数
    let len = nums.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
        sum += nums[i];
    }
    if ((target + sum) % 2 == 1) return 0;
    if(Math.abs(target) > sum) return 0;
    let x = (target + sum) / 2;
    let dp = new Array(x + 1).fill(0);
    dp[0] = 1
    for (let i = 0; i < len; i++) { 
        for (let j = x; j >= nums[i]; j--) {
            dp[j] += dp[j-nums[i]]
        }
    }
    return dp[x];
};
```