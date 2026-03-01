---
title: 相交链表
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

给你两个单链表的头节点 `headA` 和 `headB` ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 `null`。

**示例：**

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/算法学习图片资源/Snipaste_2021-06-13_00-55-23.1y3xz66rmy74.png)

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

## 思路

**使用双指针：**

1. 创建两个指针 pA 和 pB，分别初始化为链表 A 和 B 的头结点。然后让它们向后逐结点遍历。
2. 当 pA 到达链表的尾部时，将它重定位到链表 B 的头结点 (你没看错，就是链表 B); 类似的，当 pB 到达链表的尾部时，将它重定位到链表 A 的头结点。
3. 若在某一时刻 pA 和 pB 相遇，则 pA、pB 为相交结点。
4. 想弄清楚为什么这样可行, 可以考虑以下两个链表: A={1,3,5,7,9,11} 和 B={2,4,9,11}，相交于结点 9。 由于 B.length (=4) < A.length (=6)，pB 比 pA 少经过 2 个结点，会先到达尾部。将 pB 重定向到 A 的头结点，pA 重定向到 B 的头结点后，pB 要比 pA 多走 2 个结点。因此，它们会同时到达交点。
5. 如果两个链表不存在相交，根据上述流程最终 pA和pB同时指向null

我画了一张图辅助理解

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/LeetCode/Snipaste_2022-03-24_11-02-28.44egbjqz39q.webp)

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/LeetCode/Snipaste_2022-03-24_11-02-57.4324ox7utw00.webp)

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/LeetCode/Snipaste_2022-03-24_11-03-20.25ootdsxka5c.webp)

## 代码

```js
function getIntersectionNode (headA, headB) {
  if (headA === null || headB === null) return;
  // 初始化双指针
  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    // 每次都令 pA、pB指针向前走一步
    pA = pA.next;
    pB = pB.next;
    if (pA === null && pB === null) {// 说明两个节点不相交
      return null;
    }
    // 当 pA 指针指向一个链表尾部时，令pA指向另一个链表的头部
    if (pA == null) pA = headB;
    // 当 pB 指针指向一个链表尾部时，令pB指向另一个链表的头部
    if (pB == null) pB = headA;
  }
  return pA;
};
```