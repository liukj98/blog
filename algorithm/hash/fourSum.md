---
title: 四数之和
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/4sum/)

给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

示例 1：
```
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

示例 2：
```
输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]
```
## 代码

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    let len = nums.length;
    let res = [];
    nums.sort((a, b) => (a - b))
    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue; // 去掉重复项
        for (let j = i + 1; j < len - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue; // 去掉重复项
            let left = j + 1;
            let right = len - 1;
            while (left < right) {
                let n = nums[i] + nums[j] + nums[left] + nums[right]
                if (n > target) {
                    right--;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (n < target) {
                    left++;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                } else {
                    res.push([nums[i], nums[j], nums[left], nums[right]])
                    left++;
                    right--;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                }
            }
        }
    }
    return res;
};
```
