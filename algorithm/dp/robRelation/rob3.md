---
title: 打家劫舍 III
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/house-robber-iii/)

小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。

除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。

给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。

示例 1:
```
输入: root = [3,2,3,null,3,null,1]
输出: 7 
解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7
```

示例 2:
```
输入: root = [3,4,5,1,3,null,1]
输出: 9
解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9
```
## 代码

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
    // 树形 dp 入门题
    // 分析：对于当前节点只有抢或者不抢两种选择
    // 若是抢，则左右孩子不能抢；若是不抢，则左右孩子可以抢，也可以不抢，即对左右孩子进行下一层递归
    // 状态设计：定义一个数组用于保存当前节点抢或不抢所能盗取的最高金额
    // 数组长度为2，第一位保存抢了当前节点偷能够盗取的最高金额，第二位保存没抢当前节点偷能够盗取的最高金 res = {0, 0}
    function _rob(root) {
        if (root == null) return [0, 0];
        let left = _rob(root.left);
        let right = _rob(root.right);
        // 抢当前节点，左右孩子不能抢
        let val1 = root.val + left[0] + right[0];
        // 没抢当前节点，左右孩子可抢可不抢，取当中较大的
        let val2 = max(left[0], left[1]) + max(right[0], right[1]);
        return [val2, val1]
    }
    let res = _rob(root);
    return max(res[0], res[1])
};
function max(a, b) {
    return a > b ? a : b;
}
```