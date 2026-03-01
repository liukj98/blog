---
title: 计数质数
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/count-primes/)

给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。

示例 1：
```
输入：n = 10
输出：4
解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
```

示例 2：
```
输入：n = 0
输出：0
```

示例 3：
```
输入：n = 1
输出：0
```
## 代码

```js
/**
 * 方法一 暴力破解
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  if (n == 1 || n == 0) return 0;
  let count = 0;
  for (let i = 2; i < n; i++) {
    let flag = true;
    for (let j = 2; j < i; j++) {
      if(i % j == 0){
        flag = false;
        break;
      }
    }
    if(flag){
      count++;
    }
  }
  return count;
};

/**
 * 方法二 埃拉托斯特尼筛法（Sieve of Eratosthenes，简称埃氏筛法）
 * 原理：从 1 到 n 遍历，假设当前遍历到m，则把所有小于n的、且是m的倍数的整数标为和数；遍历完成后，没有被标为和数的数字即为质数
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    if (n == 1 || n == 0) return 0;
    let primes = new Array(n+1).fill(true);
    let count = n - 2; // 初始化质数的个数，去掉数字1和数字n
    for (let i = 2; i < n; i++) {
        for (let j = i*2; j < n; j+=i) { // 遍历当前数的所有倍数
            if(primes[j]){
                primes[j] = false;
                count--;
            }
        }
    }
    return count;
};
```