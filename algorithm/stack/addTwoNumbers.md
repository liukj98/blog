---
title:  两数相加 II
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/add-two-numbers-ii/)

给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

示例1：
![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/LeetCode/Snipaste_2022-04-11_15-13-36.54hifa3llpo0.webp)
```
输入：l1 = [7,2,4,3], l2 = [5,6,4]
输出：[7,8,0,7]
```

示例2：
```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[8,0,7]
```

示例3：
```
输入：l1 = [0], l2 = [0]
输出：[0]
```
## 代码

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // 利用 `栈` 这种数据结构
    let p1 = l1;
    let p2 = l2;
    const st1 = new MyStack();
    const st2 = new MyStack();
    const st = new MyStack();

    let carryBit = 0;// 进位全局变量

    while (p1) {
        st1.push(p1)
        p1 = p1.next;
    }
    while (p2) {
        st2.push(p2)
        p2 = p2.next;
    }

    while (!st1.isEmpty() && !st2.isEmpty()) {
        const node1 = st1.pop();
        const node2 = st2.pop();
        let sum = node1.val + node2.val + carryBit;
        carryBit = Math.floor(sum/10);//更新进位
        let val = sum % 10;
        st.push(new ListNode(val));
    }
    if (st2.isEmpty()) {
        while (!st1.isEmpty()) {
            const node1 = st1.pop();
            let sum = node1.val + carryBit;
            carryBit = Math.floor(sum/10);//更新进位
            let val = sum % 10;
            st.push(new ListNode(val));
        }
    }
    if (st1.isEmpty()) {
        while (!st2.isEmpty()) {
            const node1 = st2.pop();
            let sum = node1.val + carryBit;
            carryBit = Math.floor(sum/10);//更新进位
            let val = sum % 10;
            st.push(new ListNode(val));
        }
    }

    if(carryBit > 0){
        st.push(new ListNode(carryBit))
    }
    // 此时 st 栈中保存着最后结果的 ListNode 节点
    let dummyNode = new ListNode();
    let p = dummyNode;
    while(!st.isEmpty()){
        p.next = st.pop();
        p = p.next;
    }
    return dummyNode.next;

};
```
