import React,{ useEffect, useState, useRef } from 'react';
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import PropTypes from 'prop-types';
import settings from './default';
import styles from './index.less';
import { Space,message } from 'antd';
import {
  LikeFilled,
  MessageFilled,
  StarFilled,
  ShareAltOutlined
} from '@ant-design/icons';
import { ACTION_ACTIVE_COLOR, ACTION_NORMAL_COLOR } from '@/common/enum';



const PlyrVideo = (props)=>{
  const { videoSrc,videoType } = props;
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
    <div className={styles.plyrContainer}>
      <video className={styles.plyrVideo}  ref={videoRef} controls  playsInline>
        <source size={576} src={videoSrc} type={videoType || 'video/mp4'} />
      </video>
      <Space className={styles.actionBar} align='center' direction='vertical' size={20}>
        <Space direction='vertical'  size={10} onClick={handleLike} >
          <LikeFilled style={{color:isLike?ACTION_ACTIVE_COLOR.LIKE:ACTION_NORMAL_COLOR.LIKE}} name="点赞" />
          <span>233.2万</span>
        </Space>
        <Space direction='vertical'  size={10} onClick={handleCommit} >
          <MessageFilled name="评论" />
          <span>233.2万</span>
        </Space>
        <Space direction='vertical'  size={10} onClick={handleStorage} >
          <StarFilled name="收藏" style={{color:isStorage?ACTION_ACTIVE_COLOR.STORAGE:ACTION_NORMAL_COLOR.STORAGE}} />
          <span>233.2万</span>
        </Space>
        <Space direction='vertical' size={10} onClick={handleShare} >
          <ShareAltOutlined name="分享" />
          <span>233.2万</span>
        </Space>
      </Space>
    </div>
  );
}


PlyrVideo.propTypes={
  id: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  videoType: PropTypes.string.isRequired
}

PlyrVideo.defaultProps={
  id: '#player',
  videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  videoType: ""
}

export default PlyrVideo