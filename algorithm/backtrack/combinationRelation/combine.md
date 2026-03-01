---
title: 组合
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/combinations/)

给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

示例 1：
```
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

示例 2：
```
输入：n = 1, k = 1
输出：[[1]]
```
## 代码

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    let res = [];
    let path = [];
    function backtrack(n, k, startIndex) {
        // 递归终止条件
        if(path.length == k){
            res.push([...path]);
            return;
        }
        for (let i = startIndex; i <= n; i++) { // 从集合中做出选择
            // 做选择
            path.push(i);
            backtrack(n, k, i + 1)
            // 撤销选择
            path.pop();
        }
    }
    backtrack(n, k, 1)
    return res;
};
```
