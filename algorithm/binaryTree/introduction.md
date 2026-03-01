---
title: 二叉树介绍
date: 2022-04-08
---

## 前言

::: tip
关于二叉树的所有题目，希望都能至少使用 **递归法、迭代法** 这两种解决方案来求解
:::

1. **使用递归解决二叉树遍历相关题目的核心思路是：明确当前节点需要做什么？**
    - 如果当前节点要做的事情依赖于当前节点的左子树，不依赖于当前节点的右子树，则使用中序遍历
    - 如果当前节点要做的事情依赖于当前节点的左子树，又依赖于当前节点的右子树，则使用后序遍历
    - 如果当前节点要做的事情不依赖于当前节点的左子树，也不依赖于当前节点的右子树，则使用前序遍历

2. **二叉树节点的深度与高度**
    1. 二叉树节点的深度：指根节点到该节点最长简单路径边的条数（适合使用前序遍历）
    2. 二叉树节点的高度：指该节点到叶子节点最长简单路径边的条数（适合使用后序遍历）

3. **二叉树的深度：就是根节点的高度**

如下一棵二叉树，其中红色节点的深度为 2，高度为 1

![1](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/LeetCode/1.52hc62p0ejk0.webp)

## 二叉树的分类

1. **满二叉树**

2. **完全二叉树**
    1. 适合使用数组这种顺序结构来存储
    2. 堆（优先级队列）
        1. 大顶堆
        2. 小顶堆

3. **平衡二叉树**
    1. 任意一个节点的左右子树的高度相差不能大于 1

4. **二叉搜索树**

5. **平衡二叉搜索树**
    1. AVL 树（高度严格平衡）
    2. 红黑树（高度相对平衡）

![2](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/LeetCode/2.5epv6ayby5g0.webp)

## 二叉树的遍历

树的遍历方式总体分为两类：深度优先搜索（DFS）、广度优先搜索（BFS）

- **常见的 DFS** ： 先序遍历、中序遍历、后序遍历
    
    基于 DFS 的遍历往往利用 **递归** 或 **栈** 实现，其实递归的底层数据结构也是用 **栈** 来实现的
    
- **常见的 BFS** ： 层序遍历（即按层遍历），一般借助 **队列** 来实现

### DFS框架代码

```js
/**
 * 二叉树 DFS 解题框架
 * @param {*} root 
 */
function traversal(root) {
  // 递归出口一般是root为 叶子节点的左右子节点，也就是root节点为空节点
  if (root == null) { // 递归出口的逻辑处理
    // 需不需要有返回值，这得需要根据具体的题目需求
    // 如果不需要返回值，只是结束递归，以避免无限递归下去，则我们只需 `return;` 即可
    // 若是需要返回值，那我们就返回具体的内容，比如 `return 0;`

		return 0;
  }
  // 前序遍历代码

  const leftRes = traversal(root.left); // 若递归有返回值，可用变量接收
  // 中序遍历代码

  const rightRes = traversal(root.right); // 若递归有返回值，可用变量接收
  // 后序遍历代码

	// 若递归有返回值，则返回具体的内容，此时返回的是非空节点（root节点）的处理结果
	// 若不需要返回内容，则直接 `return;` 即可
  return leftRes + rightRes + root.val; 
}
```

### BFS框架代码

```js
/**
 * 二叉树的 BFS 框架
 */
function bfs(root) {
  // base case
  if (root === null) return ;
  let queue = [root];// 用于存储当前这一层的所有节点
  while (queue.length !== 0) {
    let size = queue.length;
    // 遍历当前层的所有节点，将当前层的所有节点的左右子树放入 queue 中
    for (let i = 0; i < size; i++) { 
      // 拿到当前层的所有节点，然后干什么的代码
      const node = queue[i];
      // 存储下一层节点的代码
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // 当前层所有节点遍历结束后的逻辑代码
   
  }
}
/**
 * 如果不强调层与层之间的关系的话
 * 二叉树的 BFS 框架，第二种形式
 */
function bfs(root) {
  // base case
  if (root === null) return;
  let queue = [root];
  while (queue.length !== 0) {
    // 取出 queue 中的第一个节点元素
    let firstNode = queue.shift();
    /**层次遍历的代码 */
    if(firstNode.left) queue.push(firstNode.left);
    if(firstNode.right) queue.push(firstNode.right);
  }
}
```

**如何理解二叉树的后序遍历？**

如果当前节点要做的事情需要通过左右子树的计算结果推导出来，就要用到后序遍历

可以看看该题：[114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/) 感受一下二叉树的后序遍历

参考链接：https://mp.weixin.qq.com/s/RST4Cujs0V0yiwRyu1fxCQ

## 二叉搜索树

二叉搜索树又称为二叉查找树、二叉排序树，英文为 `Binary Search Tree`，简写为 `BST`

1. **定义**

    - 对于 BST 的每一个节点 node，左子树节点的值都比 node 的值要小，右子树节点的值都比 node 的值大。

    - 对于 BST 的每一个节点 node，它的左子树和右子树都是 BST。


2. **性质**

    - **BST 的中序遍历结果是有序的**

由于二叉搜索树的中序遍历是有序的，所以可以将二叉树的中序遍历结果保存到一个数组中，于是该数组也是有序的。

基于数组的有序性，可以很快地求得二叉搜索树的最大值、最小值、众数等

但是由于使用了数组这个额外的空间，所以此算法的空间复杂度会较高

为了降低算法的空间复杂度，不使用额外的数组，可以通过双指针的技巧，具体方式：定义两个指针 cur 和 pre
  
  - cur 指向当前节点

  - pre 指向前一个节点

> 二叉搜索树并不算复杂，但它却构建起了数据结构领域的半壁江山。
> 
> 直接基于 BST 的数据结构有 **AVL 树、红黑树** 等等，拥有了自平衡性质，可以提供 $logN$ 级别的增删查改效率
> 
> 还有 **B+ 树、线段树** 等结构都是基于 BST 的思想来设计的。

### 搜索框架代码

```js
/**
 * 二叉搜索树（BST）搜索框架
 * @param {TreeNode} root 
 * @param {TreeNode} target 
 */
function BST(root, target) {
	// 递归出口
  if(root === null) return false;
  if (root.val == target) {
    // 找到目标，做点什么
  }
  if (root.val < target) {
    // 当前节点的值小于目标值，就从当前节点的右子树开始找
    BST(root.right, target);
  }
  if (root.val > target) {
    // 当前节点的值大于目标值，就从当前节点的左子树开始找
    BST(root.left, target);
  }
}
```
## 参考资料

- [labuladong的算法小抄](https://mp.weixin.qq.com/s/izZ5uiWzTagagJec6Y7RvQ)