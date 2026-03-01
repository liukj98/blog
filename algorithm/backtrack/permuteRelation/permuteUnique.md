---
title: 全排列 II
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/permutations-ii/)

给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

示例 1：
```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

示例 2：
```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    let res = [];
    let path = [];
    let len = nums.length;
    let used = new Array(len).fill(false);
    nums.sort((a, b) => (a - b))
    function backtrack(nums, used) {
        // 递归出口
        if (path.length == len) {
            res.push([...path])
            return;
        };
        for (let i = 0; i < len; i++) {
            // 剪枝优化
            if(i > 0 && nums[i] == nums[i-1] && used[i-1] == false) continue;
            if (used[i]) continue;
            // 做选择
            path.push(nums[i]);
            used[i] = true
            // 递归
            backtrack(nums, used)
            // 撤销选择
            path.pop();
            used[i] = false;
        }
    }
    backtrack(nums, used);
    return res;
};
```