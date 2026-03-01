---
title: 合并K个升序链表
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

**示例 1**
```
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
```

**示例 2**
```
输入：lists = []
输出：[]
```

**示例 3**
```
输入：lists = [[]]
输出：[]
```

## 思路

方法一：暴力破解

方法二：分治

## 代码

```js
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    // 分治的理解，本质就是二叉树的后续遍历
    function merge(lists, l, r) {
        // 递归出口
        if (l == r) return lists[l];
        if(l > r) return null;

        let mid = l + ((r - l) >> 1);
        let leftNode = merge(lists, l, mid)
        let rightNode = merge(lists, mid + 1, r)
        return mergeTwoLists(leftNode, rightNode);
    }
    return merge(lists, 0, lists.length - 1)

};

// 合并两个有序链表
var mergeTwoLists = function (list1, list2) {
    let p1 = list1;
    let p2 = list2;
    let dummyNode = new ListNode("");
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
};
```