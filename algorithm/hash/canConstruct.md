---
title: 赎金信
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/ransom-note/)

给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。

如果可以，返回 true ；否则返回 false 。

magazine 中的每个字符只能在 ransomNote 中使用一次。

示例 1：
```
输入：ransomNote = "a", magazine = "b"
输出：false
```

示例 2：
```
输入：ransomNote = "aa", magazine = "ab"
输出：false
```

示例 3：
```
输入：ransomNote = "aa", magazine = "aab"
输出：true
```
## 代码

```js
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    let map = new Map();
    for (let i = 0; i < magazine.length; i++) {
        if (map.has(magazine[i])) {
            map.set(magazine[i], map.get(magazine[i]) + 1)
        } else {
            map.set(magazine[i], 1)
        }
    }
    for (let j = 0; j < ransomNote.length; j++) {
        if (map.has(ransomNote[j])) {
            map.set(ransomNote[j], map.get(ransomNote[j])-1)
            if(map.get(ransomNote[j]) < 0) return false;
        }else{
            return false;
        }
    }
    return true;

    // 另一种方式：使用数组而不是用map，
		// 因为本题有一个特点：只有26个小写字母，所以可以设计数组的长度为26，这和第一题是一样的
};
```
