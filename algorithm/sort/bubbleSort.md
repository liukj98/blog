---
title: 冒泡排序
date: 2022-04-08
---

## 分析

一次冒泡排序，可以将某个区域序列的最大值排序到该区域的最后一位，具体的方式是：

1. 将第1位和第2位比较，如果前者比后者大则交换
2. 将第2位和第3位比较，如果前者比后者大则交换
3. 依次类推，直到比较到该区域的最后两位
4. x重复上述过程，直到序列排序完成

## 代码
```js
// 冒泡排序
function bubbleSort(arr){
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if(arr[j] > arr[j + 1]){
        // 当前元素比后一个元素大，则交换
        swap(arr, j, j + 1);
      }
    }
  }
}
// 交换数组指定位置的值
function swap(arr, i, j){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```