---
title: ECC
date: 2023-07-14
---

# 椭圆曲线难题

> EC ElGamal 算法的安全性依赖于椭圆曲线上离散对数求解的困难

全称 Elliptic Curve Discrete Logarithm Problem，简称 ECDLP

## 前置知识

### 阿贝尔群

在普通群的定义性质上增加了一个交换律性质，也称为交换群，也就是说阿贝尔群要满足以下五个性质

1. **封闭性**

2. **结合律**

3. **单位元**

4. **逆元**

5. **交换律**

### 有限域

1. 域 $F$ 只包含有限个元素阶

2. 有限域中元素的个数称为有限域的阶

3. 每个有限域的阶必为素数的幂，即有限域的阶可表示为 $p^{n}$ ($p$ 为素数， $n$ 是正整数），记为 $GF(p^{n})$

### 椭圆曲线

椭圆曲线方程的一般形式

$$y^2 + axy + by = x^3 + cx^2 + dx + e$$

ECC 最常用的椭圆曲线方程是

$$y^2 = x^3 + ax + b, (a, b \in GF(p), 4a^3+27b^2 \neq 0)$$

密码学中普遍采用的是有限域上的椭圆曲线

1. **椭圆曲线上的点集 $E_p(a,b)$**

    1. 该点集就是一个阿贝尔群，群中的每一个元素就是一个个的点 $(x, y)$

2. **椭圆曲线上的点集的运算**

    1. 加法法则： $P+Q$，其中 $P,Q \in E_p(a, b)$

        1. 由于 $E_p(a, b)$ 是一个群，所以 $P+Q$ 的结果也属于 $E_p(a, b)$

    2. 倍乘法则： $nP$，其中 $P \in E_p(a, b)$， $n$ 是一个随机正整数

        1. 当 $P=Q$ 时，$P+Q=2P$

### 椭圆曲线上的离散对数问题

**在椭圆曲线构成的阿贝尔群（点集） $\mathbf{\color{orange} E_p(a,b)}$ 上考虑方程 $\mathbf{\color{orange} Q=kP}$，其中 $\mathbf{ \color{orange} P,Q \in E_p(a,b), k<p}$，则由 $\mathbf{ \color{orange} k}$ 和 $\mathbf{\color{orange}P}$ 易求  $\mathbf{\color{orange}Q}$，但由 $\mathbf{\color{orange}P}$ 和 $\mathbf{\color{orange}Q}$ 求 $\mathbf{ \color{orange} k}$ 则是困难的，这就是椭圆曲线上的离散对数问题（ECDLP）**

## EC ElGamal 算法

EC ElGamal 是 ECC（Elliptic Curve Cryptography） 的一种，该算法就是把 ElGamal 移植到椭圆曲线上来实现

### 步骤

1. **生成密钥对**

    1. 取 $E_p(a,b)$ 的一个生成元 $P_A$（对应 ECDLP  $Q=kP$ 中的 $P$），$E_p(a,b)$ 和 $P_A$ 作为公开参数

    2. 用户 A 选 $k_A$ 作为私钥（对应 ECDLP  $Q=kP$ 中的 $k$），并以 $Q_A = k_A P_A$ 作为公钥（对应 ECDLP  $Q=kP$ 中的 $Q$）

2. **加密过程，使用公钥 $Q_A$**

    1. 已知明文数据 $P_m$，可选取一个随机正整数 $r$，产生以下点对作为密文

$$C_m = \{rP_A, P_m + rQ_A\}$$

3. **解密过程，使用私钥 $k_A$**

    1. 以密文点对 $C_m$ 中的第二个点 $P_m + rQ_A$ 减去用自己的私钥 $k_A$ 与第一个点 $rP_A$ 的倍乘，即

$$P_m + rQ_A - k_A rP_A = P_m + r(k_AP_A)-k_A r P_A = P_m$$


### 证明

**为什么私钥 $k_A$ 很难破解？**

攻击者可以获得的数据是 $E_p(a,b)$，$P_A$ 和 $Q_A$

又因为 $Q_A = k_A P_A$，所以只要求得 $k_A$ 私钥就可以

但是由 $Q_A$ 和 $P_A$ 求解 $k_A$ 属于椭圆曲线上的离散对数问题，这非常困难

所以理论上任何人都不能推导出私钥 $k_A$

## 参考资料

- [ECC椭圆曲线密码学的原理、公式推导、例子、Python实现和应用](https://zhuanlan.zhihu.com/p/42629724)
- [椭圆曲线加密算法（ECC）](https://zhuanlan.zhihu.com/p/101907402)
- [椭圆曲线加密算法 - 掘金](https://juejin.cn/post/6844903554700804109)