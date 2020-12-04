import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/axios_demo',
    component: () => import('../views/AxiosDemo')
  }
]

const router = new VueRouter({
  routes
})

export default router
