---
title: 奇偶链表
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/odd-even-linked-list/)

给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

**示例 1:**

```
输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
```

**示例 2:**

```
输入: 2->1->3->5->6->4->7->NULL 
输出: 2->3->6->7->1->5->4->NULL
```

## 思路

**使用双指针：**

原始链表的头节点 head 也是奇数链表的头节点以及结果链表的头节点，head 的后一个节点是偶数链表的头节点。令 evenHead = head.next，则 evenHead 是偶数链表的头节点。

维护两个指针 odd 和 even 分别指向奇数节点和偶数节点，初始时 odd = head，even = evenHead。通过迭代的方式将奇数节点和偶数节点分离成两个链表，每一步首先更新奇数节点，然后更新偶数节点。

- 更新奇数节点时，奇数节点的后一个节点需要指向偶数节点的后一个节点，因此令 odd.next = even.next，然后令 odd = odd.next，此时 odd 变成 even 的后一个节点。

- 更新偶数节点时，偶数节点的后一个节点需要指向奇数节点的后一个节点，因此令 even.next = odd.next，然后令 even = even.next，此时 even 变成 odd 的后一个节点。

在上述操作之后，即完成了对一个奇数节点和一个偶数节点的分离。重复上述操作，直到全部节点分离完毕。全部节点分离完毕的条件是 even 为空节点（当链表的节点个数为奇数个时）或者 even.next 为空节点（当链表的节点个数为偶数个时），此时 odd 指向最后一个奇数节点（即奇数链表的最后一个节点）。

最后令 odd.next = evenHead，将偶数链表连接在	之后，即完成了奇数链表和偶数链表的合并，结果链表的头节点仍然是 head。

## 代码

```js
function oddEvenList(head) {
  // 当链表只有一个或两个节点的情况下直接返回
  if(head === null || head.next === null || head.next.next === null) return head;
  let odd = _odd = head; // 初始化奇数节点指针
  let even = _even  = head.next; // 初始化偶数节点指针
  while(_even !== null && _even.next !== null){
    // 先移动奇数节点指针
    _odd.next = _even.next;
    _odd = _odd.next;
    // 再移动偶数节点指针
    _even.next = _odd.next;
    _even = _odd.next;
  }
  // 合并奇偶节点链表
  _odd.next = even;
  return odd;
};
```