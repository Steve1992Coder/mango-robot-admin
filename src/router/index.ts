import LayoutIndexVue from '@/layout/LayoutIndex.vue'
import LoginViewVue from '@/views/LoginView.vue'
import ApiTest from '@/views/test/ApiTest.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DynamicForm from '@/views/test/DynamicForm.vue'
import DraggPlusTest from '@/views/test/DraggPlusTest.vue'
import CodeMirror from '@/views/test/CodeMirror.vue'
import HomePageView from '@/views/HomePageView.vue'
import AntvG6 from '@/views/test/AntvG6.vue'
import Scss from '@/views/test/Scss.vue'

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
          path: '/test',
          meta: { title: '测试', icon: 'Tools' },
          children: [
            {
              path: 'api',
              component: ApiTest,
              meta: { title: '接口', icon: 'MagicStick' }
            },
            {
              path: 'draggable',
              component: DraggPlusTest,
              meta: { title: '拖拽', icon: 'Grid' }
            },
            {
              path: 'dynamicForm',
              component: DynamicForm,
              meta: { title: '动态表单', icon: 'Edit' }
            },
            {
              path: 'codeMirror',
              component: CodeMirror,
              meta: { title: '代码编辑器', icon: 'Edit' }
            },
            {
              path: 'antvG6',
              component: AntvG6,
              meta: { title: 'AntvG6', icon: 'Edit' }
            },
            {
              path: 'scss',
              component: Scss,
              meta: { title: 'Scss', icon: 'Edit' }
            }
          ]
        }
      ]
    }
  ]
})

export default router
