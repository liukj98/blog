---
title: 二叉树的后序遍历
date: 2022-04-08
---

## 代码

```js
/**
 * 递归写法
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    let result = [];
    function _postorderTraversal(root, result){
        // 确定递归出口
        if(!root) return;
        _postorderTraversal(root.left, result);
        _postorderTraversal(root.right, result);
        result.push(root.val);
    }
    _postorderTraversal(root, result);
    return result;
};

// 后序遍历（本质和前序遍历一样），利用 `栈` 实现
var postorderTraversal = function (root) {
    let res = [];
    if (!root) return res;
    let stack = [root];
    while (stack.length) {
        let node = stack.pop(); // 从栈中取出元素
        res.push(node.val);
        if (node.left) { // 往栈中放入元素
            stack.push(node.left)
        }
        if (node.right) { // 往栈中放入元素
            stack.push(node.right)
        }
    }
    return res.reverse()
};
```
