---
title: Hooks
date: 2022-04-08
---

## useState 

```ts
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

**「参数」**

1. `initialState`：初始状态值，可以为一个原始值，也可以为返回一个原始值的函数

**「返回结果」** 

1. `[S, Dispatch<SetStateAction<S>>]`：是一个包含两个元素的数组，其中 S 表示状态数据，Dispatch 表示改变状态数据的方法

## useEffect 

::: tip
**类似于**类组件中的 componentDidMount、componentDidUpdate、componentWillUnmount 生命周期钩子函数
与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect **不会阻塞浏览器更新屏幕**，这让你的应用看起来响应更快；（componentDidMount 或 componentDidUpdate 会阻塞浏览器更新屏幕)
:::

```ts
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
```

**「参数」**

1. `effect`：副作用回调函数，当组件第一次挂载到页面时会执行，此时类似于类组件中的 `componentDidMount` 生命周期钩子
2. `deps`：可选项，是一个依赖数组，数组中的每一项是要依赖的状态数据
   1. 如果不填，useEffect 默认依赖组件中的所有状态数据，每当状态数据改变时，effect 都会执行，此时 effect 副作用回调函数类似于类组件中的 `componentDidUpdate` 生命周期钩子
   2. 如果填，但只是一个空数组，表示不依赖任何状态数据，每当状态数据改变时，effect 都不会执行；如果想要依赖状态数据，就将该状态数据作为该依赖数组中的一个元素即可，只要当该元素（依赖的状态数据）改变时，effect 才会执行

3. `effect` 函数也可以返回一个函数，该返回函数执行的时机在组件被销毁之前，此时该返回函数类似于类组件中的`componentWillUnmount` 生命周期钩子

**「举例」**
```js
useEffect(() => {
  // 在组件第一次挂载到页面时会执行一次，此时等价于类组件中的 componentDidMount 
  // 只有当 count 状态改变时会再次执行，此时等价于类组件中的 componentDidUpdate
  let timer = setInterval(() => {
    setNum(num + 1)
  }, 1000)
  return () => {// 当组件卸载时会执行，此时等价于类组件中的 componentWillUnmount 
    clearInterval(timer)
  }
}, [count])
```

## useContext

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定，如果未提供 Provider 组件则由 `React.createContext` 的默认值决定

```ts
function useContext<T>(context: Context<T>/*, (not public API) observedBits?: number|boolean */): T;
```

**「参数」**

1. `context`：上下文对象，就是通过 createContext 函数创建的上下文对象

**「返回结果」**

上下文对象中的值