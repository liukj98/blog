---
title: 长度最小的子数组
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。


示例 1：
```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

示例 2：
```
输入：target = 4, nums = [1,4,4]
输出：1
```

示例 3：
```
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

## 代码

```js
function min(a, b) {
    return a < b ? a : b;
}
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let len = nums.length;
    let i = 0; // 滑动窗口的起始位置
    let sum = 0; // 窗口的大小
    let res = Infinity; // 记录窗口的最小长度
    let subLen = 0; // 窗口的长度
    for (let j = 0; j < len; j++) {
        sum += nums[j]
        while (sum >= target) {
            subLen = j - i + 1; // 记录窗口的长度
            res = subLen < res ? subLen : res;// 更新窗口的最小长度
            // 收缩窗口
            sum -= nums[i++]
        }
    }
    return res == Infinity ? 0 : res;
};
```