import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/login/LoginLogin.vue'
import HomeEnter from '../views/home/HomePage.vue'
import Register from '../views/LoginRigster.vue'
import { ElMessage } from 'element-plus'
// import Reg from '../views/LoginHome.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/enter',
      name: 'enter',
      component: HomeEnter
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // {
    //   path: '/reg',
    //   name: 'reg',
    //   component: Reg
    // }
  ]
})

// 导航守卫
router.beforeEach((to, from ,next) => {
  if (to.path === '/register') return next()
  if (to.path === '/reg') return next()
  if (to.path === '/') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr ){
    ElMessage({ type:'error', message: '登录失败'})
    return next('/')
  }
  next()
})
export default router
