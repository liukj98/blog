---
title: 有效的字母异位词
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/valid-anagram/)

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

示例 1:
```
输入: s = "anagram", t = "nagaram"
输出: true
```

示例 2:
```
输入: s = "rat", t = "car"
输出: false
```

## 代码

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    let sMap = new Map();
    let tMap = new Map();
    let sLen = s.length;
    let tLen = t.length;
    for (let i = 0; i < sLen; i++) {
        if (sMap.get(s[i])) {
            sMap.set(s[i], sMap.get(s[i]) + 1)
        } else {
            sMap.set(s[i], 1)
        }
    }
    for (let i = 0; i < tLen; i++) {
        if (sMap.has(t[i])) {
            sMap.set(t[i], sMap.get(t[i]) - 1)
        }else{
            return false;
        }
    }
    for(v of sMap.values()){
        if(v < 0 || v > 0){
            return false;
        }
    }
    return true
};
// 方法二
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
        if(arr[index] == 0) return false;
        arr[index] -= 1;
    }
    for(let i = 0; i < 26; i++){
        if(arr[i] > 0) return false;
    }
    return true;
}

```
