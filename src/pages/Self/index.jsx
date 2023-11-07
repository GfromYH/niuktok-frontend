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
import { selfFavorite,selfShare,selfViews,mime,selfLikes } from '@/services/video'



const Self = () => {
  const { name } = useModel('global');
  const [activeKey, setActiveKey] = useState('like')
  const [searchParams,setSearchParams] = useSearchParams()
  const [videos,setVideos] = useState([])
  const [loading,setLoading] = useState(false)
  const onChange = async(key) => {
    console.log(key);
    setSearchParams({tab: key});
    await getVideos(9,key);
    setActiveKey(key)
  };
  const items = [
    {
      key: 'work',
      label: '作品',
      children: <Work videos={videos} loading={loading} fetchVideos={getVideos} />,
    },
    {
      key: 'like',
      label: '喜欢',
      children: <Like  videos={videos} loading={loading} fetchVideos={getVideos}  />,
    },
    {
      key: 'collection',
      label: '收藏',
      children:  <Collection  videos={videos} loading={loading} fetchVideos={getVideos}  />,
    },
    {
      key: 'history',
      label: '历史记录',
      children: <History  videos={videos} loading={loading} fetchVideos={getVideos}  />,
    },
  ];
  const getVideos=async(pageSize=9,key,pageNo=1,orderDir="desc")=>{

    let func=()=>{};
    switch (key) {
      case "work":
        func=mime
        break;
      case "like":
        func=selfLikes
        break;
      case "collection":
        func=selfFavorite
        break;
      case "history":
        func=selfViews
        break;
    
      default:
        break;
    }
    setLoading(true)
    const data = await func({pageNo,pageSize,orderDir});
    setLoading(false)
    setVideos(data?.videos);
  }
  useEffect(()=>{
    const tab = searchParams.get('tab');
    if(!tab) setSearchParams({tab: activeKey});
    else setActiveKey(tab);
    (async function(){
      await getVideos(9,tab);
    })()
  }, [])
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
