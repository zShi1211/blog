import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'SHIISME'
    }
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/Article.vue'),
    meta: {
      title: 'SHIISME|文章'
    }
  },
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: () => import('@/views/ArticleDetail.vue'),
  },
  {
    path: '/debrisWord',
    name: 'debrisWord',
    component: () => import('@/views/DebrisWord.vue'),
    meta: {
      title: 'SHIISME|碎语'
    }
  },
  {
    path: '/leaveWord',
    name: 'leaveWord',
    component: () => import('@/views/LeaveWord.vue'),
    meta: {
      title: 'SHIISME|留言'
    }
  },
  {
    path: '/self',
    name: 'self',
    component: () => import('@/views/Self.vue'),
    meta: {
      title: 'SHIISME|是我'
    }
  },
  {
    path: '*',
    component: () => import('@/views/404.vue'),
    meta: {
      title: 'SHIISME|迷路'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

export default router
