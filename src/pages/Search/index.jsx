import React,{useEffect,useState} from 'react'
import { useModel, useSearchParams } from '@umijs/max';
import {Flex,Space,Tabs} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Media from './Media'
import Account from './Account'




const Search = () => {
  const { name } = useModel('global');
  const [activeKey, setActiveKey] = useState('video')
  const [searchParams,setSearchParams] = useSearchParams()
  const onChange = (key) => {
    const s = searchParams.get('s')
    setSearchParams({s,tab: key});
    setActiveKey(key)
  };
  const items = [
    {
      key: 'video',
      label: '视频',
      children: <Media />,
    },
    {
      key: 'account',
      label: '用户',
      children: <Account />,
    },
  ];
  useEffect(()=>{
    const tab = searchParams.get('tab');
    const s = searchParams.get('s');
    if(!s) return;
    if(!tab) setSearchParams({s,tab: activeKey});
    
  }, [location.href])
  return (
    <div>
      <Tabs
        defaultActiveKey="video"
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

export default Search;
