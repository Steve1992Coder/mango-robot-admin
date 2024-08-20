<template>
  <div class="menu">
    <el-scrollbar>
      <el-menu
        :default-active="userPath"
        :router="false"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <template v-for="route in routeOpts" :key="route.path">
          <el-menu-item v-if="!route.children && route.meta" :index="route.path" @click="menuItemClick(route)">
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
              @click="menuItemClick(route, childRoute)"
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
import { reactive } from 'vue'
import router from '@/router'
import { useRoute, type RouteRecordRaw } from 'vue-router'
import { useTagsView } from '@/stores/visitedViews'
import type { TagItem } from '@/layout/components/TagsView.vue'

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


const visitedViewsStore = useTagsView()
const menuItemClick = (route: RouteRecordRaw, childRoute?: RouteRecordRaw) => {
  let target = route.path
  let name = route.meta?.title
  if (childRoute) {
    target = route.path + '/' + childRoute.path
    name = childRoute.meta?.title
  }
  router.push(target)
  const tagItem = {name, routePath: target} as TagItem
  visitedViewsStore.updateSelectedView(tagItem)
  if (visitedViewsStore.hasVisitedView(tagItem)) {
    return;
  }
  visitedViewsStore.addVisitedView(tagItem)
}
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
