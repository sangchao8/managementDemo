import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录页
const Login = () => import('@/views/Login')
//菜单页
const Page = () => import('@/views/Page/Page')
//首页
const Home = () => import('@/views/Page/Home')
//菜单内容页
const First = () => import('@/views/Page/tableFirst')
const First2 = () => import('@/views/Page/tableFirst2')
const Second = () => import('@/views/Page/tableSecond')
const Second2 = () => import('@/views/Page/tableSecond2')
const First21= () => import('@/views/Page/tableFirst2-1')
const First22= () => import('@/views/Page/tableFirst2-2')



Vue.use(VueRouter)

// 固定的路由表
export const fixedRouter  = [
  {
    path: "/",
    name: 'Login',
  /*  redirect: '/Login',*/
    component: Login
  },
  {
    path: '/Page',
    name: 'Page',
    component: Page,
    children: [
      {
        path: '/page/Home',
        name: 'Home',
        component: Home
      },
      {
        path: '/page/tableFirst',
        component: First,
        meta: {
          title: '一级1', //菜单名称
          /*  roles: ['user', 'admin'], //当前菜单哪些角色可以看到*/
          icon: 'el-icon-info' //菜单左侧的icon图标
        },

      },
      {
        path: '/page/tableFirst2',
        component: First2,
        meta: {
          title: '一级2', //菜单名称
          /*  roles: ['user', 'admin'], //当前菜单哪些角色可以看到*/
          icon: 'el-icon-info' //菜单左侧的icon图标
        },
      },
      {
        path: '/page/tableSecond',
        component: Second,
        meta: {
          title: '二级1', //菜单名称
          /*  roles: ['user', 'admin'], //当前菜单哪些角色可以看到*/
          icon: 'el-icon-info' //菜单左侧的icon图标
        },
      },
      {
        path: '/page/tableSecond2',
        component: Second2,
        meta: {
          title: '二级2', //菜单名称
          /*  roles: ['user', 'admin'], //当前菜单哪些角色可以看到*/
          icon: 'el-icon-info' //菜单左侧的icon图标
        }
      },
      {
        path: '/page/tableFirst2-1',
        component: First21,
        meta: {
          title: '二级2-1', //菜单名称
          /*  roles: ['user', 'admin'], //当前菜单哪些角色可以看到*/
          icon: 'el-icon-info' //菜单左侧的icon图标
        }
      },
      {
        path: '/page/tableFirst2-2',
        component: First22,
        meta: {
          title: '二级2-2', //菜单名称
          /*  roles: ['user', 'admin'], //当前菜单哪些角色可以看到*/
          icon: 'el-icon-info' //菜单左侧的icon图标
        }
      },

    ]
  },

]

// 需要权限判断展示的路由
/*export const permissionRouter = [{
  path: "/page",
  component: Page,
  name: "Page",
  meta: {
    title: "案例",
    icon: "el-icon-success",
   /!* roles: ['admin', 'user']*!/
  },
  children: [
    {
      path: "/Page/tableIndex",
      name: "Table",
      component: table,
      meta: {
        title: "table案例",
        icon: "el-icon-goods",
        /!*roles: ['admin']*!/
      },
      // 三级菜单写法，对应demotable案例下边的两个菜单
      children: [{
        path: "table1",
        name: "Table1",
        component: tableFirst,
        meta: {
          title: "table1",
          icon: "el-icon-mobile-phone",
         /!* roles: ['admin']*!/

        }
      },
        {
          path: "table2",
          name: "Table2",
          component: tableSecond,
          meta: {
            title: "table2",
            icon: "el-icon-service",
          /!*  roles: ['admin']*!/
          }
        }
      ]
    },
    {
      path: "tree",
      name: "Tree",
      component: tree,
      meta: {
        title: "树形菜单",
        icon: "el-icon-upload",
       /!* roles: ['user', 'admin']*!/
      }
    }
  ]
}]*/

const router = new VueRouter({
  routes:fixedRouter,
    scrollBehavior (to, from, savedPosition) {
        console.log('to: ', to)
        console.log('from: ', from)
        if (savedPosition) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('savedPosition', savedPosition)
                    resolve(savedPosition)
                }, 500)
            })
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router
