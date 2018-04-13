<template>
<section>
  <el-form :model="search" ref="search" class="search" label-width="0px" inline>
    <el-form-item prop="pagePath">
      <el-input v-model="search.pagePath" placeholder="页面路径"></el-input>
    </el-form-item>
    <el-form-item prop="roleCode">
      <el-input v-model="search.roleCode" placeholder="权限代码"></el-input>
    </el-form-item>
    <el-form-item prop="allow">
      <el-input v-model="search.allow" placeholder="允许操作"></el-input>
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
      <el-table-column label="页面路径" prop="pagePath">
      </el-table-column>
      <el-table-column label="权限代码" prop="roleCode">
      </el-table-column>
      <el-table-column label="允许操作" prop="allow">
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
      <el-form-item label="页面路径" prop="pagePath">
        <el-input v-model="edit.pagePath" :disabled="Boolean(edit.id)"></el-input>
      </el-form-item>
      <el-form-item label="权限代码" prop="roleCode">
        <el-input v-model="edit.roleCode" :disabled="Boolean(edit.id)"></el-input>
      </el-form-item>
      <el-form-item label="允许操作" prop="allow">
        <el-input v-model="edit.allow"></el-input>
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
        pagePath: undefined,
        roleCode: undefined,
        allow: undefined,
        valid: undefined
      },
      list: [],
      total: 0,
      pageNumber: 1,
      pageSize: 0,
      loading: false,
      edit: {
        id: '',
        pagePath: '',
        roleCode: '',
        allow: '',
        valid: true
      },
      rules: {
        pagePath: [
          { required: true, message: '请输入页面路径', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请输入权限代码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        allow: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
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
      const { success, data } = await this.$axios.$get(`/power`, {
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
        pagePath: row.pagePath,
        roleCode: row.roleCode,
        allow: row.allow,
        valid: Boolean(row.valid)
      })
      this.editVisible = true
    },
    async handleRowDrop(row) {
      const { success, message } = await this.$axios.$delete(`/power/${row.id}`)
      if (success) {
        this.$message.success('删除成功！')
        await this.handlePageChange()
      }
    },
    async editSubmit() {
      const valid = await this.$refs.edit.validate()
      if (valid) {
        const { success, message } = await this.$axios.$post('/power' + ((this.edit.id) ? '/' + this.edit.id : ''), this.edit)
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

<style lang="scss" scoped>
.search {
  .el-input, .el-select {
    width: 200px;
  }
}
.el-pagination {
  margin-top: 10px;
}
</style>
