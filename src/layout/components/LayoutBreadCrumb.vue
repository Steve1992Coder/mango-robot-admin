<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in state.levelList" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { type RouteLocationMatched, useRoute } from 'vue-router'

const route = useRoute()
const state = reactive({
  levelList: [] as RouteLocationMatched[]
})
watch(route, () => {
  getBreadcrumb()
})
onMounted(() => {
  getBreadcrumb()
})

function getBreadcrumb() {
  state.levelList = route.matched.filter(item => item.meta && item.meta.title)
}
</script>
<style scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>