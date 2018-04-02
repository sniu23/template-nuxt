<template>
<section class="box">
  <div class="top"></div>

  <div class="content">
    
    
    <el-row>
      <el-col :span="6"><i class="fa fa-exclamation-triangle"></i></el-col>
      <el-col :span="18">
        <div class="title" v-if="error.statusCode === 404">页面未找到！</div>
        <div class="title" v-else>服务器内部错误</div>
        <div class="info">{{error.message || 'unknown error happen!'}}</div>
      </el-col>
    </el-row>
    <router-link to="/">
      <el-button type="text" style="float:right" size="small">返回首页</el-button>      
    </router-link>
  </div>

  <el-alert type="info" class="copyright"
    title="Copyright 2018 某某某出品"
    :closable="false" center>
  </el-alert>

</section> 
</template>

<script>
export default {
  // layout: 'face',
  props: ['error']
}
</script>

<style scoped>
.box {
  background-image: url(~/static/rebc.gif);
	background-color: #f5f5f5;
  display:flex; 
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.content {
  width: 360px;
  margin: 40px 0;
}

i {
  color: #F56C6C;
  font-size: 64px;
}

title {
  color: #303133;
  font-size: 20px;
  font-weight: bolder;
}

.info {
  color: #606266;
}

.copyright {
  height: 80px;
}

</style>
