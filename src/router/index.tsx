import Login from '@/pages/login'
import Register from '@/pages/register'
import Index from '@/pages/index'
import Home from '@/pages/home/index'

import Detail from '@/pages/detail'
import Table from '@/pages/table'

import { UserOutlined } from '@ant-design/icons'

import AccountLayout from '@/layouts/Account/index'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'

export const routes: RouteConfig[] = [
  {
    path: '/table',
    component: Table,
    meta: {
      hidden: true,
      title: 'Table',
      activeMenu: '/table',
      auth: true,
    },
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      hidden: true,
      title: 'Detail',
      activeMenu: '/home',
      auth: true,
    },
  },
  {
    path: '/work',
    component: Home as any,
    meta: {
      icon: UserOutlined,
      title: 'Work',
      auth: true,
    },
  },
  {
    path: '/',
    component: Home as any,
    meta: {
      auth: true,
      title: 'Home',
    },
    routes: [
      {
        path: '/',
        component: Index as any,
        name: '',
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: '/account',
    component: AccountLayout,
    name: 'Account',
    meta: {
      auth: false,
    },
    routes: [
      {
        path: '/account/login',
        exact: true,
        component: Login as any,
        meta: { auth: true },
      },
      {
        path: '/account/register',
        exact: true,
        component: Register as any,
        meta: { auth: true },
      },
      {
        path: '*',
        render: () => <Redirect to="/account/login"></Redirect>,
        meta: { auth: true },
      },
    ],
  },
]
