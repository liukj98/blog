---
title: 三数之和
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/3sum/)

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例 1：
```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

示例 2：
```
输入：nums = []
输出：[]
```

示例 3：
```
输入：nums = [0]
输出：[]
```
## 代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let len = nums.length;
    let res = [];
    // 先进行排序
    nums.sort((a, b) => (a - b))
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) return res; // 若第一个数大于0，后面的数肯定都大于0，无解
        if (i > 0 && nums[i] == nums[i - 1]) continue; // 去掉重复的情况
        let left = i + 1; // 左指针
        let right = len - 1; // 右指针
        while (left < right) {
            let n = nums[i] + nums[left] + nums[right]; // 三数之和
            if (n > 0) {// 三数之和大于0，右指针左移
                right--;
                while (left < right && nums[right] == nums[right + 1]) right--; // 去掉重复的情况
            } else if (n < 0) {// 三数之和小于0，左指针右移
                left++;
                while (left < right && nums[left] == nums[left - 1]) left++; // 去掉重复的情况
            } else { // n == 0
                res.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
                while (left < right && nums[right] == nums[right + 1]) right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
            }
        }
    }
    return res;
};
```
