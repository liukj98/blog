---
title: 分割回文串
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/palindrome-partitioning/)

给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。

示例 1：
```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```

示例 2：
```
输入：s = "a"
输出：[["a"]]
```
## 代码

```js
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    let res = [];
    let path = [];
    function backtrack(s){
        // 递归出口
        if(!s){
            res.push([...path])
            return;
        }
        for(let i = 1; i <= s.length; i++){
            const str = s.slice(0, i);
            if(!isPalindromic(str)) continue;
            // 做选择
            path.push(str);
            // 递归
            backtrack(s.slice(i));
            // 撤销选择
            path.pop();
        }
    }
    backtrack(s);
    return res;
};
// 判断回文串
function isPalindromic(s){
    if(!s) return false;
    let l = 0;
    let r = s.length - 1;
    while(l <= r){
        if(s[l] !== s[r])return false;
        l++;
        r--;
    }
    return true;
}
```