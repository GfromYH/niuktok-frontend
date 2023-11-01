import React,{useEffect,useState} from 'react'
import { useModel, useSearchParams } from '@umijs/max';
import {Flex,Space,Tabs} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Info from './Info'
import Collection from './Collection'
import Work from './Work'
import History from './History'
import Like from './Like'



const Self = () => {
  const { name } = useModel('global');
  const [activeKey, setActiveKey] = useState('like')
  const [searchParams,setSearchParams] = useSearchParams()
  const onChange = (key) => {
    console.log(key);
    setSearchParams({tab: key});
    setActiveKey(key)
  };
  const items = [
    {
      key: 'work',
      label: '作品',
      children: <Work />,
    },
    {
      key: 'like',
      label: '喜欢',
      children: <Like />,
    },
    {
      key: 'collection',
      label: '收藏',
      children:  <Collection />,
    },
    {
      key: 'history',
      label: '历史记录',
      children: <History />,
    },
  ];
  useEffect(()=>{
    const tab = searchParams.get('tab');
    if(!tab) setSearchParams({tab: activeKey});
    
  }, [location.href])
  return (
    <div>
      <Info />
      <Tabs
        defaultActiveKey="like"
        items={items}
        activeKey={activeKey}
        onChange={onChange}
        indicatorSize={(origin) => origin - 52}
        style={{marginTop: 40}}
        className={styles.tabs}
      />
    </div>
  );
};

export default Self;
