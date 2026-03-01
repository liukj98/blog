---
title: 回文链表
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/palindrome-linked-list/)

请判断一个链表是否为回文链表。

**示例 1:**

```
输入: 1->2
输出: false
```

**示例 2:**

```
输入: 1->2->2->1
输出: true
```

## 思路

**「方法一」**

1. 找到中间节点
2. 以中间节点为分水岭将链表切分为两部分：前半部分和后半部分
3. 将以中间节点为头节点的后半部分进行翻转
4. 比较链表的前半部分与翻转后的后半部分

**「方法二」**

利用链表的后序遍历，使用函数调用栈作为后序遍历栈，来判断是否回文

## 代码

```js
// 方法一
// 时间复杂度：O(n)， 空间复杂度：O(1)
function isPalindrome(head) {
  if (head === null || head.next === null) return true;
  // 初始化快慢指针
  let slow = fast = head;
  // 1.先找到中间节点
  while(fast !== null && fast.next !== null){
    slow = slow.next;
    fast = fast.next.next;
  }
  // 2.翻转以 slow 为头节点的链表（翻转后半部分节点）
  let p = reverse(slow);
	// 3.将链表的前半部分和翻转后的后半部分节点进行比较
  while(p !== null){
    if(head.value !== p.value){
      return false;
    }
    head = head.next;
    p = p.next;
  }
  return true;
};

// 翻转链表
function reverse(head){
  // base case
  if(head === null || head.next === null) return head;
  let p = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return p;
}

// 方法二
function isPalindrome2(head) {
  let left = head;
  function traverse(right) {
    if (right == null) return true;
    let res = traverse(right.next);
    res = res && (right.value === left.value);
    left = left.next;
    return res;
  }
  return traverse(head);
}

// 方法三
// 时间复杂度：O(n)， 空间复杂度：O(n)
function isPalindrome(head) {
  let arr = [];
  let p = head;
  // 遍历链表所有节点，将节点值存入arr数组中
  while (p !== null) {
    arr.push(p.value);
    p = p.next;
  }
  // 从数组尾部和链表头部开始比较
  while(head !== null){
    if(head.value !== arr.pop()){
      return false;
    }
    head = head.next;
  }
  return true;
}
```