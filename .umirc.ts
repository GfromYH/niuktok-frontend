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
      path: '/home',
      component: '@/layouts/BasicLayout',
      layout: false,
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
      layout: false,
      routes: [
        {
          path: '/recommend',
          component: '@/pages/Recommend'
        }
      ]
    }
  ],

  npmClient: 'npm',
});

