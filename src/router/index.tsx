import Login from '@/pages/Login/index'
import Register from '@/pages/Register/index'
import Detail from '@/pages/detail'
import Home from '@/pages/home/index'
import { UserOutlined } from '@ant-design/icons'

import AccountLayout from '@/layouts/Account/index'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'

export const routes: RouteConfig[] = [
  {
    path: '/home',
    component: Home,
    meta: {
      icon: UserOutlined,
      title: 'Home',
    },
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      hidden: true,
      title: 'Detail',
      activeMenu: '/home',
    },
  },
  {
    path: '/work',
    component: Home,
    meta: {
      icon: UserOutlined,
      title: 'Work',
    },
  },
  {
    path: '/account',
    component: AccountLayout,
    name: 'Account',
    auth: false,
    routes: [
      {
        path: '/account/login',
        exact: true,
        component: Login,
        auth: true,
      },
      {
        path: '/account/register',
        exact: true,
        component: Register,
        auth: true,
      },
      {
        path: '*',
        render: () => <Redirect to="/account/login"></Redirect>,
      },
    ],
  },
]
