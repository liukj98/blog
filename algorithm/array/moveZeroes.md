---
title: 移动零
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/move-zeroes/)

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

 

示例 1:
```
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

示例 2:
```
输入: nums = [0]
输出: [0]
```

## 代码

```js
function swap(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    // 快慢指针
    // 慢指针指向已经处理好的序列的下一个位置，快指针指向待处理的元素
    let len = nums.length;
    let slowIndex = fastIndex = 0;
    for (let i = fastIndex; i < len; i++) {
        if (nums[i]) {// 待处理的元素非0，进行交换
            swap(nums, i, slowIndex);
            // 交换完后慢指针往后移动一位
            slowIndex++;
        }
    }
};
```