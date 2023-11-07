import React,{ useEffect, useState, useRef, useLayoutEffect } from 'react';
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import PropTypes from 'prop-types';
import settings from './default';
import styles from './index.less';
import { Space,message,Flex,Avatar, Button } from 'antd';
import {
  LikeFilled,
  MessageFilled,
  StarFilled,
  ShareAltOutlined,
  UpCircleFilled,
  DownCircleFilled,
  LikeOutlined,
  ExpandOutlined
} from '@ant-design/icons';
import { ACTION_ACTIVE_COLOR, ACTION_NORMAL_COLOR } from '@/common/enum';


const PlyrVideoFallSingle = (props)=>{
  const { id,style,hideActionBar,isWork,onEdit,onDelete,customEnter,data } = props;
  const {coverPath,videoPath,title,description,viewNum,likeNum,favoriteNum,shareNum,mimeType,createdTime,userId} = data;
  const [isLike,setIsLike] = useState(false);
  const [isStorage,setIsStorage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();
  const plyrRef = useRef(null);
  useEffect(() => {
    if(!videoRef.current) return;

    const playerInstance = new Plyr(videoRef.current, settings);
    plyrRef.current=playerInstance
    playerInstance.on('play',(e)=>{
      // console.log("触发播放",e)
      // if(customEnter) {
      //   customEnter(id);
      //   playerInstance.stop();
      //   return;
      // }
    })
    return () => {
      playerInstance.off('play',()=>{})
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

  const handleMouseEnter = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (plyrRef.current) {
        plyrRef.current.pause(); // 先暂停视频
        plyrRef.current.play();
      }
    }
  };
  
  const handleMouseLeave = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (plyrRef.current) {
        plyrRef.current.pause();
      }
    }
  };

  const handleEnter=()=>{
    if(plyrRef.current){
      console.log("aaa")
      plyrRef.current.pause()
      customEnter(id)
    }
  }

  return (
    <div id={id}   className={styles.plyrContainer} style={style}>
      <video
        preload='none'         
        className={styles.plyrVideo}  
        ref={videoRef} 
        controls  
        poster={coverPath}
        playsInline>
          <source size={576} src={videoPath} type={mimeType || 'video/mp4'} />
       
      </video>
      {/* <div
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      /> */}
      <ExpandOutlined onClick={handleEnter} className={styles.enterIcon} />
      <Flex className={styles.info} justify='space-between' align='center'>
        <Space  style={{fontSize:16}}  size={10} >
          <LikeOutlined name="点赞" />
          <span>{likeNum||0}</span>
        </Space>
        <Space style={{fontSize:16}} direction='vertical' align='end' size={10}>
          <span>{createdTime||'-'}</span>
          <span>@ {userId}</span>
        </Space>
      </Flex>
      {
        isWork ?
        <Flex className={styles.info} justify='space-between' align='center'>
        <Space  style={{fontSize:16}}  size={10} >
          <Button  type='link' onClick={()=>onEdit(id)}>修改</Button>
          <Button danger type='link' onClick={()=>onDelete(id)}>删除</Button>
        </Space>
        </Flex>:
        <></>
      }
    </div>
  );
}


PlyrVideoFallSingle.propTypes={
  id: PropTypes.number.isRequired,
  videoSrc: PropTypes.string.isRequired,
  videoType: PropTypes.string.isRequired,
  hideActionBar: PropTypes.bool.isRequired,
  style:PropTypes.object,
  isWork:PropTypes.bool,
  onEdit:PropTypes.func,
  onDelete:PropTypes.func,
  customEnter:PropTypes.func,
  data:PropTypes.object
}

PlyrVideoFallSingle.defaultProps={
  id: '#player',
  videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  videoType: "",
  hideActionBar: false,
  isWork:false,
  onEdit:()=>{},
  onDelete:()=>{},
  customEnter:()=>{},
  data:{}
}

export default PlyrVideoFallSingle