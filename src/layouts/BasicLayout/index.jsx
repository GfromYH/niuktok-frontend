import React,{useState,useEffect} from 'react';
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
import { NavLink } from 'umi'
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'umi'
import Logo from '@/components/Logo';
import Routes from '@/routes';
import Header from './components/Header'

const {  Content, Footer, Sider } = Layout;

const getItem=(label, key, icon, children) =>{
  return {
    key,
    icon,
    children,
    label: <NavLink to={key}>{label}</NavLink>,
  };
}
const items = () => {
  const res = [];
  Routes.forEach((item, index) => {
    if (item.icon) {
      // const {name,icon,path} = item;
      // res.push(
      //   <Menu.Item icon={icon} key={path}>
      //     <NavLink to={path}>{name}</NavLink>
      //   </Menu.Item>
      // )
      res.push(getItem(
        item.name,
        item.path,
        React.createElement(item.icon),
      ))
    }
  })
  return res;
}




const BasicLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {pathname}=location

  return (
    <Layout hasSider style={{minHeight:'100vh'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Logo url="" />
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]} defaultSelectedKeys={[pathname]} items={items()} />
      </Sider>
      <Layout className="site-layout" >
        <Header />
        <Content style={{height: 'calc( 100vh - 72px )',padding: '12px 0 12px 12px', overflow: 'hidden', background: '#333'  }}>
          <Outlet />
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default BasicLayout;