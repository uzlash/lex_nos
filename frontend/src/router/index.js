import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: '/view/:id',
    name: 'Map Id',
    props: true,
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "Map Id" */ '../views/MapViewId.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "User" */ '../views/Users.vue'),
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: '/centre',
    name: 'Centre',
    component: () => import(/* webpackChunkName: "Centre" */ '../views/Centres.vue'),
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: '/centremanager',
    name: 'Centre Manager',
    component: () => import(/* webpackChunkName: "Centre" */ '../views/CentreManager.vue'),
    meta: {
      showHeader: true,
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: {
      showHeader: false,
      requiresAuth: false,
    },
  }
]

const router = new VueRouter({
  routes
})

export default router
