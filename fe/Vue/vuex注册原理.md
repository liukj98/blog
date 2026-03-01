---
title: vuex注册原理
date: 2022-04-08
---

## Vue 注册 Vuex 插件的全部流程

::: tip 

想必使用过 Vue 的开发者对 Vuex 都不陌生，但是对 Vuex 是如何挂载到 Vue 中以便开发者去使用 Vuex 的这一问题可能会有些许的疑虑，本篇博文则从源码的角度为你揭晓其中的点点滴滴	

小插曲-Vue 中的插件机制：[Vue.use](https://cn.vuejs.org/v2/guide/plugins.html) 可以查阅官方文档了解其使用方式，此篇博文不作过多介绍

:::


**总流程核心代码**

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {}
})
export default store;

// src/main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

**分析**

1. 在 `src/store/index.js` 文件中通过 `import Vuex from "vuex"` 导入 `Vuex` ，再通过 `Vue.use(Vuex)` 注册 ` Vuex` 插件，而导入的 `Vuex` 是一个对象，该对象中有一个 `install` 属性，其值为一个函数。 `Vue.use(Vuex)` 内部会调用 `Vuex` 的 `install` 函数

   ```js
   // Vue.use 源码
   Vue.use = function (plugin: Function | Object) {
     const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
     if (installedPlugins.indexOf(plugin) > -1) {
       return this
     }
     // additional parameters
     const args = toArray(arguments, 1)
     args.unshift(this)
     if (typeof plugin.install === 'function') {
       plugin.install.apply(plugin, args)
     } else if (typeof plugin === 'function') {
       plugin.apply(null, args)
     }
     installedPlugins.push(plugin)
     return this
   }
   
   function toArray (list: any, start?: number): Array<any> {
     start = start || 0
     let i = list.length - start
     const ret: Array<any> = new Array(i)
     while (i--) {
       ret[i] = list[i + start]
     }
     return ret
   }
   ```
   
2. 在上面的 `Vue.use` 源码中我们知道调用了 `install` 函数，而 `install` 函数内部又到底做了些什么事呢？往下看吧

   ```js
   // Vuex 中的 install 源码
   function install(_Vue) {
     // 避免重复注册 Vuex
     if (Vue && _Vue === Vue) {
       if (__DEV__) {
         console.error(
           '[vuex] already installed. Vue.use(Vuex) should be called only once.'
         )
       }
       return
     }
     Vue = _Vue
     applyMixin(Vue)
   }
   // applyMixin 源码
   /**
    * 兼容 Vue 1.x 版本，该版本我不是很熟
    * 但为了分析方便目前只考虑 Vue 2.x 版本
    * 通过 Vue.mixin 全局 API 进行混入，混入的具体内容是：
    * 给每个组件实例在 beforeCreate 生命周期时添加 $store 属性，该属性值为 Store 实例
    * @param {*} Vue 全局的 Vue
    */
   function applyMixin (Vue) {
     const version = Number(Vue.version.split('.')[0])
     if (version >= 2) {
       // 将 vuexInit 函数与生命周期钩子函数产生联系，只有当 new Vue() 过程中进行到 beforeCreate 阶段才执行 vuexInit 函数
       // 这里多提一嘴，生命周期钩子函数会被 push 到数组中
       // 同时依赖于 Vue.mixin API 使得 vuexInit 函数内部的上下文指向 Vue 组件实例，以此可以拿到实例的 options
       // 不得不感叹这操作真的是很妙啊
       Vue.mixin({ beforeCreate: vuexInit })
     } else {
       // 兼容 Vue 1.x 版本
       // override init and inject vuex init procedure
       // for 1.x backwards compatibility.
       const _init = Vue.prototype._init
       Vue.prototype._init = function (options = {}) {
         options.init = options.init
           ? [vuexInit].concat(options.init)
           : vuexInit
         _init.call(this, options)
       }
     }
   }
     /**
      * 该函数的执行是异步的，它依赖于 Vue 的 beforeCreate 生命周期钩子
      * Vuex init hook, injected into each instances init hooks list.
      * 当 new Vue(options) 时，在 beforeCreate 时期执行该函数，在 new Vue(options) 时已创建好了 Store 实例了，
      * 并传入到 options 中了
      * 此时就可以将 Store 实例挂载到 vue 的每个组件实例中了（以 this.$store 的形式）
      */
   function vuexInit () {
     // 该函数内部的 this 指向 Vue 实例
     // 此时（beforeCreate）阶段已经可以拿到 options 了
     const options = this.$options
     // store injection
     // 若当前组件的 options 上已存在 store，则将 options.store 赋值给 this.$store（一般是用于根组件的）
     if (options.store) {
       this.$store = typeof options.store === 'function'
         ? options.store()
       : options.store
     }
    // 当前组件的options上没有store，则获取父组件上的$store，即options.parent.$store，并将其赋值给this.$store（一般用于子组件）  
     else if (options.parent && options.parent.$store) {
       this.$store = options.parent.$store
     }
   }
   ```

3. 接下来就是通过 `new Vuex.Store(options)` 创建 `Store` 实例，而 `Store` 构造函数内部又发什么了？这就涉及到 `Vuex` 源码了，此处省略 `1000` 行核心代码:cry:

4. 在 `src/main.js` 文件中通过 `new Vue({store, ...})` 创建 `Vue` 实例，在创建 `Vue` 实例的过程中会经历 `beforeCreate` 阶段，在该阶段就会执行 `vuexInit` 函数，以此将 `Store` 实例（就是我们在 `new Vue` 时配置的一个 `store options` 项）挂载到 `Vue` 组件实例中（以 `this.$store` 的形式），之后我们就可以痛痛快快地使用 `Vuex` 了

**以上就是 `Vuex` 挂载到 `Vue` 中的整个流程了**

**相较于 redux 源码，vuex 源码可能较复杂点。感兴趣的可以看看 vuex 和 redux 源码**