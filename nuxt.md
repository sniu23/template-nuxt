
## Nuxt.js v1.4.0 [bug](https://github.com/nuxt/nuxt.js/issues/3048) fix

- Open the file ./node_modules/nuxt/lib/builder/webpack/postcss.js
- Comment out the line with useConfigFile: false
- Run npm run dev - all OK this time.

## 目录

- `assets` 资源： LESS、SASS、JAVASCRIPT……
- `components` Vue组件（没有 asyncData 方法）
- `layouts` 布局组件  [不可更改]
- `middleware` 中间件  [不可更改]
- `pages` 页面  [不可更改]
- `plugins` 插件：组织Vue.js实例化前需要运行的 JS 组件
- `static` 静态文件 [不可更改]
- `store` Vuex 状态 [不可更改]
- `nuxt.config.js` 配置文件 [不可更改]

## 别名

~	| /
- | -
~assets	| /assets
~components	| /components
~pages	| /pages
~plugins	| /plugins
~static	| /static
~store	| /store

## 配置

## 路由

`以下划线作为前缀`的 Vue 文件 或 目录： 带参数的动态路由

如果你想将`参数设置为必选`的路由，需要在同级目录下创建一个 index.vue 文件

创建`内嵌子路由`，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。

## 页面

```html
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    return { name: 'World' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```