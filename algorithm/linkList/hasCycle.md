---
title: 环形链表
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/linked-list-cycle/)

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 `pos` 是` -1`，则在该链表中没有环。**注意：`pos` 不作为参数进行传递**，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 `true` 。 否则，返回 `false` 。

**示例：**

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/算法学习图片资源/Snipaste_2021-06-13_00-46-33.7k6rcqiy0v40.png)

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

## 思路

**使用快慢指针：**

1. 先初始化快慢指针 `fast`、`slow` 指向头节点
2. 快指针每次走两步，慢指针每次走一步
3. 若链表成环，最终快慢指针会指向同一个节点
4. 若链表不成环，快指针会先走到链表的尾部

## 代码

```js
function hasCycle(head) {
  // 初始化快慢指针
  let fast = slow =  head;
  while(fast !== null && fast.next !== null){// 链表可能有奇数个节点或偶数个节点
    // 慢指针每次走一步
    slow = slow.next;
    // 快指针每次走两步
    fast = fast.next.next;
    // 如果成环必相遇
    if(slow === fast) return true;
  }
  // 快指针走到链表尾时还没相遇，说明不成环
  return false;
};
```