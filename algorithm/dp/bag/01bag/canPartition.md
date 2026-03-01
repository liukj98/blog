---
title: 分割等和子集
date: 2022-04-10
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

示例 1：
```
输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。
```

示例 2：
```
输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
```

## 代码

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    // 本题本质为 01 背包问题，核心在于如何将其转化为 01 背包问题
    // 等价于从数组中选择若干个元素，使得这些元素的和为数组元素之和的一半
    // 此时的数组集合就等价于物品集合，数组元素的价值与重量等价于物品的价值与重量，一样均为元素值本身，背包容量为数组元素之和的一半

    // 1. 确定 dp 数组以及下标的含义：dp[j] 表示背包容量为 j 时可装的最大价值为 dp[j]
    // 2. 确定状态转移方程：dp[j] = max(dp[j], dp[j-nums[i]] + nums[i])
    // 3. 确定 dp 数组的初始状态：因为是非负数，所以初始化为 0
    // 4. 确定遍历顺序：倒序
    let len = nums.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
        sum += nums[i];
    }
    if (sum % 2 == 1) return false; // 总和不是 2 的倍数，不可能分割成两个相等的子集
    let target = sum / 2;
    let dp = new Array(target + 1).fill(0); // dp 数组的初始化
    for (let i = 0; i < len; i++) {
        for (let j = target; j >= nums[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i])
        }
    }
    // 返回最终的解
    if (target == dp[target]) return true;
    return false;
};
```

## 总结

### 一、关于 01 背包问题的最佳实践

对于二维dp数组：先遍历物品再遍历背包容量，顺序遍历（由前往后）

对于一维dp数组：先遍历物品再遍历背包容量，倒叙遍历（由后往前）

### 二、关于 01 背包问题的思考

**对于二维dp数组**：
1. 遍历物品与遍历背包容量的顺序是否可互换？
答：可以
2. 必须数顺序遍历吗？
答：是的

**对于一维dp数组**：
1. 遍历物品与遍历背包容量的顺序是否可互换？
答：不可以，如果是先遍历背包容量再遍历物品的话，背包最多只能放入一种物品
2. 必须是倒序遍历吗？
答：是的，因为只有倒序才能保证每件物品最多只能放入背包一次

### 三、关于 01 背包核心代码

```js
// 二维dp
// dp[i][j] 表示在下标为 0~i 的物品中选择若干个物品装到背包容量为 j 的背包中，使得背包的价值最大
for (let i = 1; i < weight.size(); i++) { // 遍历物品
  for (let j = 0; j <= bagweight; j++) { // 遍历背包容量
    // 当前物品的重量大于背包的重量，肯定不会放入背包中，直接跳过
    if (j < weight[i]) dp[i][j] = dp[i - 1][j];
    // 当前物品的重量小于背包的重量，则有两种选择
    // 1. 将当前物品放入背包
    // 2. 当前物品不放入背包
    // 从这两种选择中取较大的那个
    else dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
  }
}

// 一维dp
for (let i = 0; i < weight.size(); i++) { // 遍历物品
  for (let j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量，由后往前遍历
    dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
  }
}
```