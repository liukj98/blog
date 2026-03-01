---
title: RSA
date: 2023-06-25
---

# 质数分解难题

> RSA 算法的安全性依赖于大整数进行质因数分解的困难

## 前置知识

### 质数

1. **定义**

    质数也称素数，它是指只能被 $1$ 和本身整除的自然数

2. **互质**

    若两个数的最大公因数（或最大公约数）是 $1$，则称这两个数互质

### 同余式

> 这个概念很重要，对后面的 RSA 算法正确性的证明及其关键

1. **定义**

    若两个数 $a、b$ 同时除以某一个数 $m$ 的余数相同，则称这两个数 $a、b$ 对某一个数 $m$ 同余，记为 $a \equiv b (mod m)$，比如

    $23÷7=3 \dots 2$

    $65÷7=9 \dots 2$

    则 $23$ 和 $65$ 对 $7$ 同余，记做 $23 \equiv 65 (mod 7)$
    
2. **性质**

    1. 同余式可以互相加：若 $a ≡ b（mod m）$、 $c ≡ d（mod m）$，则 $a+c ≡ b+d（mod m）$

    2. 同余式可以互相乘：若 $a ≡ b（mod m）$、 $c ≡ d（mod m）$，则 $a*c ≡ b*d（mod m）$

### 欧拉函数

1. **定义**

    记欧拉函数 $\varphi (n)$，$\varphi (n)$ 表示为小于 $n$ 的正整数中与 $n$ 互质的数的数目
    
2. 如果 $n$ 能写作两个不同质数 $p_{1}$ 与 $p_{2}$ 的乘积，即 $n=p_{1} \times p_{2}$，则 $\varphi(n) =(p_{1} - 1) \times (p_{2} - 1)$ 
  
    因为 $\varphi(n) = \varphi(p_{1} \times p_{2}) = \varphi(p_{1}) \times \varphi(p_{2}) = (p_{1} - 1) \times (p_{2} - 1)$

### 欧拉定理

若 $a$ 与 $n$ 互质，则 $a^{\varphi (n)} \equiv  1 ( mod n )$

### 乘法逆元

如果 $ab ≡ 1（mod m）$，则称 $a$ 和 $b$ 为关于 $m$ 互为乘法逆元

已知 $a$ 求 $b$ 的方法：因为 $ab ≡ 1（mod m）$，所以不妨设 $ab=mk+1$，其中 $a$ 和 $m$ 为已知数

利用 扩展欧几里得 算法，可以在多项式时间内，计算出来一个乘法逆元 $b$，当然 $k$ 也是能求出来的，只不过此处的 $k$ 没啥用

此处利用 扩展欧几里得算法 的前提是 $a$ 与 $m$ 互素

## RSA 算法

### 步骤

1. **第一步**：随机生成两个大质数 $p_{1}$ 和 $p_{2}$

2. **第二步**：计算 $n = p_{1} \times p_{2}$

3. **第三步**：计算欧拉函数 $\varphi (n) = (p_{1} - 1) \times (p_{2} - 1)$

4. **第四步**：构造一个比 $1$ 大、比 $\varphi (n)$ 小、不等于 $p_{1}$ 或 $p_{2}$ 的整数 $e$

5. **第五步**：求出 $e$ 对于 $\varphi (n)$ 的乘法逆元 $d$，也就是说 $ed \equiv  1（mod  \varphi(n)）$，也就是说 $ed=k\varphi (n)+1$

至此，公钥和私钥生成完毕，其中

公钥： $(n,  e)$

私钥： $(n, d)$

对于一个明文数据 $m$，其中 $m$ 与 $n$ 是互质的，并且 $m$ 小于 $n$

可以利用公钥 $(n,  e)$ 加密 $m$ 为密文 $c$，具体加密算法如下

