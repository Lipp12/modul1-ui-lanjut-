import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/App.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { breadcrumb: 'Home' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: { breadcrumb: 'About' }
      },
      {
        path: 'browse',
        name: 'browse',
        component: () => import('@/views/Browse.vue'),
        meta: { breadcrumb: 'Browse' },
        redirect: '/browse/events',
        children: [
          {
            path: 'events',
            name: 'events',
            component: () => import('@/views/EventList.vue'),
            meta: { breadcrumb: 'Event List' }
          },
          {
            path: 'events/:id',
            name: 'event-detail',
            component: () => import('@/views/EventDetail.vue'),
            meta: { breadcrumb: 'Event Detail' }
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/views/Category.vue'),
            meta: { breadcrumb: 'Category' }
          }
        ]
      },
      {
        path: 'auth',
        name: 'auth',
        component: () => import('@/views/Auth.vue'),
        meta: { breadcrumb: 'Authentication' }
      },
      {
        path: 'login',
        redirect: { name: 'auth', query: { mode: 'login' } }
      },
      {
        path: 'register',
        redirect: { name: 'auth', query: { mode: 'register' } }
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/Contact.vue'),
        meta: { breadcrumb: 'Contact' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router