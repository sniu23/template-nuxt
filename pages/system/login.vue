<template>
<section>
  <el-tabs value="first">
    <el-tab-pane label="帐号登录" name="first">
      <el-form :model="formSign" ref="formSign" :rules="rules" label-position="left" class="box-login" size="medium">
        <el-form-item prop="no">
          <el-input v-model="formSign.no" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formSign.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="onSignIn" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <router-link to="/system/register">
    <el-button type="text" style="float:right" size="small">没有帐号，注册新帐号</el-button>      
  </router-link>
</section>
</template>

<script>

export default {
  layout: 'face',
  data: function() {
    return {
      formSign: {
        no: '',
        password: ''
      },
      rules: {
        no: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSignIn() {
      this.$refs['formSign'].validate(async (valid) => {
        if (!valid) {
          this.$message.error('登录失败!');
        }
        await this.$store.dispatch('LOGIN', this.formSign)
        this.$router.push('/')
      })
    }
  }
}
</script>
