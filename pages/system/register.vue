<template>
<section>
  <el-tabs value="first">
    <el-tab-pane label="注册" name="first">
      <el-form :model="formRegister" ref="formRegister" label-position="left" class="box-login" size="medium" :rules="rules">
        <el-form-item prop="no">
          <el-input v-model="formRegister.no" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="formRegister.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formRegister.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          <el-input v-model="formRegister.mail" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="formRegister.mobile" placeholder="11位手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRegister" style="width: 100%">注册</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <router-link to="/system/login">
    <el-button type="text" style="float:right" size="small">使用已有帐号登录</el-button>      
  </router-link>
</section>
</template>

<script>

export default {
  layout: 'face',
  data: function() {
    return {
      formRegister: {
        no: '',
        name: '',
        password: '',
        mail: '',
        mobile: ''
      },
      rules: {
        no: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: '^\\d{11}$', message: '正确的手机号：长度11位、数字', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    async onRegister() {
      const valid = await this.$refs.formRegister.validate()
      if (valid) {
        const { success } = await this.$axios.$post('/register', this.formRegister)
        if (success) {
          this.$message({
            message: '注册成功！',
            type: 'success',
            duration: 5 * 1000
          })
          this.$router.push({ path: '/login' })
        }
      }
    }
  }
}
</script>
