<template>
<el-container>
  <el-header>
    <div v-if="sideWidth === '200px'" class="logo"></div>
    <div class="icon"><el-button type="text" size="medium" @click.native="onSideCollapse"><i class="fa fa-bars"></i></el-button></div>
    <el-breadcrumb class="bread" separator="/">
      <el-breadcrumb-item v-for="item in paths(list, $route.path)" :key="item.name">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-menu class="topMenu" default-active="help" mode="horizontal">
      <el-submenu index="user">
        <template slot="title">
          <i class="fa fa-user-circle-o fa-fw"></i>
          <span>{{$store.state.user && $store.state.user.name || '用户名'}}</span>
        </template>
        <el-menu-item index="changPass" @click.native="onChangPass">修改密码</el-menu-item>
        <el-menu-item index="logout" @click.native="onLogout">登出</el-menu-item>
      </el-submenu>
      <el-menu-item index="help">
        <template slot="title">
          <i class="fa fa-question-circle-o fa-fw"></i>
          <span>帮助</span>
        </template>
      </el-menu-item>
      <chg-pass :isVisible.sync="showChgPass" />
    </el-menu>
  </el-header>
  <el-container class="south">
    <el-aside :width="sideWidth">
      <el-menu width="98%" unique-opened router>
        <nav-item :routes="list2tree(list)" />
      </el-menu>
    </el-aside>
    <el-main>
      <nuxt/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import NavItem from '~/components/navItem.vue'
import ChgPass from '~/components/chgPass.vue'

export default {
  name: 'admin',
  components: {
    NavItem,
    ChgPass
  },
  mounted: async function() {
    let { data } = await this.$axios.$get(`/navigation/guest/`)
    this.$data.list = data
  },
  data: function() {
    return {
      list: [],
      showChgPass: false,
      sideWidth: '200px',
      active: '/'
    }
  },
  methods: {
    onSideCollapse: function() {
      console.log(this.sideWidth)
      this.sideWidth === '200px' ? this.sideWidth = '0px' : this.sideWidth = '200px'
    },
    list2tree: function(list) {  
      const getChildren = function (fatherName) {
        const _son = list.filter(function(item) {
          return item.father === fatherName
        })
        let _grandson
        if (_son.length > 0) {
          _grandson = _son.map(function (item) {
            item = Object.assign({}, item, { children: getChildren(item.path) })
            return item
          })
        } else {
          _grandson = []
        }
        return _grandson
      }
      const children = getChildren('/') || []
      return children
    },
    paths: function(list, curr) {
      let paths = []
      for (let i=0; i<5; i++) {
        for (let i=0; i<list.length; i++) {
          if (paths.length == 0) {
            if (list[i].path == curr) {
              paths.unshift(list[i])
            }
          } else {
            if (list[i].path == paths[0].father) {
              paths.unshift(list[i])
            }
          }
        }
        if ((paths[0]) && (paths[0].father == '/')) break
      }
      return paths
    },
    onChangPass: function() {
      this.showChgPass = true
    },
    onLogout: function() {
      this.$store.dispatch('LOGOUT')
      this.$router.push('/system/login')
    }
  }
}
</script>

<style scoped>

.el-header {
  margin: 0;
  padding: 0;
  border-bottom: solid 1px #e6e6e6;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100vw;
}

.logo {
  display: block;
  width: 160px;
  height: 30px;
  background: #409EFF;
  border-radius: 3px;
  margin: 15px 20px;
}

.icon {
  display: block;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
  margin: 0 20px;  
}

.bread {
  flex-grow: 1;
  height: 60px;
  line-height: 60px;
}

.el-main {
  padding: 12px;
}

.south {
  min-height: calc(99vh - 64px);
}

/* .small {
  font-size: 13px;
} */

</style>
