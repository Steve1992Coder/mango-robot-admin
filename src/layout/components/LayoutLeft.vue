<template>
  <div class="menu">
    <el-scrollbar>
      <el-menu
        :default-active="userPath"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <template v-for="route in routeOpts" :key="route.path">
          <el-menu-item v-if="!route.children && route.meta" :index="route.path">
            <el-icon>
              <component :is="route.meta.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ route.meta && route.meta.title }}</span>
            </template>
          </el-menu-item>
          <el-sub-menu v-else-if="route.children && route.meta" :index="route.path">
            <template #title>
              <el-icon>
                <component :is="route.meta.icon"></component>
              </el-icon>
              <span>{{ route.meta['title'] }}</span>
            </template>
            <el-menu-item
              v-for="childRoute in route.children"
              :index="route.path + '/' + childRoute.path"
              :key="childRoute.path"
            >
              <template #title>
                <el-icon>
                  <component :is="childRoute.meta && childRoute.meta.icon"></component>
                </el-icon>
                <span>{{ childRoute.meta && childRoute.meta.title }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
  <div class="fold-unfold" @click="triggleCollapse">
    <el-icon :size="25">
      <Expand v-if="isCollapse" />
      <Fold v-else />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import router from '@/router'
import { useRoute, type RouteRecordRaw } from 'vue-router'

// menuCollapse
defineProps({
  isCollapse: Boolean
})
const emit = defineEmits(['triggleCollapse'])

function triggleCollapse() {
  emit('triggleCollapse', 'triggleCollapse isclick')
}

const routeOpts = reactive(
  router.options.routes.filter((route) => route.path === '/')[0].children as RouteRecordRaw[]
)
const userPath = useRoute().path
</script>
<style scoped>
.menu {
  height: calc(100% - 50px);
  overflow: auto;
}

.el-menu {
  border: 0;
}

.fold-unfold {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--el-border-color);
}
</style>
