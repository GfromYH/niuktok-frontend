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
  DownCircleFilled
} from '@ant-design/icons';
import PropTypes from 'prop-types'

const PlyrVideoSwipper = (props) => {
  const {nextFuncAPI,preFuncAPI,videos} = props
  const { name } = useModel('global');
  const ref= useRef(null)
  const [videoGroup,setVideoGroup] = useState([])
  const [videoIndex,setVideoIndex] = useState(0)
  useEffect(()=>{
    setVideoGroup([
      <PlyrVideo key="id1"></PlyrVideo>,
      <PlyrVideo key="id2"></PlyrVideo>,
      <PlyrVideo key="id3"></PlyrVideo>
    ])
  },[])
  const handlePre=()=>{
    let videoIndexCp=videoIndex
    if(videoIndexCp===0) {
      message.info("已经到顶了！");
      return;
    }
    videoIndexCp-=1;
    let calcString=`calc( ${videoIndexCp} * ( -100vh + 72px ) )`;
    ref.current.style.transform=`translateY(${calcString})`;
    setVideoIndex(videoIndexCp)
    setVideoGroup(videoGroup)
    preFuncAPI();
  }
  const handleNext=()=>{
    let videoIndexCp=videoIndex
    if(videoIndexCp===videoGroup.length-1) videoGroup.push(<PlyrVideo></PlyrVideo>);
    videoIndexCp+=1;
    let calcString=`calc(${videoIndexCp}*( -100vh + 72px ))`;
    ref.current.style.transform=`translateY(${calcString})`;
    setVideoGroup(videoGroup)
    setVideoIndex(videoIndexCp)
    nextFuncAPI()
  }
  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.video} style={{height:'100%'}}>
        {
          videoGroup.map((item)=>item)
        }
      </div>
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
}

PlyrVideoSwipper.defaultProps={
  videos: [],
  nextFuncAPI: ()=>console.log("下一个"),
  preFuncAPI: ()=>console.log("上一个"),
}

export default PlyrVideoSwipper;
