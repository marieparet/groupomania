import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../middleware/auth'
import VueRouteMiddleware from 'vue-route-middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: () => import('../views/Posts.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/posts/:postId',
    name: 'OnePost',
    component: () => import('../views/OnePost.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/profile/:userId',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: {
      middleware: auth
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(VueRouteMiddleware())

export default router
