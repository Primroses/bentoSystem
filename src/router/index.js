const index = r => require.ensure([], () => r(require('@/views/index')), "index")
const login = r => require.ensure([], () => r(require('@/views/login')), "login")
const home = r => require.ensure([], () => r(require('@/views/home')), "home")
const order = r => require.ensure([], () => r(require('@/views/order')), "order")
const manager = r => require.ensure([], () => r(require('@/views/manager')), "manager")

const demo = r => require.ensure([], () => r(require('@/components/demo')), "demo")
const but = r => require.ensure([], () => r(require('@/components/but')), "but")
const map = r => require.ensure([], () => r(require('@/components/map')), "map")
const headNav= r => require.ensure([], () => r(require('@/components/headNav')), "headNav")
const routes = [
  {
    path: "/",
    component: index,
    meta: {
      keepAlive: true// 不需要缓存
    }
  },
  {
    path: "/login",
    component: login,
  },
  {
    path :'/map',
    component:map
  },
  {
    path:'/but',
    component:but
  },
  {
    path:'/demo',
    component:demo
  },
  {
    path:'/headNav',
    component:headNav
  },
  {
    path:'/home',
    component:home
  },
  {
    path : '/order',
    component:order
  },
  {
    path : '/manager',
    component:manager
  }
]

export default routes