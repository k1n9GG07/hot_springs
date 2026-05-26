import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/cabins',
      name: 'cabins',
      component: () => import('@/views/CabinsView.vue')
    },
    {
      path: '/booking/:cabinId',
      name: 'booking',
      component: () => import('@/views/BookingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const isLoggedIn = !!user
  const isAdmin = user?.role === 'admin'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' })
  } else if (to.meta.guestOnly && isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
