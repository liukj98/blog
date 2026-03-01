---
title: 全排列
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/permutations/)

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：
```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

示例 2：
```
输入：nums = [0,1]
输出：[[0,1],[1,0]]
```

示例 3：
```
输入：nums = [1]
输出：[[1]]
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let res = [];
    let path = [];
    let len = nums.length;
    let used = new Array(len).fill(false);
    function backtrack(nums, used){
        // 递归出口
        if(path.length == len){
            res.push([...path]);
            return;
        }
        for(let i = 0; i < len; i++){
            if(used[i]) continue;
            // 做选择
            path.push(nums[i]);
            used[i] = true;
            // 递归
            backtrack(nums, used);
            // 撤销选择
            path.pop();
            used[i] = false;
        }
    }
    backtrack(nums, used);
    return res;
};
```