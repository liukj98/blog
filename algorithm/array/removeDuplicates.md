---
title: 删除有序数组中的重复项
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。

由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果。

将最终结果插入 nums 的前 k 个位置后返回 k 。

不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

判题标准:

系统会用下面的代码来测试你的题解:

```
int[] nums = [...]; // 输入数组
int[] expectedNums = [...]; // 长度正确的期望答案

int k = removeDuplicates(nums); // 调用

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
```
如果所有断言都通过，那么您的题解将被 通过。

## 代码

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (nums.length == 1) return;
    let len = nums.length;
    // 定义两个快慢指针
    // 慢指针指向已经处理好的序列的下一个位置
    // 快指针指向待处理的元素
    let slowIndex = fastIndex = 1;
    for (let i = fastIndex; i < len; i++) {
        if (nums[i] != nums[i - 1]) {
            // 待处理的元素与前一个元素不等，则将该元素赋值给慢指针指向的元素，同时将慢指针往后移动一位
            nums[slowIndex] = nums[i];
            slowIndex++;
        }
    }
    return slowIndex;
};
```