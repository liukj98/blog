---
title: 最长连续递增序列
date: 2022-04-10
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)

给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

示例 1：
```
输入：nums = [1,3,5,4,7]
输出：3
解释：最长连续递增序列是 [1,3,5], 长度为3。
尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。 
```

示例 2：
```
输入：nums = [2,2,2,2,2]
输出：1
解释：最长连续递增序列是 [2], 长度为1。
```

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
    // 方法一：暴力破解
    let len = nums.length;
    let res = 1; // 记录最终的结果
    let count = 1; // 统计连续递增序列的长度
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (nums[j] > nums[j - 1]){
                count++;
                res = Math.max(res, count);
            }else{ // 退出当前循环
								break;
            }
        }
				// 内层循环结束后将 count 置为1
        count = 1;
    }
    return res;
};

var findLengthOfLCIS = function (nums) {
	// 方法二：动态规划
    // 1. 明确 dp 数组以及下标的含义：
    // dp[i] 表示在数组索引 0～i 范围内以 nums[i] 结尾的最长连续递增子序列的长度为dp[i]
    // 2. 明确状态转移方程：dp[i] = dp[i-1] + 1，nums[i-1] < nums[i]
    // 3. 明确 dp 数组的初始状态，初始化为1
    // 4. 明确 dp 数组的遍历顺序
    // 5. 返回最终的解
    let len = nums.length;
    let dp = new Array(len).fill(1)
    for(let i = 1; i < len; i++){
        if(nums[i] > nums[i-1]){
            dp[i] = dp[i-1] + 1;
        }
    }
    let res = 1;
    for(let i = 0; i < len; i++){
        res = Math.max(res, dp[i])
    }
    return res;
}
```