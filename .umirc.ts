import { defineConfig } from '@umijs/max';
// import routes from './src/routes'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '',
  },
  // routes: routes,
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/self',
      component: '@/layouts/BasicLayout',
      layout: false,
      routes: [
        {
          path: '',
          component: '@/pages/Self',
        }
      ]
    },
    {
      path: '/home',
      component: '@/layouts/BasicLayout',
      layout: false,
      routes: [
        {
          path: '',
          component: '@/pages/Home'
        }
      ]
    },
    {
      path: '/hot',
      component: '@/layouts/BasicLayout',
      layout: false,
      routes: [
        {
          path: '',
          component: '@/pages/Hot'
        }
      ]
    },
    {
      path: '/sport',
      component: '@/layouts/BasicLayout',
      layout: false,
      routes: [
        {
          path: '',
          component: '@/pages/Sport'
        }
      ]
    }
  ],

  npmClient: 'npm',
});

