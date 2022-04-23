import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
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


export default router