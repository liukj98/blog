---
title: 最长重复子数组
date: 2022-04-10
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)

给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。

示例 1：
```
输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
输出：3
解释：长度最长的公共子数组是 [3,2,1] 。
```

示例 2：
```
输入：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
输出：5
```

## 代码

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
    // 1. 明确 dp 数组以及下标的含义
    // dp[i][j] 表示数组nums1, nums2分别在索引范围0～i-1、0～j-1，并且以nums1[i-1]，nums2[j-1]结尾的公共的、长度最长的子数组(nums1[i-1]==nums2[j-1])的长度(若为0，说明nums1[i-1]!=nums2[j-1])
    // 2. 确定状态转移方程（如何根据之前的状态推导出dp[i][j]呢？）
    // nums1[i-1]==nums2[j-1] ==> dp[i][j] = dp[i-1][j-1] + 1;
    // nums1[i-1]!=nums2[j-1] ==> dp[i][j] = 0;
    // 3. 确定 dp 数组的初始化
    // 4. 确定遍历顺序
    let len1 = nums1.length
    let len2 = nums2.length
    let res = 0;
    let dp = new Array(len1+1);
    for(let i = 0; i < len1+1; i++){ // dp数组的初始化
        dp[i] = new Array(len2+1).fill(0)
    }
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if(nums1[i-1] == nums2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1;
            }
            res = Math.max(res, dp[i][j])
        }
    }
    // 返回最终的解，并不是dp数组的最后一项
    return res;
};
```