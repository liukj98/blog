---
title: 二叉树的前序遍历
date: 2022-04-08
---

## 代码

```js
/**
 * 递归写法
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let result = [];
    function _preorderTraversal(root, result){
        // 确定递归出口
        if(!root) return;
        result.push(root.val);
        _preorderTraversal(root.left, result);
        _preorderTraversal(root.right, result);
    }
    _preorderTraversal(root, result);
    return result;
};
// 迭代写法，利用 `栈` 实现
var preorderTraversal = function(root){
    let res = [];
    if(!root) return res;
    // 利用数组模拟栈
    const stack = [root]
    while(stack.length > 0){
        // 取出栈顶元素
        const node = stack.pop();
        res.push(node.val)
        // 先加入右子节点，再加入左子节点，这样从栈中取出元素的话就是先取左子节点再取右子节点
        if(node.right) stack.push(node.right); 
        if(node.left) stack.push(node.left);
    }
    return res;
}
```