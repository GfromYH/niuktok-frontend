import {useRef,useEffect,useState} from 'react';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import PlyrVideo from '@/components/PlyrVideo'
import styles from './index.less';
import { Space,Flex,message } from 'antd';
import {
  LikeFilled,
  MessageFilled,
  StarFilled,
  ShareAltOutlined,
  UpCircleFilled,
  DownCircleFilled,
  CloseOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import CommitPanel from '@/components/CommitPanel'


const PlyrVideoSwipper = (props) => {
  const {nextFuncAPI,preFuncAPI,videos,fixed,exit,fetchVideos} = props
  const { name } = useModel('global');
  const ref= useRef(null)
  const commitRef = useRef(null);
  const [videoIndex,setVideoIndex] = useState(0)
  // useEffect(()=>{
  //   if
  // },[])
  const handlePre=()=>{
    let videoIndexCp=videoIndex
    if(videoIndexCp===0) {
      message.info("已经到顶了！");
      return;
    }
    videoIndexCp-=1;
    let calcString=fixed?`calc( ${videoIndexCp} * ( -100vh - 12px ) )`:`calc( ${videoIndexCp} * ( -100vh + 72px ) )`;
    ref.current.style.transform=`translateY(${calcString})`;
    setVideoIndex(videoIndexCp)
  }
  const handleNext=()=>{
    let videoIndexCp=videoIndex
    if(videoIndexCp===videos.length){
      message.info("已经到底了！");
      return;
    }
    if(videoIndexCp===videos.length-2) {
      fetchVideos(videos.length+10)
    }
    videoIndexCp+=1;
    let calcString=fixed?`calc(${videoIndexCp}*( -100vh - 12px))`:`calc(${videoIndexCp}*( -100vh + 72px ))`;
    ref.current.style.transform=`translateY(${calcString})`;
    setVideoIndex(videoIndexCp)
  }
  const togglePanel=(value)=>{
    console.log(commitRef.current)
    commitRef.current.style.display=value
  }
  return (
    <div className={classnames(styles.container,{
      [`${styles.fixedContainer}`]: fixed
    })}>
      <div ref={ref} className={styles.video} style={{height:'100%'}}>
        {
          videos.map((item)=>{
            return <PlyrVideo key={item.id} id={item.id} data={item} toggleCommitPanel={togglePanel} ></PlyrVideo>
          })
        }
      </div>
      <div ref={commitRef} style={{width:'30%',display:'none'}}>
        <CommitPanel togglePanel={togglePanel}></CommitPanel>
      </div>
      <CloseOutlined onClick={exit} style={{display:fixed?'initial':'none'}} className={styles.closeIcon} />
      <Space className={styles.switchBar} direction='vertical' size={10} >
          <UpCircleFilled style={{cursor:videoIndex===0?'not-allowed':'pointer'}} name='上一个' onClick={handlePre} />
          <DownCircleFilled name='下一个' onClick={handleNext} />
      </Space>
    </div>
  );
};


PlyrVideoSwipper.propTypes={
  videos: PropTypes.array.isRequired,
  nextFuncAPI: PropTypes.func.isRequired,
  preFuncAPI: PropTypes.func.isRequired,
  fixed: PropTypes.bool.isRequired,
  exit:PropTypes.func,
  fetchVideos:PropTypes.func
}



PlyrVideoSwipper.defaultProps={
  videos: [],
  nextFuncAPI: ()=>console.log("下一个"),
  preFuncAPI: ()=>console.log("上一个"),
  fixed:false,
  exit:()=>{},
  fetchVideos:()=>{}
}

export default PlyrVideoSwipper;
