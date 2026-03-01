---
title: 合并两个有序链表
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

**示例 1**

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/算法学习图片资源/Snipaste_2021-06-13_01-09-35.46nifalft7c0.png)

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

## 思路

**双指针**

和合并两个有序数组的思路是一样的

定义两个指针分别指向两个链表的头节点，然后逐一比对即可

## 代码

```js
var mergeTwoLists = function (list1, list2) {
    let p1 = list1;
    let p2 = list2;
    let dummyNode = new ListNode();
    let p = dummyNode;
    while (p1 !== null && p2 !== null) {
        if (p1.val < p2.val) {
            p.next = new ListNode(p1.val);
            p1 = p1.next
        } else {
            p.next = new ListNode(p2.val);
            p2 = p2.next
        }
        p = p.next;
    }
    p.next = p1 == null ? p2 : p1;
    return dummyNode.next;
}
```