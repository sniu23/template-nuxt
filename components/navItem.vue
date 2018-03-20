<template>
  <section>

    <template v-for="item in routes" >
      <el-menu-item v-if="item.children.length === 0" :key="item.name" :index="item.path" :meta="item.meta">{{item.name}}</el-menu-item>
      <el-submenu v-else :key="item.name" :index="item.path">
        <template slot="title">{{item.name}}</template>
        <nav-item :routes="item.children" />
      </el-submenu>
    </template>

  </section>
</template>

<script>
export default {
  name: "navItem",
  props: {
    routes: {
        type: Array
    }
  }
}
</script>
