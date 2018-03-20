<template>
  <section>
    <i-button @click="show">Click me!</i-button>
    <Modal v-model="visible" title="Welcome">Welcome to iView</Modal>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show: function () {
      this.visible = true
    }
  }
}
</script>
