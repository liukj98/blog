---
title: 子集 II
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/subsets-ii/)

给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

示例 1：
```
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
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
var subsetsWithDup = function (nums) {
    let res = [];
    let path = [];
    nums.sort((a, b) => (a - b))
    let used = new Array(len).fill(false);
    function backtrack(nums, startIndex, used) {
        // 递归出口
        if (startIndex >= nums.length) return;
        for (let i = startIndex; i < nums.length; i++) {
            // 剪枝优化
            if(i > 0 && (nums[i] == nums[i-1]) && (used[i-1] == false)) continue;
            // 做选择
            path.push(nums[i])
            used[i] = true;
            res.push([...path])
            // 递归
            backtrack(nums, i + 1, used)
            // 撤销选择
            path.pop();
            used[i] = false;
        }
    }
    backtrack(nums, 0, used);
    res.push([]);
    return res;
};
```