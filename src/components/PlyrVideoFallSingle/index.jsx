import React,{ useEffect, useState, useRef } from 'react';
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import PropTypes from 'prop-types';
import settings from './default';
import styles from './index.less';
import { Space,message,Flex,Avatar } from 'antd';
import {
  LikeFilled,
  MessageFilled,
  StarFilled,
  ShareAltOutlined,
  UpCircleFilled,
  DownCircleFilled,
  LikeOutlined
} from '@ant-design/icons';
import { ACTION_ACTIVE_COLOR, ACTION_NORMAL_COLOR } from '@/common/enum';


const PlyrVideoFallSingle = (props)=>{
  const { id,videoSrc,videoType,style,hideActionBar } = props;
  const [isLike,setIsLike] = useState(false);
  const [isStorage,setIsStorage] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    if(!videoRef.current) return;

    const playerInstance = new Plyr(videoRef.current, settings);
    

    return () => {
      playerInstance.destroy();
    }
  }, []);

  const handleLike=()=>{
    setIsLike(!isLike)
    message.success(!isLike?"已点赞！":"已取消！")
  }

  const handleCommit=()=>{

  }

  const handleStorage=()=>{
    setIsStorage(!isStorage)
    message.success(!isStorage?"已收藏！":"已取消！")
  }

  const handleShare=()=>{

  }
  return (
    <div id={id} className={styles.plyrContainer} style={style}>
      <video preload='none' className={styles.plyrVideo}  ref={videoRef} controls  playsInline>
        <source size={576} src={videoSrc} type={videoType || 'video/mp4'} />
      </video>
      <Flex className={styles.info} justify='space-between' align='center'>
        <Space  style={{fontSize:16}}  size={10} >
          <LikeOutlined name="点赞" />
          <span>233.2万</span>
        </Space>
        <Space style={{fontSize:16}} direction='vertical' align='end' size={10}>
          <span>2023-11-2</span>
          <span>@ GJH</span>
        </Space>
      </Flex>
    </div>
  );
}


PlyrVideoFallSingle.propTypes={
  id: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  videoType: PropTypes.string.isRequired,
  hideActionBar: PropTypes.bool.isRequired,
  style:PropTypes.object
}

PlyrVideoFallSingle.defaultProps={
  id: '#player',
  videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  videoType: "",
  hideActionBar: false
}

export default PlyrVideoFallSingle