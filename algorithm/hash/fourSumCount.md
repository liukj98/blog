---
title: 四数相加 II
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/4sum-ii/)

给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：

0 <= i, j, k, l < n
nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

示例 1：
```
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
```

示例 2：
```
输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出：1
```

## 代码

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
    let len1 = nums1.length;
    let len2 = nums2.length;
    let len3 = nums3.length;
    let len4 = nums4.length;
    let map = new Map(); // 记录前两个数组和的次数。key 为 前两个数组各元素之和，value 为和的次数
    for (let i = 0; i < len1; i++) {
        for (let j = 0; j < len2; j++) {
            let sum = nums1[i] + nums2[j];
            if (map.has(sum)) {
                map.set(sum, map.get(sum) + 1)
            } else {
                map.set(sum, 1)
            }
        }
    }
    let count = 0;
    for (let i = 0; i < len3; i++) {
        for (let j = 0; j < len4; j++) {
            let sum = nums3[i] + nums4[j];
            if (map.has(0 - sum)){
                count += map.get(0-sum)
            }
        }
    }
    return count;
};
```
