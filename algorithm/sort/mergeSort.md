---
title: 归并排序
date: 2022-04-08
---
## 思路

如果要排序一个数组，我们先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序了。为了理解方便，我画了一张图可以辅助你理解

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/算法学习图片资源/image-20210530135503331.2eki07zpr11c.png)

## 代码

```js
/**
 * 合并两个有序数组
 * @param {*} arr [1, 5, 6, 2, 3, 4] 左半部分有序，右半部分有序
 * @param {*} p 
 * @param {*} r 
 */
function merge(arr, p, r) {
  let q = p + Math.floor((r - p) / 2);
  let i = p,
    j = q + 1;
  let tempArr = new Array(r - p + 1).fill(0); // 申请一个空间大小为(r-p+1)的临时数组；
  let k = p;
  while (i <= q && j <= r) {
    if (arr[i] <= arr[j]) {
      tempArr[k++] = arr[i++];
    } else {
      tempArr[k++] = arr[j++];
    }
  }
  // 当左半部分数组有剩余时的处理
  while (i <= q) {
    tempArr[k++] = arr[i++];
  }
  // 当右半部分数组有剩余时的处理
  while (j <= r) {
    tempArr[k++] = arr[j++];
  }
  // 将临时数组拷贝到原数组中
  for (let n = p; n <= r; n++) {
    arr[n] = tempArr[n];
  }
}

/**
 * 归并排序
 * @param {*} arr 
 * @param {*} n 数组的空间大小
 */
function mergeSort(arr, n) {
  function _mergeSort(arr, p, r) {
    if (p >= r) return;// 递归的出口，数组中只有一个元素
    // 取 p 到 r 的中间位置 q
    let q = p + Math.floor((r - p) / 2);
    _mergeSort(arr, p, q);
    _mergeSort(arr, q + 1, r);
    merge(arr, p, r)
  }
  _mergeSort(arr, 0, n - 1)
}

const arr = [2, 3, 1, 5, 6, 8, 10];
mergeSort(arr, arr.length)
console.log(arr)
```
## 参考资料
- [数据结构与算法之美·王争·极客时间](https://time.geekbang.org/column/article/41913)