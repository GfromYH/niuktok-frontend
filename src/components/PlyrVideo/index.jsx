import React,{ useEffect, useState, useRef } from 'react';
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import PropTypes from 'prop-types';
import settings from './default';
import styles from './index.less';
import { Space,message,Avatar } from 'antd';
import {
  LikeFilled,
  MessageFilled,
  StarFilled,
  ShareAltOutlined,
  UpCircleFilled,
  DownCircleFilled
} from '@ant-design/icons';
import { ACTION_ACTIVE_COLOR, ACTION_NORMAL_COLOR } from '@/common/enum';
import { like,storage,cancelLike,cancelStorage,view } from '@/services/interactive'


const PlyrVideo = (props)=>{
  const { videoSrc,videoType,style,hideActionBar,toggleCommitPanel,data,id,fetchVideos } = props;
  const {coverPath,videoPath,title,description,viewNum,likeNum,favoriteNum,shareNum,mimeType,createdTime} = data;
  const [isLike,setIsLike] = useState(false);
  const [isStorage,setIsStorage] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    if(!videoRef.current) return;
    let isSend=false;

    const playerInstance = new Plyr(videoRef.current, settings);
    playerInstance.on("enterfullscreen",(e)=>{
      // console.log(e)
      videoRef.current.style.width='100%';
    })
    playerInstance.on("exitfullscreen",(e)=>{
      // console.log(e)
      videoRef.current.style.width='80%';
    })
    playerInstance.on("pause",(e)=>{
      const currentTime = e?.detail?.plyr?.currentTime;
      view({
        videoID:id,
        progress:Math.floor(currentTime)
      })
    })
      // 添加 timeupdate 事件监听器
    playerInstance.on("timeupdate", (e) => {
      const currentTime = e?.detail?.plyr?.currentTime;
      // 判断当前播放时间是否达到5秒
      if (!isSend && currentTime >= 5) {
        // 发送请求
        view({
          videoID:id,
          progress:Math.floor(currentTime)
        })
        isSend=true;
      }
    });
    return () => {
      playerInstance.off("enterfullscreen",()=>{})
      playerInstance.off("exitfullscreen",()=>{})
      playerInstance.off("timeupdate",()=>{})
      playerInstance.off("pause",()=>{})
      playerInstance.destroy();
    }
  }, []);

  const handleLike=async()=>{
    const requestFucn = !isLike?like:cancelLike;
    await requestFucn({videoID:id},()=>{
      // fetchVideos()
      setIsLike(!isLike)
      message.success(!isLike?"已点赞！":"已取消！")
    })
 
  }

  const handleCommit=(value)=>{
    toggleCommitPanel(value)
  }

  const handleStorage=async()=>{
    const requestFucn = !isStorage?storage:cancelStorage;
    await requestFucn({videoID:id},()=>{
      // fetchVideos()
      setIsStorage(!isStorage)
      message.success(!isStorage?"已收藏！":"已取消！")
    })
  }

  const handleShare=()=>{

  }
  return (
    <div className={styles.plyrContainer} style={style}>
      <video className={styles.plyrVideo} poster={coverPath}  ref={videoRef} controls  playsInline>
        <source size={576}  src={videoPath} type={mimeType || 'video/mp4'} />
      </video>
      <Space style={{display: hideActionBar && 'none'}} className={styles.actionBar} align='center' direction='vertical' size={20}>
        {/* <Space direction='vertical' size={10}>
          <UpCircleFilled />
          <DownCircleFilled />
        </Space> */}
        <Space direction='vertical'  size={10} onClick={handleLike} >
          <LikeFilled style={{color:isLike?ACTION_ACTIVE_COLOR.LIKE:ACTION_NORMAL_COLOR.LIKE}} name="点赞" />
          <span>{isLike?likeNum+1: likeNum}</span>
        </Space>
        <Space direction='vertical'  size={10} onClick={()=>handleCommit('initial')} >
          <MessageFilled name="评论" />
          <span>0</span>
        </Space>
        <Space direction='vertical'  size={10} onClick={handleStorage} >
          <StarFilled name="收藏" style={{color:isStorage?ACTION_ACTIVE_COLOR.STORAGE:ACTION_NORMAL_COLOR.STORAGE}} />
          <span>{isStorage?favoriteNum+1:favoriteNum}</span>
        </Space>
        <Space direction='vertical' size={10} onClick={handleShare} >
          <ShareAltOutlined name="分享" />
          <span>{shareNum||0}</span>
        </Space>
      </Space>
      <Space direction='vertical' size={20} align='start' className={styles.videoInfo}>
        <Avatar size={36}></Avatar>
        <p name={description}>{description}</p>
      </Space>

    </div>
  );
}


PlyrVideo.propTypes={
  id: PropTypes.number.isRequired,
  videoSrc: PropTypes.string.isRequired,
  videoType: PropTypes.string.isRequired,
  hideActionBar: PropTypes.bool.isRequired,
  toggleCommitPanel:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired,
  fetchVideos:PropTypes.func
}

PlyrVideo.defaultProps={
  id: '#player',
  videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  videoType: "",
  data:{},
  hideActionBar: false,
  toggleCommitPanel:()=>{},
  fetchVideos:()=>{}
}

export default PlyrVideo