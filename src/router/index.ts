import LayoutIndexVue from '@/layout/LayoutIndex.vue'
import LoginViewVue from '@/views/LoginView.vue'
import ApiTest from '@/views/template/ApiTest.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DynamicForm from '@/views/template/DynamicForm.vue'
import DraggPlusTest from '@/views/template/DraggPlusTest.vue'
import CodeMirror from '@/views/template/CodeMirror.vue'
import HomePageView from '@/views/HomePageView.vue'
import AntvG6 from '@/views/template/AntvG6.vue'
import Scss from '@/views/template/Scss.vue'
import QueryTable from '@/views/template/QueryTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginViewVue },
    {
      path: '/',
      name: 'menu',
      component: LayoutIndexVue,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: HomePageView,
          meta: { title: '首页', icon: 'HomeFilled' }
        },
        {
          path: '/template',
          meta: { title: '模板', icon: 'Document' },
          children: [
            {
              path: 'api',
              component: ApiTest,
              meta: { title: '调用接口', icon: 'MagicStick' }
            },
            {
              path: 'queryTable',
              component: QueryTable,
              meta: { title: '查询表格', icon: 'Search' }
            },
            {
              path: 'dynamicForm',
              component: DynamicForm,
              meta: { title: '动态表单', icon: 'Edit' }
            },
            {
              path: 'draggable',
              component: DraggPlusTest,
              meta: { title: '拖拽', icon: 'Grid' }
            },
            {
              path: 'codeMirror',
              component: CodeMirror,
              meta: { title: '代码编辑器', icon: 'EditPen' }
            },
            {
              path: 'antvG6',
              component: AntvG6,
              meta: { title: 'AntvG6', icon: 'Histogram' }
            },
            {
              path: 'scss',
              component: Scss,
              meta: { title: 'Scss', icon: 'Sugar' }
            }
          ]
        }
      ]
    }
  ]
})

export default router
