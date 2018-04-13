<template>
  <el-select :placeholder="placeholder" :value="value" @input="change($event)"
    filterable remote :remote-method="remoteMethod" :loading="isLoading">
    <el-option v-for="item in filter" :key="item.code" :label="item.name" :value="item.code">
      <span style="float: left">{{ item.code }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "dSelect",
  props: [
    'value', 'placeholder'
  ],
  data() {
    return {
      filter: [],
      isLoading: false
    }
  },
  methods: {
    async remoteMethod(query) {
      if (query.length >= 1) {
        this.isLoading = true;
          const { success, data } = await this.$axios.$get(`/role1/kv`, {
            params: {
              whe: query,
              lim: this.pageSize,
              off: (this.pageNumber - 1) * this.pageSize
            }
          })
          this.isLoading = false;
        this.filter = data
      } else {
        this.filter = []
      }
    },
    change: function(val) {
      this.$emit('input', val);
    }
  }
}
</script>

<style scoped>
/* .el-select
{
  width: 200px;
} */
</style>
