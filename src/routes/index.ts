import React from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const Routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/self',
    component: '@/layouts/BasicLayout',
    name: '我的',
    layout: false,
    icon: BarChartOutlined,
    routes: [
      {
        path: '/self',
        component: '@/pages/Self'
      }
    ]
  },
  {
    path: '/home',
    name: '首页',
    component: '@/layouts/BasicLayout',
    layout: false,
    icon: AppstoreOutlined,
    routes: [
      {
        path: '/home',
        component: '@/pages/Home'
      }
    ]
  },
  {
    path: '/recommend',
    component: '@/layouts/BasicLayout',
    name: '推荐',
    layout: false,
    icon: BarChartOutlined,
    routes: [
      {
        path: '/recommend',
        component: '@/pages/Recommend'
      }
    ]
  }
]

export default Routes;