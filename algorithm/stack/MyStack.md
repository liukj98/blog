---
title: 用队列实现栈
date: 2022-04-08
---

## 题目 [LeetCode](https://leetcode-cn.com/problems/implement-stack-using-queues/)

请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

实现 MyStack 类：

- void push(int x) 将元素 x 压入栈顶。
- int pop() 移除并返回栈顶元素。
- int top() 返回栈顶元素。
- boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。

注意：

- 你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
- 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

示例：
```
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False
```
## 代码

```js
function Myqueue() {
    this.array = new Array().fill(null);
    this.size = 0;
}

Myqueue.prototype.push = function (x) {
    this.array.push(x)
    this.size++;
}

Myqueue.prototype.pop = function (x) {
    if (!this.isEmpty()) {
        const res = this.array.splice(0, 1)[0]
        this.size--;
        return res;
    }
}

Myqueue.prototype.peek = function (x) {
    if (!this.isEmpty()) {
        return this.array[0];
    }
}

Myqueue.prototype.isEmpty = function (x) {
    return this.size == 0;
}

var MyStack = function () {
    this.queue1 = new Myqueue();
    this.queue2 = new Myqueue(); // 用于备份的队列
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
    this.queue1.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
    if (!this.queue1.isEmpty()) {
        while (this.queue1.size > 1) { // 将除最后一个元素外的所有元素备份到队列2中
            this.queue2.push(this.queue1.pop())
        }
        const res = this.queue1.pop();
        while (this.queue2.size) {
            this.queue1.push(this.queue2.pop());
        }
        return res;
    }
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
    if (!this.queue1.isEmpty()) {
        while (this.queue1.size > 1) { // 将除最后一个元素外的所有元素备份到队列2中
            this.queue2.push(this.queue1.pop())
        }
        const res = this.queue1.pop();
        while (this.queue2.size) {
            this.queue1.push(this.queue2.pop());
        }
        this.queue1.push(res);
        return res;
    }
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
    return this.queue1.isEmpty();
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
```