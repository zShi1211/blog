import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/Article.vue'),
  },
  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: () => import('@/views/ArticleDetail.vue'),
  },
  {
    path: '/debrisWord',
    name: 'debrisWord',
    component: () => import('@/views/DebrisWord.vue')
  },
  {
    path: '/leaveWord',
    name: 'leaveWord',
    component: () => import('@/views/LeaveWord.vue')
  },
  {
    path: '/lookSun',
    name: 'lookSun',
    component: () => import('@/views/LookSun.vue')
  },
  {
    path: '/self',
    name: 'self',
    component: () => import('@/views/Self.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
