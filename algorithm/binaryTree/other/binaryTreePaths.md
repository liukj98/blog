---
title: 二叉树的所有路径
date: 2022-04-08
---

## 代码

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    let res = [];
    let path = [];

    function bactrack(root) {
        // 递归出口，当 root 为叶子节点时
        if (root.left == null && root.right == null) {
            let temp = "";
            for (let i = 0; i < path.length; i++) {
                temp = temp + path[i] + "->"
            }
            temp = temp + root.val;
            res.push(temp);
            return;
        }
        // 做选择
        path.push(root.val);
        // 递归
        if (root.left) {
            bactrack(root.left);
        }
        if (root.right) {
            bactrack(root.right);
        }
        // 撤销选择
        path.pop(root.val);
    }
    bactrack(root);
    return res;
};
```