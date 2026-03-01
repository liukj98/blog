---
title: 介绍
date: 2022-04-08
---

::: tip 前置了解
1. 在 Java 领域，我们常说的 **SSH** 是指 Struct2 + Spring + Hibernate
2. 在 Java 领域，我们常说的 **SSM** 是指 SpringMVC + Spring + Mybatis
3. 其中 SSM 中的 SpringMVC 对应 SSH 中的 Struct2、Mybatis 对应 Hibernate。

目前我们只需要学习 **SSM** 即可
::: 

## Spring 的理解


> The term "Spring" means different things in different contexts. It can be used to refer to the Spring Framework project itself, which is where it > all started. Over time, other Spring projects have been built on top of the Spring Framework. Most often, when people say "Spring", they mean the > entire family of projects. This reference documentation focuses on the foundation: the Spring Framework itself.
> 
> -- 摘自 [Spring Framework](https://docs.spring.io/spring-framework/reference/overview.html#overview-spring) 文档 对 “Spring” 术语的解释

我们常说的 Spring 框架，是指 Spring Framework 基础框架。

Spring Framework 是整个 Spring 生态（也被称作 Spring 全家桶）的基石。

除了 Spring Framework，Spring 全家桶中还有更多基于 Spring Framework 开发出来的、整合更多功能的框架，比如 Spring MVC、Spring Boot、Spring Cloud 等。

![流程图](https://cdn.staticaly.com/gh/liukj98/image-hosting@master/Java学习图片资源/流程图.7a4ev407h300.webp)

Spring Framework 的核心思想有两个：**IOC** 和 **AOP**

1. **IOC（Inversion Of Control）**：**控制反转**
    
    将对象的创建、对象与对象之间的依赖关系都交由 Spring 进行管理，开发人员无需关注
    
    控制反转是一种设计思想，在 Spring 中实现这种思想的方式是 **DI（Dependency Injection）**，底层使用的是**反射机制**

    由于所有对象交由 Spring 管理，所以 Spring 又称之为 **IOC 容器**，简称**容器**

2. **AOP（Aspect Oriented Programming）**：**面向切面编程**

    **作用**：提供**非业务功能扩展点**，同时将业务功能的代码与非业务功能的代码进行**解耦**

    **具体实现**：使用代理模式（**动态代理**）

## Spring 设计思想

1. 约定优于配置

2. 低侵入、松耦合

3. 模块化、轻量级

4. 再封装、再抽象

## 参考资料

- [84 | 开源实战四（上）：剖析Spring框架中蕴含的经典设计思想或原则](https://time.geekbang.org/column/article/236935)