<template>
<el-dialog title="修改密码" :visible.sync="isVisible" @close="onClose">
  <el-form :model="formPwd" label-width="120px" ref="formPwd" :rules="rules">
    <el-form-item label="老密码" prop="oldPwd">
      <el-input type="password" v-model="formPwd.oldPwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input type="password" v-model="formPwd.newPwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="重复新密码" prop="cfmPwd">
      <el-input type="password" v-model="formPwd.cfmPwd" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="onReset">取消</el-button>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
</el-dialog>
</template>

<script>

export default {
  name: 'chgPass',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formPwd.cfmPwd !== '') {
          this.$refs.formPwd.validateField('cfmPwd')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formPwd.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formPwd: {
        oldPwd: '',
        newPwd: '',
        cfmPwd: ''
      },
      rules: {
        oldPwd: { type: 'string', message: '旧密码不能为空！', required: true, trigger: 'blur' },
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        cfmPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const valid = await this.$refs.formPwd.validate()
      if (valid) {
        const { success, message } = await this.$axios.$post('/password', {
          no: this.$store.user.user.no || '',
          oldPwd: this.formPwd.oldPwd,
          newPwd: this.formPwd.newPwd
        })
        this.$refs.formPwd.resetFields()
        if (success) {
          this.$message.success(message)
          this.$emit('update:isVisible', false)
        }
      }
    },
    onReset() {
      this.$refs.formPwd.resetFields()
      this.$emit('update:isVisible', false)
    },
    onClose() {
      this.$emit('update:isVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

