
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'Home',
      path:'/home',
      component: () => import('./Home.vue')
    },
    {
      name: 'Login',
      path:'/login',
      component: () => import('./Login.vue')
    }
  ]
})
// const routes = createWebHashHistory()

export default router