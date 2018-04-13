<template>
<section>
  <el-form :model="search" ref="search" class="search" label-width="0px" inline>
    <el-form-item prop="code">
      <el-input v-model="search.code" placeholder="代码"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input v-model="search.name" placeholder="名字"></el-input>
    </el-form-item>
    <el-form-item prop="valid">
      <el-select v-model="search.valid" placeholder="有效否">
        <el-option label="是" :value="true"/>
        <el-option label="否" :value="false"/>
      </el-select>
    </el-form-item>
    
    <el-form-item prop="some">
      <!-- <el-select v-model="search.some" placeholder="测试" 
        filterable remote :remote-method="getKV" :loading="selectLoading">
        <el-option v-for="item in filter" :key="item.code" :label="item.name" :value="item.code">
          <span style="float: left">{{ item.code }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
        </el-option>
      </el-select> -->
      <d-select v-model="search.some" placeholder="测试"></d-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="searchSubmit()">查询</el-button>
      <el-button @click="searchReset()">重置</el-button>
      <el-button type="danger" @click="handleMake()">新增</el-button>
    </el-form-item>
  </el-form>

  <div v-loading.body="loading">
    <el-table :data="list" ref="list">
      <el-table-column label="代码" prop="code">
      </el-table-column>
      <el-table-column label="名字" prop="name">
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
      <el-form-item label="代码" prop="code">
        <el-input v-model="edit.code" :disabled="Boolean(edit.id)"></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="edit.name"></el-input>
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
// import mixinKeyVal from '~/components/getKV.js'
import DSelect from '~/components/dSelect.vue'

export default {
  layout: 'admin',
  // mixins: [mixinKeyVal],
  components: {
    DSelect
  },
  data() {
    return {
      search: {
        code: undefined,
        name: undefined,
        some: undefined,
        valid: undefined
      },
      filter: [],
      selectLoading: false,
      list: [],
      total: 0,
      pageNumber: 1,
      pageSize: 0,
      loading: false,
      edit: {
        id: '',
        code: '',
        name: '',
        valid: true
      },
      rules: {
        code: [
          { required: true, message: '请输入代码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
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
    // async remoteMethod(query) {
    //   if (query.length >= 1) {
    //     this.selectLoading = true;
    //       this.selectLoading = false;
    //       const { success, data } = await this.$axios.$get(`/role1/kv`, {
    //         params: {
    //           whe: query,
    //           lim: this.pageSize,
    //           off: (this.pageNumber - 1) * this.pageSize
    //         }
    //       })
    //     this.filter = data
    //   } else {
    //     this.filter = []
    //   }
    // },
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
      const { success, data } = await this.$axios.$get(`/role`, {
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
      this.edit = Object.assign({}, { id: row.id, code: row.code, name: row.name, valid: Boolean(row.valid) })
      this.editVisible = true
    },
    async handleRowDrop(row) {
      const { success, message } = await this.$axios.$delete(`/role/${row.id}`)
      if (success) {
        this.$message.success('删除成功！')
        await this.handlePageChange()
      }
    },
    async editSubmit() {
      const valid = await this.$refs.edit.validate()
      if (valid) {
        const { success, message } = await this.$axios.$post(`/role${((this.edit.id) ? '/' + this.edit.id : '')}`, this.edit)
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
