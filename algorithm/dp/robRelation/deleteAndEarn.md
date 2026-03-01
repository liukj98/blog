---
title: 删除并获得点数
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/delete-and-earn/)

给你一个整数数组 nums ，你可以对它进行一些操作。

每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

示例 1：
```
输入：nums = [3,4,2]
输出：6
解释：
删除 4 获得 4 个点数，因此 3 也被删除。
之后，删除 2 获得 2 个点数。总共获得 6 个点数。
```

示例 2：
```
输入：nums = [2,2,3,3,3,4]
输出：9
解释：
删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
总共获得 9 个点数。
```
## 代码

```js
function max(a, b) {
    return a > b ? a : b;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    let len = nums.length;
    // 设计状态
    const dp = new Array(len);
    // 确定初始状态
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1])
    for (let i = 2; i < len; i++) {
        // 找出状态转移方程
        dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])
    }
    return dp[len - 1];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
    let len = nums.length;
    let maxValue = 0;
    for (let i = 0; i < len; i++) {
        maxValue = max(maxValue, nums[i]);
    }
    // 找到nums中的最大值，创建新的数组
    const arr = new Array(maxValue + 1).fill(0);
    for (let i = 0; i < len; i++) {
        arr[nums[i]] += nums[i]
    }

    return rob(arr);
};
```