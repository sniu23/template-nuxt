
# [vue-router](https://router.vuejs.org/zh-cn/)

## 0. 基本

<router-link to="/foo">Go to Foo</router-link>

<router-view></router-view>

`this.$router`

```js
const router = new VueRouter({
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
})
```

## 1. 动态路由

```js
// this.$route.params
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

// 监控变化
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

## 2. 路由嵌套

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

## 3. 编程式导航

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})
const userId = 123
router.push({ path: `/user/${userId}` }) // -> /user/123

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)
```

## 4. 命名

### 4.1 命名路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user', // here
      component: User
    }
  ]
})
```

### 4.2 命名视图

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

## 5. 重定向

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

## 6. 导航守护

### 6.1 全局级

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})

router.afterEach((to, from) => {
  // ...
})
```

### 6.2 路由独享

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 6.3 组件内

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```


