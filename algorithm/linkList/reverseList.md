---
title: 反转链表
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

## 思路

1. 迭代实现

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/算法学习图片资源/Snipaste_2021-06-17_15-15-12.44t1qzl3mfc0.png)

2. 递归实现

## 代码

```js
// 递归实现
function reverseList(head){
  // base case
  if(head === null || head.next === null) return head;
  
  let p = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return p;
}

// 迭代实现
function reverseList(head){
  let prev = null;
  let cur = head;
  while(cur !== null){
    let nextTemp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextTemp;
  }
  return prev;
}
```