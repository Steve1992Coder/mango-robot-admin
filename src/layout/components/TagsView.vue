<script setup lang="ts">
import { useTagsView } from '@/stores/visitedViews'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CircleClose } from '@element-plus/icons-vue'

const visitedViewsStore = useTagsView()
const { visitedViews, selectedView } = storeToRefs(visitedViewsStore)
const route = useRoute()
const router = useRouter()
onMounted(() => {
  const indexTagView = { name: '首页', routePath: '/index' } as TagItem
  visitedViewsStore.addVisitedView(indexTagView)
  if (route.path !== '/index' && route.name !== '首页') {
    const userTag = { name: route.meta['title'], routePath: route.path } as TagItem
    visitedViewsStore.addVisitedView(userTag)
    visitedViewsStore.updateSelectedView(userTag)
  } else {
    visitedViewsStore.updateSelectedView(indexTagView)
  }
})

function isActive(route: TagItem) {
  return route.routePath === selectedView.value.routePath
}

function closeSelectedTag(tag: TagItem) {
  const leftTag = visitedViewsStore.getLeftViews(tag)
  visitedViewsStore.updateSelectedView(leftTag)
  router.push(leftTag.routePath)
  visitedViewsStore.delVisitedView(tag)
}

function tagClick(tag: TagItem) {
  visitedViewsStore.updateSelectedView(tag)
}

function isIndex(tag: TagItem) {
  return tag.name === '首页' && tag.routePath === '/index'
}

export interface TagItem {
  name: string
  routePath: string
}
</script>

<template>
  <div class="tags-view-container">
    <el-scrollbar :vertical="false">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.routePath"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.routePath }"
        class="tags-view-item"
        @click="tagClick(tag)"
      >
        <span>{{ tag.name }}</span>
        <span v-if="!isIndex(tag)" @click.prevent.stop="closeSelectedTag(tag)" class="tag-close">
          &#x2297;
        </span>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 50px;
  width: 100%;

  .tags-view-item {
    display: inline-block;
    position: relative;
    height: 40px;
    line-height: 40px;
    border: 1px solid #d8dce5;
    border-radius: 8px;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 16px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      background-color: var(--el-color-primary);
      color: #fff;
      border-color: var(--el-color-primary);
    }
  }
}
</style>
