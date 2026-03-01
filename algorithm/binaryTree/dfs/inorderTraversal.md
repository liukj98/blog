---
title: 二叉树的中序遍历
date: 2022-04-08
---

## 代码

```js
/**
 * 递归写法
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let result = [];
    function _inorderTraversal(root, result){
        // 确定递归出口
        if(!root) return;
        _inorderTraversal(root.left, result);
        result.push(root.val);
        _inorderTraversal(root.right, result);
    }
    _inorderTraversal(root, result);
    return result;
};
// 中序遍历，利用 `栈` 实现
var inorderTraversal = function(root) {
    if(root == null) return [];
    let res = []; // 最终结果
    let cur = root;
    let stack = []; // 利用数组模拟栈
    while(cur || stack.length > 0){
        if(cur !== null){ // 处理左子树
            stack.push(cur);
            cur = cur.left;
        }else{ // 处理中间节点，再处理右子树
            cur = stack.pop();
            res.push(cur.val);
            cur = cur.right;
        }
    }
    return res;
};
```