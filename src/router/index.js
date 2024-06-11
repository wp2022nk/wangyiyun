import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemMusic from '../views/ItemMusicView.vue'
import store from '@/store/index'
//路由
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    //点击发现好歌单跳转歌单页面
    path: '/itemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusicView')
  },
  {
    //点击搜索跳转搜索界面
        path: '/search',
        name: 'search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SearchView.vue')
    },
    //登录界面
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    //我的 界面
    {
        path: '/userInfo',
        name: 'userinfo',
        beforeEnter: (to, from, next) => {
            if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
                next()
            } else {
                next('/login')
            }
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "userinfo" */ '../views/UserInfo.vue')
    },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
