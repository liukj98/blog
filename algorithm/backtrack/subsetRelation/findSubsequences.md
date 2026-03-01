---
title: 递增子序列
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/increasing-subsequences/)

给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。

数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。

示例 1：
```
输入：nums = [4,6,7,7]
输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
```

示例 2：
```
输入：nums = [4,4,3,2,1]
输出：[[4,4]]
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  let res = [];
  let path = [];
  let len = nums.length;
  function backtrack(nums, startIndex) {
    if (startIndex >= len) return;
    let set = new Set();
    for (let i = startIndex; i < len; i++) {
      // 剪枝优化
      if (i > 0 &&  set.has(nums[i])) continue;
      // 做选择
      if (path.length >= 1) {
        if (nums[i] < path[path.length - 1]) continue;
        path.push(nums[i]);
        res.push([...path]);
        set.add(nums[i])
      } else {// 选择第一层元素
        path.push(nums[i])
        set.add(nums[i])
      }
      // 递归
      backtrack(nums, i + 1)
      // 撤销选择
      path.pop();
    }
  }
  backtrack(nums, 0);
  return res;
};
```
