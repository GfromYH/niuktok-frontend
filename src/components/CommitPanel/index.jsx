import React, { useRef,useState } from 'react';
import {Avatar,Flex,Space,Tabs,ConfigProvider} from 'antd'
import styles from './index.less';
import FollowButton from '../FollowButton'
import PropTypes from 'prop-types'
import {
  CloseOutlined
} from '@ant-design/icons';


const CommitPanel=({userInfo,togglePanel,ref})=>{
  const {isFollow=true,toggleFollow=()=>{}} = userInfo
  const items = [
    {
      key: 'video',
      label: '评论',
      children: <div>a</div>,
    },
    {
      key: 'test',
      label: '作品',
      children: <div>a</div>,
    },
  ];
  return (
  <div ref={ref} className={styles.container}>
      <Space style={{width:'100%'}} direction='vertical' size={20}>
        <Flex justify='space-between'>
          <Space size={10} align='center'>
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" size={36} />
            <span className={styles.name}>Gjh</span>
          </Space>
          <FollowButton dark isFollow={isFollow} toggleFollow={toggleFollow} />
          <CloseOutlined onClick={()=>togglePanel('none')} className={styles.closeIcon} />
        </Flex>
        <Space size={10} direction='vertical' >
          <Space size={10}>
            <span>id：111111</span>
            <span>关注数：121.3万</span>
            <span>获赞数：121.3万</span>
          </Space>
        </Space>
    </Space>
    <ConfigProvider
      theme={{components:{
        Tabs:{
          itemColor:'rgba(255,255,255,.5)',
          itemHoverColor:'#fff',
          itemSelectedColor:'#fff',
          itemActiveColor:'#fff',
          inkBarColor:'#ffa39e'
        }
      }}}
    >
      <Tabs
        defaultActiveKey="video"
        items={items}
        indicatorSize={(origin) => origin - 52}
        style={{marginTop: 40}}
        className={styles.tabs}
        />
    </ConfigProvider>
    
  </div>
  )
}


CommitPanel.propTypes ={
  userInfo:PropTypes.object.isRequired,
  togglePanel:PropTypes.func.isRequired,
  ref: PropTypes.object.isRequired
}

CommitPanel.defaultProps={
  userInfo:{},
  togglePanel:()=>{},
  ref:{}
}


export default CommitPanel;