---
title: 电话号码的字母组合
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。


示例 1：
```
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

示例 2：
```
输入：digits = ""
输出：[]
```

示例 3：
```
输入：digits = "2"
输出：["a","b","c"]
```
## 代码

```js
const digitsMap = new Map();
digitsMap.set("2", ['a', 'b', 'c'])
digitsMap.set("3", ['d', 'e', 'f'])
digitsMap.set("4", ['g', 'h', 'i'])
digitsMap.set("5", ['j', 'k', 'l'])
digitsMap.set("6", ['m', 'n', 'o'])
digitsMap.set("7", ['p', 'q', 'r', 's'])
digitsMap.set("8", ['t', 'u', 'v'])
digitsMap.set("9", ['w', 'x', 'y', 'z'])
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    let res = [];
    let path = [];
    function backtrack(digits, index) {
        // 递归出口
        if (index == digits.length) {
            let temp = "";
            for (let i = 0; i < path.length; i++) {
                temp += path[i];
            }
            if (temp) {
                res.push(temp);
            }
            return;
        }
        const digit = digits[index];
        const letters = digitsMap.get(digit);
        for (let i = 0; i < letters.length; i++) {
            // 做选择
            path.push(letters[i])
            backtrack(digits, index + 1);
            // 撤销选择
            path.pop(letters[i])
        }
    }
    backtrack(digits, 0)
    return res;
};
```