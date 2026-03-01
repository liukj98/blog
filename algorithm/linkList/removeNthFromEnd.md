---
title: 删除链表倒数第N个节点
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

**示例 1**：

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/LeetCode/Snipaste_2022-03-24_10-25-21.1cnlbqxxszc0.webp)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2**：
```
输入：head = [1], n = 1
输出：[]
```
**示例 3**：

```
输入：head = [1,2], n = 1
输出：[1]
```

## 思路

1. 先找到链表的倒数第 n 个节点，这可以通过 [链表的倒数第K个节点](./getKthFromEnd.md) 可知
2. 借助虚拟头节点来辅助进行节点的删除操作，以将对头节点的删除操作与普通节点的删除操作进行代码逻辑的统一，这可以通过开篇对 [链表的介绍](./introduction.md) 可知

## 代码

```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // 定义伪头指针
    const dummyNode = new ListNode(0, head);
    // 定义快慢指针
    let slow = fast = dummyNode;
    // 让快指针先走 n+1 步
    while(n--){
        fast = fast.next;
    }
    fast = fast.next;

    // 再让快慢指针以相同速度走
    while(fast !== null){// 当快指针走到尾部（null）时慢指针指向的即为倒数第 n 个节点的前一个节点
        slow = slow.next
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummyNode.next;
};
```