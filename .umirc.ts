import { defineConfig } from '@umijs/max';
import routes from './src/routes'
import zhCN from 'antd/locale/zh_CN';

export default defineConfig({
  antd: {
    configProvider:{
      locale:zhCN
    }
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '',
  },
  define:{ENV:'dev'},
  routes: routes,
  npmClient: 'npm',
});

