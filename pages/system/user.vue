<template>
<section>
  <el-form :model="search" ref="search" class="search" label-width="0" inline>
    <el-form-item prop="no">
      <el-input v-model="search.no" placeholder="帐号"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input v-model="search.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="search.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="mail">
      <el-input v-model="search.mail" placeholder="邮件"></el-input>
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input v-model="search.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item prop="roleCode">
      <el-input v-model="search.roleCode" placeholder="权限"></el-input>
    </el-form-item>
    <el-form-item prop="valid">
      <el-select v-model="search.valid" placeholder="有效否">
        <el-option label="是" :value="true"/>
        <el-option label="否" :value="false"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchSubmit()">查询</el-button>
      <el-button @click="searchReset()">重置</el-button>
      <el-button type="danger" @click="handleMake()">新增</el-button>
    </el-form-item>
  </el-form>

  <div v-loading.body="loading">
    <el-table :data="list" ref="list">
      <el-table-column label="帐号" prop="no">
      </el-table-column>
      <el-table-column label="姓名" prop="name">
      </el-table-column>
      <el-table-column label="密码" prop="password">
      </el-table-column>
      <el-table-column label="邮件" prop="mail">
      </el-table-column>
      <el-table-column label="手机号" prop="mobile">
      </el-table-column>
      <el-table-column label="权限" prop="roleCode">
      </el-table-column>
      <el-table-column label="有效否" prop="valid">
      </el-table-column>
      <el-table-column fixed="left" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleRowEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleRowDrop(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="total, ->, sizes, prev, pager, next, jumper" small
      @current-change="handlePageChange" @size-change="handleSizeChange"
      :current-page.sync="pageNumber" :page-size="pageSize" :total="total" :page-sizes="[5, 10, 20, 50]">
    </el-pagination>
  </div>

  <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
    <el-form :model="edit" ref="edit" :rules="rules" label-width="80px">
      <el-form-item label="ID" prop="id" v-show="edit.id">
        <span>{{edit.id}}</span>
      </el-form-item>
      <el-form-item label="帐号" prop="no">
        <el-input v-model="edit.no" :disabled="Boolean(edit.id)"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="edit.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="edit.password"></el-input>
      </el-form-item>
      <el-form-item label="邮件" prop="mail">
        <el-input v-model="edit.mail"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="edit.mobile"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="roleCode">
        <el-input v-model="edit.roleCode"></el-input>
      </el-form-item>
      <el-form-item label="有效否" prop="valid">
        <el-switch v-model="edit.valid" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editReset">取消</el-button>
      <el-button type="primary" @click="editSubmit">保存</el-button>
    </span>
  </el-dialog>

</section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      search: {
        no: undefined,
        name: undefined,
        password: undefined,
        mail: undefined,
        mobile: undefined,
        roleCode: undefined,
        valid: undefined
      },
      list: [],
      total: 0,
      pageNumber: 1,
      pageSize: 0,
      loading: false,
      edit: {
        id: '',
        no: '',
        name: '',
        password: '',
        mail: '',
        mobile: '',
        roleCode: '',
        valid: true
      },
      rules: {
        no: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        // ],
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: '^\\d{11}$', message: '正确的手机号：长度11位、数字', trigger: 'blur,change' }
        ],
        roleCode: [
          { required: true, message: '请输入权限代码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      editVisible: false
    }
  },
  mounted: function() {
    this.pageSize = 10
  },
  methods: {
    searchSubmit() {
      this.handlePageChange()
    },
    searchReset() {
      this.$refs.search.resetFields()
    },
    async handlePageChange(pageNumber) {
      if (pageNumber) {
        this.pageNumber = pageNumber
      }
      this.loading = true
      const { success, data } = await this.$axios.$get(`/user`, {
        params: {
          whe: this.search,
          lim: this.pageSize,
          off: (this.pageNumber - 1) * this.pageSize
        }
      })
      if (success) {
        this.list = data.rows
        this.total = data.count
      }
      this.loading = false
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.handlePageChange()
    },
    handleMake() {
      this.edit = {}
      this.editVisible = true
    },
    handleRowEdit(row) {
      this.edit = Object.assign({}, {
        id: row.id,
        no: row.no,
        name: row.name,
        password: row.password,
        mail: row.mail,
        mobile: row.mobile,
        roleCode: row.roleCode,
        valid: Boolean(row.valid)
      })
      this.editVisible = true
    },
    async handleRowDrop(row) {
      const { success, message } = await this.$axios.$delete(`/user/${row.id}`)
      if (success) {
        this.$message.success('删除成功！')
        await this.handlePageChange()
      }
    },
    async editSubmit() {
      const valid = await this.$refs.edit.validate()
      if (valid) {
        const { success, message } = await this.$axios.$post(`/user${this.edit.id ? '/' + this.edit.id : ''}`, this.edit)
        if (success) {
          this.$message.success('保存成功！')
          this.$refs.edit.resetFields()
          this.editVisible = false
          await this.handlePageChange()
        }
      }
    },
    editReset() {
      this.$refs.edit.resetFields()
      this.editVisible = false
    }
  }
}
</script>
