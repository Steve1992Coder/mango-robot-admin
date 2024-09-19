<script setup lang="ts">
import { useTagsView } from '@/stores/visitedViews'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const visitedViewsStore = useTagsView()
const { visitedViews, selectedView } = storeToRefs(visitedViewsStore)
const route = useRoute()
onMounted(() => {
  const userTag = { name: route.meta['title'], routePath: route.path } as TagItem
  visitedViewsStore.addVisitedView(userTag)
  visitedViewsStore.updateSelectedView(userTag)
})

function isActive(route: TagItem) {
  return route.routePath === selectedView.value.routePath
}

function closeSelectedTag(tag: TagItem) {
  visitedViewsStore.delVisitedView(tag)
}

function tagClick(tag: TagItem) {
  visitedViewsStore.updateSelectedView(tag)
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
        {{ tag.name }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
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
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;

      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
