<template>
  <el-container class="layout">
    <el-header class="header">
      <LayoutHeader />
    </el-header>
    <el-container>
      <el-aside :style="{ width: isCollapse ? '64px' : '200px' }">
        <LayoutLeft
          :isCollapse="isCollapse"
          @triggleCollapse="isCollapse = !isCollapse"
        ></LayoutLeft>
      </el-aside>
      <el-container
        class="main"
        :style="{ width: isCollapse ? 'calc(100vw - 64px)' : 'calc(100vw - 200px)' }"
      >
        <el-header>
          <layoutBreadCrumb />
        </el-header>
        <el-main>
          <el-card>
            <RouterView />
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutLeft from '@/layout/components/LayoutLeft.vue'
import LayoutBreadCrumb from '@/layout/components/LayoutBreadCrumb.vue'

const isCollapse = ref(false)
</script>

<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
}

.header {
  background-color: var(--el-color-primary);
  border-bottom: 1px solid var(--el-border-color);
}

.main {
  border-left: 1px solid var(--el-border-color);
}

.el-header {
  height: 50px;
}

.el-main {
  height: calc(100vh - 100px);
  background-color: #f2f3f5;
}

.el-aside {
  width: 200px;
  height: calc(100vh - 50px);
}
</style>
