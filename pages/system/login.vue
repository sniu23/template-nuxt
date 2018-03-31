<template>
  <el-form ref="loginFrm" :model="login" :rules="ruleInline" inline>
    <el-form-item prop="no">
      <el-input type="text" v-model="login.no" placeholder="UserNo">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="login.password" placeholder="Password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Signin</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  // layout: 'admin'
  data () {
    return {
      login: {
        no: '',
        password: ''
      },
      ruleInline: {
        no: [
          { required: true, message: '请Please fill in the user no.', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.$refs['loginFrm'].validate(async (valid) => {
        if (!valid) {
          this.$Message.error('Fail!');
        }
        await this.$store.dispatch('LOGIN', this.login)
        this.$router.push('/')
      })
    }
  }
}
</script>
