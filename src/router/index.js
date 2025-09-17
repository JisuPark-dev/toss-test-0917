import { createRouter, createWebHistory } from 'vue-router'
import TossPayment from '../views/toss/TossPayment.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/toss/test',
      name: 'toss-payment',
      component: TossPayment
    },
    {
      path: '/success',
      name: 'payment-success',
      component: () => import('../views/toss/PaymentSuccess.vue')
    },
    {
      path: '/fail',
      name: 'payment-fail',
      component: () => import('../views/toss/PaymentFail.vue')
    }
  ]
})

export default router