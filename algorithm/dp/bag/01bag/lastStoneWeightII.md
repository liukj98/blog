---
title: 最后一块石头的重量 II
date: 2022-04-10
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/last-stone-weight-ii/)

有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。

每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：

如果 x == y，那么两块石头都会被完全粉碎；
如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。

示例 1：
```
输入：stones = [2,7,4,1,8,1]
输出：1
解释：
组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
```

示例 2：
```
输入：stones = [31,26,33,21,40]
输出：5
```

## 代码

```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
    // 如何将该问题转化为 01 背包问题？
    // 从这堆石头中任意选一些石头，使得选出的这些石头的总重量 尽量接近 全部石头总重量的一半
    // 相当于将这些石头分成两个堆：A堆和B堆，使得A堆石头的总重量和B堆石头的总重量尽量接近
    // 1. 确定 dp 数组以及下标的含义：dp[j] 表示A堆容量为 j 的堆所能装的石头的总量最多为 dp[j]
    // 2. 确定状态转移方程：dp[j] = max(dp[j], dp[j-stones[i]]+stones[i])
    // 3. 确定 dp 数组的初始状态：
    // 4. 确定 遍历顺序：
    let len = stones.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
        sum += stones[i];
    }
    let target = Math.floor(sum / 2);
    let dp = new Array(target + 1).fill(0)
    for (let i = 0; i < len; i++) {// 石头遍历顺序
        for (let j = target; j >= stones[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i])
        }
    }
    // 此时 dp[target] 为 A 堆的石头总重量，sum - dp[target] 为 B 堆石头的总重量
    // sum - dp[target] - dp[target] 就是 B 堆与 A 堆石头总重量差值，即最终的结果
    return sum - dp[target] - dp[target]
};
```