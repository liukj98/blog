---
title: 链表的倒数第K个节点
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 `6` 个节点，从头节点开始，它们的值依次是 `1、2、3、4、5、6`。这个链表的倒数第 `3` 个节点是值为 `4` 的节点。

**示例：**

```
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

## 思路

**使用快慢指针：**

1. 先初始化快慢指针 `fast`、`slow` 指向头节点
2. 先让快指针先走 `K` 步
3. 再令快慢指针以相同步伐走
4. 当快指针走到链表尾部时，慢指针指向倒数第 `K` 个节点

## 代码

```js
function getKthFromEnd(head, k) {
  // 初始化快慢指针
  let slow = fast = head;
  // 先让快指针走 k 步
  while(k-- > 0){
    fast = fast.next;
  }
  // 快指针走完 k 步后，令快慢指针以相同步伐走
  // 当快指针走到链表尾部时，慢指针此时指向倒数第K个节点
  while(fast !== null){
    slow = slow.next;
    fast = fast.next;
  }
  // 此时 slow 指向的节点即为倒数第K个节点
  return slow;
};
```