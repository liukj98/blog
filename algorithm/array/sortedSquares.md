---
title: 有序数组的平方
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：
```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

示例 2：
```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    // 定义一个和 nums 长度相同的新数组
    let len = nums.length;
    let k = len - 1;
    let arr = new Array(len).fill(0);
    let i = 0, j = len - 1;
    while (i <= j) {
        let lVal = nums[i] * nums[i];
        let rVal = nums[j] * nums[j];
        if (rVal > lVal) {
            arr[k--] = rVal;
            j--;
        } else {
            arr[k--] = lVal;
            i++;
        }
    }
    return arr;
};
```
