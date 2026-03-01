---
title: Redux
date: 2022-04-08
---

## MVC 模式

- Model（模型层）：提供/保存数据
- Controller（控制层）：数据处理，实现业务逻辑
- View（视图层）：展示数据，提供用户界面

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/web前端图片资源/mvc.4rknv6t4u220.png)

服务器根据网络请求的路径以及数据，交由对应的 Controller 进行处理，Controller 根据路径及数据进行相应处理后再由 Model，Model 与 database 进行交互产生相应数据然后返回给 Controller，Controller 再根据返回的数据组装 HTML 生成 View，即组装成完整的 HTML 作为响应结果返回。这个模式称之为服务端的 MVC 模式，其中 M 表示 Model，V 表示 View，C 表示 Controller

## Redux 架构
**「 Redux 流程图」**

![](https://cdn.jsdelivr.net/gh/liukj98/image-hosting@master/web前端图片资源/redux.3loe369z8dm0.png)

### Redux 三大核心概念

::: tip
Redux 核心概念有三个：action、reducer、store
:::

#### Action

1. action 是一个 plain-object（平面对象）
   1. 所谓的平面对象就是它的 `__proto__` 指向 Object.prototype

2. action 中必须有 type 属性，该属性用于描述操作（意图）的类型

3. 通常使用 payload 属性表示附加数据

4. 在大型项目中，由于操作类型非常多，为了避免硬编码(hard code)，会将 action 的类型存放到一个或一些单独的文件中（样板代码）

5. 为了方便传递 action，通常会使用 action 创建函数(action creator)来创建 action

6. action 创建函数应为无副作用的纯函数
    - 不能以任何形式改动参数
    - 不可以有异步操作
    - 不可以对外部环境中的数据造成影响

7. 为了方便利用 action 创建函数来分发（触发）action，redux 提供了一个函数 ```bindActionCreators```，该函数用于增强 action 创建函数的功能，使它不仅可以创建 action，并且创建后完成自动分发。

#### Reducer

Reducer 是用于改变数据的函数

1. 一个数据仓库有且仅有一个 reducer，并且通常情况下，一个工程仅有一个仓库，因此，一个系统只有一个 reducer

2. 为了方便管理通常会将 reducer 放到单独的文件中

3. **reducer 被调用的时机**
   1. 通过 store.dispatch 分发一个 action，此时会调用 reducer

   2. 当通过 createStore 来创建一个 store 时，会通过 store.dispatch 来调用一次 reducer
      - 可以利用这一点，用 reducer 来初始化状态
      - 创建仓库时，不传递任何默认状态
      - 将 reducer 的参数 state 设置一个默认值

4. reducer 内部通常使用 switch 来判断 type 值

5. **reducer 必须是一个没有副作用的纯函数**

   1. 为什么是纯函数？
      - 纯函数有利于测试与调试
      - 有利于还原数据
      - 有利于将来和 react 结合时的优化

   2. 具体要求

      - 不能以任何形式改动参数
      - 不可以有异步操作
      - 不可以对外部环境中的数据造成影响

6. 由于在大型项目中，操作比较复杂，数据结构也比较复杂，因此对于不同的数据操作需要不同的 reducer 进行处理，于是
   1. redux 提供了一个方法，可以帮助我们更加方便的合并不同的 reducer。该方法为 combineReducers，其主要功能为合并不同的 reducer，得到一个新的 reducer，该新的 reducer 管理一个对象，该对象的每个属性交给对应的 reducer 管理

#### Store

是一个用于保存数据的仓库，该仓库（对象）有以下几个成员

1. dispatch(): 用于分发一个 action，该函数内部会执行 reducer 以此来改变状态数据

2. getState(): 获取仓库中的状态数据

3. replaceReducer(): 替换 reducer

4. subscribe(): 订阅回调函数，当仓库中的状态数据改变时，该回调函数会执行  