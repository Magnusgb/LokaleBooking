import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import Bekraftelse from '../views/Bekraftelse.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IndexView',
      component: IndexView
    },
    {
      path: '/Bekraftelse',
      name: 'Bekraftelse',
      component: () => import('../views/Bekraftelse.vue')
    },
    
    
    
  ]
})

export default router
