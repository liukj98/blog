---
title: 字母异位词分组
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/group-anagrams/)

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。

示例 1:
```
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

示例 2:
```
输入: strs = [""]
输出: [[""]]
```

示例 3:
```
输入: strs = ["a"]
输出: [["a"]]
```
## 代码

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    let map = new Map();
    let res = [];
    let len = strs.length;
    for (let i = 0; i < len; i++) {
        map.set(strs[i], false)
    }
    for (let i = 0; i < len; i++) {
        if(map.get(strs[i]) == true) continue;
        let temp = []
        temp.push(strs[i]);
        for (let j = i+1; j < len; j++) {
            if(isAnagram(strs[i], strs[j])){
                temp.push(strs[j])
                map.set(strs[j], true)
            }
        }
        res.push(temp);
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