$$\mathbf{\color{#f40} c \equiv m^{e} (mod n)}$$

对于密文数据 $c$，可以利用私钥 $(n, d)$ 解密 $c$ 为明文 $a$，具体解密算法如下

$$\mathbf{\color{#008c8c} m \equiv c^{d} (mod n)}$$

### 证明

> **如何由 $c \equiv m^{e} (mod n)$，推导出 $\color{orage} m \equiv c^{d} (mod n)$ ？其中 $c$ 为密文数据， $m$ 为明文数据**
> 
> 以下的证明是基于明文数据 $m$ 与 $n$ 是互素的情况
> 
> 当 $m$ 与 $n$ 不是互素的话，结果也是一样的

由于 $m$ 与 $n$ 互素，根据欧拉定理可知 $a^{\varphi (n)} \equiv  1 ( mod n )$，所以

$$\left.\begin{matrix} 
  m^{\varphi (n)} \equiv  1 ( mod n ) \\ 
  m^{\varphi (n)} \equiv  1 ( mod n ) \\ 
  \dots \\
  m^{\varphi (n)} \equiv  1 ( mod n )
\end{matrix}\right\} k 个$$

由同余式的性质之**互相乘**可知

$$ m^{k\varphi (n)} \equiv  1 ( mod n )$$

又因为 

$$ m \equiv m (mod n)$$

所以

$$\left.\begin{matrix} 
   m^{k\varphi (n)} \equiv  1 ( mod n) \\ 
   m \equiv m (mod n)
\end{matrix}\right\} 2个$$

由同余式的性质之**互相乘**可知

$$ m^{k\varphi (n) + 1} \equiv m ( mod n )$$

又因为

$$ed=k\varphi (n)+1 $$

所以

$$m^{ed} \equiv m ( mod n ) \color{#f40} \quad（1）$$

所以，若

$$c \equiv m^{e} (mod n)$$

所以

$$\left.\begin{matrix} 
  c \equiv m^{e} (mod n) \\ 
  c \equiv m^{e} (mod n) \\ 
  ... \\
  c \equiv m^{e} (mod n)
\end{matrix}\right\} d 个$$


由同余式的性质之**互相乘**可知

$$ c^{d} \equiv m^{ed} (mod n) \color{#f40} \quad（2）$$

所以，由 $\color{#f40} (1)$ 和 $\color{#f40} (2)$ 式可知 $a$ 与 $c^{d}$ 模 $n$ 的结果是一样的，即

$$\mathbf{\color{#008c8c} m \equiv c^{d} (mod n)}$$

**为何 $d$ 很难破解？**

攻击者可以获得的数据有密文数据 $c$ 和公钥 $(n,e)$

又因为 

$$\color{orage} m \equiv c^{d} (mod n)$$

要想根据密文数据 $c$ 获得明文数据 $m$，就必须再知道私钥 $(n,d)$ 中的 $d$

由于

$$ed=k\varphi (n)+1 $$

所以只要知道 $\varphi (n)$，就能求出 $d$

又因为

$$\varphi (n) = (p_{1}-1)(p_{2}-1)$$

所以只要知道 $p_{1} 和 p_{2}$ 就能求出 $\varphi (n)$ 继而求出 $d$

又因为

$$n = p_{1} \times p_{2}$$

所以只要通过 $n$ 求得 $p_{1} 和 p_{2}$ 即可求出 $d$

**但是因为 $n$ 太大了，而分解质因数需要指数时间，所以没有人能够将 $n$ 质因数分解求出 $p_{1}$ 和 $p_{2}$**

**这种将大整数进行质因数分解的问题就称为质数分解难题**

**所以理论上任何人都不能推导出私钥 $d$**

> **RSA 的安全性条件**
> 
> 1. $|p-q|$ 要大
>
> 2. $p-1$ 和 $q-1$ 都应有大素因子


## 代码实现（TODO）

可参考 [KeyPairGenerator (Java SE 11 & JDK 11 )](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/security/KeyPairGenerator.html) API 及其源码

## 参考资料

- [如何深入浅出地讲解RSA密码？](https://www.zhihu.com/question/304030251/answer/543201982)
- [RSA算法原理](https://zhuanlan.zhihu.com/p/48249182)
- [扩展欧几里得算法](https://zhuanlan.zhihu.com/p/100567253)