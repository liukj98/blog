---
title: 子集
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/subsets/)

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

示例 1：
```
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

示例 2：
```
输入：nums = [0]
输出：[[],[0]]
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    let res = [];
    let path = [];
    function backtrack(nums, startIndex) {
        // 递归出口
        if (startIndex == nums.length) return;
        for (let i = startIndex; i < nums.length; i++) {
            // 做选择
            path.push(nums[i])
            res.push([...path])
            // 递归
            backtrack(nums, i + 1)
            //撤销选择
            path.pop();
        }
    }
    backtrack(nums, 0);
    res.push([])
    return res;
};
```