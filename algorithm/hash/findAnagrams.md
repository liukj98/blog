---
title: 找到字符串中所有字母异位词
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

示例 1:
```
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
```

示例 2:
```
输入: s = "abab", p = "ab"
输出: [0,1,2]
解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
```

## 代码

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    let len = s.length;
    let res = [];
    let pLen = p.length;
    for (let i = 0; i < len - pLen + 1; i++) {
        let newS = s.slice(i, i + pLen)
        if(isAnagram(newS, p)){
            res.push(i)
        }
    }
    return res;
};

var isAnagram = function (s, t) {
    let sLen = s.length;
    let tLen = t.length;
    let arr = new Array(26).fill(0);
    for (let i = 0; i < sLen; i++) {
        let index = s[i].charCodeAt() - 97
        arr[index] += 1;
    }
    for (let i = 0; i < tLen; i++) {
        let index = t[i].charCodeAt() - 97
        if (arr[index] == 0) return false;
        arr[index] -= 1;
    }
    for (let i = 0; i < 26; i++) {
        if (arr[i] > 0) return false;
    }
    return true;
}
```