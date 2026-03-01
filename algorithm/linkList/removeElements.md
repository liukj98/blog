---
title: 移除链表元素
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/remove-linked-list-elements/)

给你一个链表的头节点 `head` 和一个整数 `val` ，请你删除链表中所有满足 `Node.val == val` 的节点，并返回 **新的头节点** 。

**示例 ：**

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/算法学习图片资源/Snipaste_2021-06-13_01-02-51.689o4xn8i9w0.png)

```
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

## 思路

**「提示」**

本质还是利用虚拟头节点进行链表的删除操作，若对为什么采用虚拟头节点还有疑惑的话，可以参考开篇 [链表介绍](./introduction.md)

**「分析」**

一般而言，删除一个节点都需要用到两个指针prev、cur，其中prev指向要删除的节点的前一个节点，cur指向删除的那个节点

1. 若移除的节点既不是尾节点也不是头节点，很简单，遍历找到该节点然后删除，通过 prev.next = cur.next
2. 若移除的节点是尾节点或头节点
   1. 若是尾节点，其实操作和上面是一样的，通过 prev.next = cur.next
   2. 若是头节点，其操作就不一样啦，此时就可以通过哨兵节点去解决它，哨兵节点广泛应用于树和链表中，如伪头、伪尾、标记等，它们是纯功能的，通常不保存任何数据，其主要目的是使链表标准化，如使链表永不为空、永不无头、简化插入和删除。

**「算法」**

- 初始化哨兵节点为 ListNode(0) 且设置 sentinel.next = head。
- 初始化两个指针 curr 和 prev 指向当前节点和前继节点。
- 当 curr != nullptr：
  - 比较当前节点和要删除的节点：
    - 若当前节点就是要删除的节点：则 prev.next = curr.next。
    - 否则设 prev = curr。
  - 遍历下一个元素：curr = curr.next。
- 返回 sentinel.next。

## 代码

```js
// 哨兵节点
function removeElements(head, val) {
  // 创建哨兵节点
  const sentinel = new Node("-1");
  sentinel.next = head;
  // 初始化双指针
  let prev = sentinel,
    cur = head;
  while(cur !== null){ // 遍历所有节点
    if(cur.value === val){ // 判断当前节点的值是否为要删除的节点
      prev.next = cur.next;
    }else{// 当前节点的值不是要删除的节点，先更新当前节点的前一个节点
      prev = cur;
    }
    // 更新当前节点
    cur = cur.next;
  }
  return sentinel.next;
};
```