<template>
<section class="box">
  <div class="top"></div>

  <div class="content">
    <div class="title-website">标题文字在这里</div>
    <nuxt/>
    <el-alert type="warning" class="explorer" size="small"
      title="推荐使用chrome、firefox等现代浏览器。"
      :closable="false" center show-icon>
    </el-alert>
  </div>

  <el-alert type="info" class="copyright"
    title="Copyright 2018 某某某出品"
    :closable="false" center>
  </el-alert>

</section>
</template>

<script>
export default {
  name: 'face'
}
</script>

<style scoped>
.box {
  background-image: url(~/static/rebc.gif);
	background-color: #f5f5f5;
  display:flex; 
  flex-direction: column;
  justify-content: space-between;
  align-items:center;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.content {
  width: 360px;
  min-height: 480px;
}

.title-website {
  text-align: center;
  color: #409EFF;
  font-size: 32px;
  font-weight: bolder;
  margin: 40px 0;
}
.explorer {
  margin: 40px 0;
}

.copyright {
  height: 80px;
}

</style>
