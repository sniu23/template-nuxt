<template>
<ul>
  <li v-for="item in routes" :key="item.path"
    :is="(!item.children || item.children.length === 0) ? 'el-menu-item' : 'el-submenu' " 
    :index="item.path">
    <span v-if="(!item.children || item.children.length === 0)" class="small" slot="title">{{item.name}}</span>
    <template v-else slot="title">
      <i class='el-icon-location'></i>
      <span class="small" slot="title">{{item.name}}</span>
    </template>
    <nav-item :routes="item.children" />
  </li>
</ul>
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

<style scoped>
ul {
  padding: 0;
}
.small {
  font-size: 13px;
}
</style>
