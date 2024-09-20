import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TagItem } from '@/layout/components/TagsView.vue'

export const useTagsView = defineStore('tagsView', () => {
  const visitedViews = ref([] as TagItem[])
  const selectedView = ref({} as TagItem)
  const addVisitedView = (view: TagItem) => {
    visitedViews.value.push(view)
  }
  const delVisitedView = (view: TagItem) => {
    visitedViews.value.splice(visitedViews.value.indexOf(view), 1)
  }
  const delAllVisitedViews = () => {
    visitedViews.value = []
  }
  const delOthersVisitedViews = (view: TagItem) => {
    visitedViews.value = visitedViews.value.filter(
      (item) => item.name === view.name && item.routePath === view.routePath
    )
  }
  const hasVisitedView = (view: TagItem) => {
    return visitedViews.value.some(
      (item) => item.name === view.name && item.routePath === view.routePath
    )
  }
  const updateSelectedView = (view: TagItem) => {
    selectedView.value = view
  }

  const getLeftViews = (view: TagItem) => {
    const index = visitedViews.value.findIndex(
      (item) => item.name === view.name && item.routePath === view.routePath
    )
    return visitedViews.value[index - 1]
  }
  return {
    visitedViews,
    selectedView,
    addVisitedView,
    delVisitedView,
    delAllVisitedViews,
    delOthersVisitedViews,
    hasVisitedView,
    updateSelectedView,
    getLeftViews
  }
})
