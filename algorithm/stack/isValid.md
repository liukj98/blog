---
title: 有效的括号
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/valid-parentheses/)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

示例 1：
```
输入：s = "()"
输出：true
```

示例 2：
```
输入：s = "()[]{}"
输出：true
```

示例 3：
```
输入：s = "(]"
输出：false
```

示例 4：
```
输入：s = "([)]"
输出：false
```
## 代码

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const stack = new MyStack();
    const len = s.length;
    for (let i = 0; i < len; i++) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{') { // 左括号，入栈
            stack.push(s[i]);
        } else if (s[i] == ')' || s[i] == ']' || s[i] == '}') { // 右括号，进行匹配
            const topEle = stack.pop();
            if (!isPair(topEle, s[i])) return false
        }
    }
    return stack.isEmpty();
};

function isPair(l, r) {
    if (l == '(' && r == ')') return true
    if (l == '[' && r == ']') return true
    if (l == '{' && r == '}') return true
    return false;
}
```