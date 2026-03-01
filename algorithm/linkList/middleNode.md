---
title: 链表的中间节点
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

给定一个头结点为 `head` 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

**示例 1：**

```
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```

**示例 2：**

```
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

## 思路

**使用快慢指针：**

1. 先初始化快慢指针 `fast`、`slow指向头节点
2. 每次令**快指针走两步**，**慢指针走一步**
3. 当快指针走到链表尾部时，慢指针指向的即为链表的中间节点

## 代码

```js
function middleNode(head) {
  if (head == null || head.next == null) return head;
  // 初始化快慢指针
  let slow = fast = head;
  while (fast !== null && fast.next !== null) {
    // 慢指针走一步
    slow = slow.next;
    // 快指针走两步
    fast = fast.next.next;
  }
  // 此时慢指针指向中间节点
  return slow;
};
```