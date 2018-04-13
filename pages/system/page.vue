<template>
<section>
  <el-form :model="search" ref="search" class="search" label-width="0px" inline>
    <el-form-item prop="path">
      <el-input v-model="search.path" placeholder="路径"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input v-model="search.name" placeholder="名字"></el-input>
    </el-form-item>
    <el-form-item prop="icon">
      <el-input v-model="search.icon" placeholder="图标"></el-input>
    </el-form-item>
    <el-form-item prop="action">
      <el-input v-model="search.action" placeholder="动作"></el-input>
    </el-form-item>
    <el-form-item prop="father">
      <el-input v-model="search.father" placeholder="父菜单"></el-input>
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
      <el-button @click="treeShow()">树状浏览</el-button>
    </el-form-item>
  </el-form>

  <div v-loading.body="loading">
    <el-table :data="list" ref="list">
      <el-table-column label="路径" prop="path">
      </el-table-column>
      <el-table-column label="名字" prop="name">
      </el-table-column>
      <el-table-column label="图标" prop="icon">
      </el-table-column>
      <el-table-column label="父菜单" prop="father">
      </el-table-column>
      <el-table-column label="动作" prop="action">
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
      <el-form-item label="路径" prop="path">
        <el-input v-model="edit.path" :disabled="Boolean(edit.id)"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="edit.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="edit.icon"></el-input>
      </el-form-item>
      <el-form-item label="父菜单" prop="father">
        <el-input v-model="edit.father"></el-input>
      </el-form-item>
      <el-form-item label="动作" prop="action">
        <el-input v-model="edit.action"></el-input>
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

  <el-dialog title="树状浏览" :visible.sync="treeVisible" width="50%">
    <el-tree :data="tree" ref="tree" :props="treeProps" node-key="path"
      default-expand-all accordion highlight-current></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="treeVisible = false">关闭</el-button>
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
        path: undefined,
        name: undefined,
        icon: undefined,
        action: undefined,
        father: undefined,
        valid: undefined
      },
      list: [],
      total: 0,
      pageNumber: 1,
      pageSize: 0,
      loading: false,
      edit: {
        id: '',
        path: '',
        name: '',
        icon: '',
        action: '',
        father: '',
        valid: true
      },
      rules: {
        path: [
          { required: true, message: '请输入路径', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        icon: [
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        action: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        father: [
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ]
      },
      editVisible: false,
      treeVisible: false,
      tree: [],
      treeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted: function() {
    this.pageSize = 10
  },
  methods: {
    async treeShow() {
      const { success, data } = await fetch({
        url: '/page',
        method: 'get',
        params: { limit: 0, offset: 0 }
      })
      if (success) {
        this.tree = list2tree(data.rows)
      }
      this.treeVisible = true
    },
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
      const { success, data } = await this.$axios.$get('/page', {
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
        path: row.path,
        name: row.name,
        icon: row.icon,
        father: row.father,
        action: row.action,
        valid: Boolean(row.valid)
      })
      this.editVisible = true
    },
    async handleRowDrop(row) {
      const { success, message } = await this.$axios.$delete('/page')
      if (success) {
        this.$message.success('删除成功！')
        await this.handlePageChange()
      }
    },
    async editSubmit() {
      const valid = await this.$refs.edit.validate()
      if (valid) {
        const { success, message } = await this.$axios.$post('/page' + ((this.edit.id) ? '/' + this.edit.id : ''), this.edit)
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
