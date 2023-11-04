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
  ShareAltOutlined,
  UpCircleFilled,
  DownCircleFilled
} from '@ant-design/icons';
import { ACTION_ACTIVE_COLOR, ACTION_NORMAL_COLOR } from '@/common/enum';
import Avatar from '../Avatar';


const PlyrVideo = (props)=>{
  const { videoSrc,videoType,style,hideActionBar,toggleCommitPanel } = props;
  const [isLike,setIsLike] = useState(false);
  const [isStorage,setIsStorage] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    if(!videoRef.current) return;

    const playerInstance = new Plyr(videoRef.current, settings);
    
    playerInstance.on("enterfullscreen",(e)=>{
      // console.log(e)
      videoRef.current.style.width='100%';
    })
    playerInstance.on("exitfullscreen",(e)=>{
      // console.log(e)
      videoRef.current.style.width='80%';
    })
    return () => {
      playerInstance.off("enterfullscreen",()=>{})
      playerInstance.off("exitfullscreen",()=>{})
      playerInstance.destroy();
    }
  }, []);

  const handleLike=()=>{
    setIsLike(!isLike)
    message.success(!isLike?"已点赞！":"已取消！")
  }

  const handleCommit=(value)=>{
    toggleCommitPanel(value)
  }

  const handleStorage=()=>{
    setIsStorage(!isStorage)
    message.success(!isStorage?"已收藏！":"已取消！")
  }

  const handleShare=()=>{

  }
  return (
    <div className={styles.plyrContainer} style={style}>
      <video className={styles.plyrVideo}  ref={videoRef} controls  playsInline>
        <source size={576} src={videoSrc} type={videoType || 'video/mp4'} />
      </video>
      <Space style={{display: hideActionBar && 'none'}} className={styles.actionBar} align='center' direction='vertical' size={20}>
        {/* <Space direction='vertical' size={10}>
          <UpCircleFilled />
          <DownCircleFilled />
        </Space> */}
        <Space direction='vertical'  size={10} onClick={handleLike} >
          <LikeFilled style={{color:isLike?ACTION_ACTIVE_COLOR.LIKE:ACTION_NORMAL_COLOR.LIKE}} name="点赞" />
          <span>233.2万</span>
        </Space>
        <Space direction='vertical'  size={10} onClick={()=>handleCommit('initial')} >
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
      <Space direction='vertical' size={20} align='start' className={styles.videoInfo}>
        <Avatar size={36}></Avatar>
        <p name="这是一条视频描述">这是一条视频的描述这是一条视频的描述这是一条视频的描述这是一条视频的描述这是一条视频的描述</p>
      </Space>

    </div>
  );
}


PlyrVideo.propTypes={
  id: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  videoType: PropTypes.string.isRequired,
  hideActionBar: PropTypes.bool.isRequired,
  toggleCommitPanel:PropTypes.func.isRequired
}

PlyrVideo.defaultProps={
  id: '#player',
  videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  videoType: "",
  hideActionBar: false,
  toggleCommitPanel:()=>{}
}

export default PlyrVideo