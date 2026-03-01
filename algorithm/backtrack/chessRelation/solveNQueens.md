---
title: N 皇后
date: 2022-04-08
---

## 题目 [LeetCode]()

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例 1：
![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/LeetCode/Snipaste_2022-04-11_15-30-47.zkqjuxuft34.webp)
```
输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：如上图所示，4 皇后问题存在两个不同的解法。
```

示例 2：
```
输入：n = 1
输出：[["Q"]]
```
## 代码

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    let res = [];
    let chessboard = [];
    for (i = 0; i < n; i++) {
        chessboard.push(new Array(n).fill("."))
    }

    function backtrack(n, row, chessboard) {
        // 递归出口
        if (row >= n) {
            let arr = [];
            for (let i = 0; i < n; i++) {
                let temp = "";
                for (let j = 0; j < n; j++) {
                    temp += chessboard[i][j]
                }
                arr.push(temp)
            }
            res.push(arr);
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isValid(row, col, chessboard)) { // 当前位置（行号与列号）可以放置皇后
                //做选择
                chessboard[row][col] = "Q";
                //递归
                backtrack(n, row + 1, chessboard)
                //撤销选择
                chessboard[row][col] = ".";
            }
        }
    }
    // 判断当前位置是否可以放置皇后
    function isValid(row, col, chessboard) {
        let n = chessboard.length;
        // 当前列方向
        for (let i = 0; i < row; i++) {
            if (chessboard[i][col] == "Q") return false;
        }
        // 135 度角
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (chessboard[i][j] == "Q") return false;
        }
        // 45 度角
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (chessboard[i][j] == "Q") return false;
        }
        return true;
    }

    backtrack(n, 0, chessboard);
    return res;
};
```