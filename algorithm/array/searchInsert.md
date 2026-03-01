---
title: 搜索插入位置
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/search-insert-position/)

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 $O(log n)$ 的算法。


示例 1:
```
输入: nums = [1,3,5,6], target = 5
输出: 2
```

示例 2:
```
输入: nums = [1,3,5,6], target = 2
输出: 1
```

示例 3:
```
输入: nums = [1,3,5,6], target = 7
输出: 4
```

示例 4:
```
输入: nums = [1,3,5,6], target = 0
输出: 0
```

## 代码

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] == target) {
      return mid;
    } else if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  //
  return right + 1;
};
```