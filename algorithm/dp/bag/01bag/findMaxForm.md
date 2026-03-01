---
title: 一和零
date: 2022-04-20
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/ones-and-zeroes/)

给你一个二进制字符串数组 strs 和两个整数 m 和 n 。

请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。

如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。

示例 1：
```
输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
输出：4
解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
```

示例 2：
```
输入：strs = ["10", "0", "1"], m = 1, n = 1
输出：2
解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
```

## 代码

```js
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    // 问题等价于：从该字符串数组中选择若干个字符串，在满足这些字符串中0的个数总和不超过m，1的个数总和不超过n的条件下（m、n为背包容量）选择的字符串的个数最多
    // 1. dp[i][j] 表示为背包容量为i个0，j个1的背包能装的字符串的个数最多为 dp[i][j]
    // 2. dp[i][j] = max(dp[i][j], dp[i-zeroNum][j-oneNum] + 1)

    let dp = new Array(m + 1)
    for (let i = 0; i < m+1; i++) {
        dp[i] = new Array(n+1).fill(0)
    }
    let len = strs.length;
    for (let i = 0; i < len; i++) {
        let zeroNum = getZeroNum(strs[i])
        let oneNum = getOneNum(strs[i])
        for (let j = m; j >= zeroNum; j--) {
            for (let k = n; k >= oneNum; k--) {
                dp[j][k] = Math.max(dp[j][k], dp[j - zeroNum][k - oneNum] + 1)
            }
        }
    }
    return dp[m][n]
};

function getZeroNum(str) {
    let len = str.length;
    let count = 0;
    for (let i = 0; i < len; i++) {
        if (str[i] == "0") count++;
    }
    return count;
}
function getOneNum(str) {
    let len = str.length;
    let count = 0;
    for (let i = 0; i < len; i++) {
        if (str[i] == "1") count++;
    }
    return count;
}
```