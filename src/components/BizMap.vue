<template>
  <div style="height: 400px"></div>
</template>

<script>
import { createMap } from '../lib'

export default {
  setup() {
    return {}
  },

  mounted() {
    createMap(this.$el)
  },
}
</script>
