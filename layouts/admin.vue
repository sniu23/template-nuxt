<template>
  <div class="box">
    <layout>
      <i-header class="north">
        <i-menu class="topMenu" mode="horizontal" active-name="help">
          <div class="logo"></div>
          <breadcrumb class="bread">
            <breadcrumb-item>主页</breadcrumb-item>
            <breadcrumb-item>Components</breadcrumb-item>
            <breadcrumb-item>Layout</breadcrumb-item>
          </breadcrumb>
          <div class="user">
            <menu-item name="help">
              <icon type="ios-navigate"></icon>
              帮助
            </menu-item>
            <menu-item name="user">
              <icon type="ios-keypad"></icon>
              用户
            </menu-item>
          </div>
        </i-menu>
      </i-header>
      <layout class="south">
        <sider hide-trigger class="west">
          <i-menu accordion theme="light" width="auto">
            <submenu name="1">
              <template slot="title">
                <icon type="ios-navigate"></icon>
                <span class="small">菜单 1</span>
              </template>
              <menu-item name="1-1"><span class="small">选项 1</span></menu-item>
              <menu-item name="1-2"><span class="small">选项 2</span></menu-item>
              <menu-item name="1-3"><span class="small">选项 3</span></menu-item>
            </submenu>
            <submenu name="2">
              <template slot="title">
                <icon type="ios-keypad"></icon>
                <span class="small">菜单 2</span>
              </template>
              <menu-item name="2-1"><span class="small">选项 1</span></menu-item>
              <menu-item name="2-2"><span class="small">选项 2</span></menu-item>
            </submenu>
            <submenu name="3">
              <template slot="title">
                <icon type="ios-analytics"></icon>
                <span class="small">菜单 3</span>
              </template>
              <menu-item name="3-1"><span class="small">选项 1</span></menu-item>
              <menu-item name="3-2"><span class="small">选项 2</span></menu-item>
            </submenu>
          </i-menu>
        </sider>
        <layout class="east">
          <i-content>
            <nuxt/>
          </i-content>
        </layout>
      </layout>
    </layout>
  </div>
</template>

<style scoped>
.north {
  background: #fff;
  padding: 0;
}
.topMenu {
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100vw;
}
.logo {
  width: 160px;
  height: 30px;
  background: #2d8cf0;
  border-radius: 3px;
  margin-left: 20px;
  margin-top: 15px;
}
.bread {
  margin-left: 20px;
}
.user {
  align-self: flex-end;
  width: 200px;
  margin: 0 auto;
  margin-right: 20px;
}
.south {
  min-height: calc(99vh - 64px);
}
.west {
  background: #fff;     
}
.small {
  font-size: 13px;
}
.east {
  padding: 12px;
  background: #fff;
}
</style>
