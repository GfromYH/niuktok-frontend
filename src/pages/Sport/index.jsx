import {useRef,useEffect,useState} from 'react';
import { useModel, useSearchParams } from '@umijs/max';
import PlyrVideoFall from '@/components/PlyrVideoFall';
import PlyrVideoSwipper from '@/components/PlyrVideoSwipper';
import {pullVideo} from '@/services/video'
import {Button, Flex} from 'antd'
import {videoDetail} from '@/services/interactive'
import styles from './index.less';



const Sport = () => {
  const { name } = useModel('global');
  const [videos,setVideos] = useState([])
  const [searchParams,setSearchParams]=useSearchParams();
  const [fullFlag,setFullFlag] = useState(false)
  const [loading,setLoading] = useState(false)
  const [singleVideo,setSingleVideo] = useState([])
  const getVideos=async(size=10)=>{
    setLoading(true);
    const data = await pullVideo({size});
    setVideos(data.videos)
    setLoading(false)
    console.log(data.videos);
  }

  // 点击视频进去页全屏幕模式
  const enterIntoScreen=async(id)=>{
    console.log(id)
    setSearchParams({model_id:id})
    // const data = await videoDetail({videoID:id});
    const item =videos.filter((item)=>item.id===id)
    console.log(item)
    setSingleVideo(item)
    setFullFlag(true)
  }
  const exitScreen =()=>{
    setSearchParams({});
    setFullFlag(false)
  }
  useEffect(()=>{
    (async function(){
      await getVideos()
    })()

    if(searchParams.get('model_id')) setFullFlag(true);
    else setFullFlag(false)
  },[])

  return (
    <div className={styles.container}>
      <PlyrVideoFall
        videos={videos}
        enter={enterIntoScreen}
        fetchVideos={getVideos}
        loading={loading}
      />
     {
      fullFlag? <PlyrVideoSwipper isSwipper={false} videos={singleVideo}  exit={exitScreen} fixed={fullFlag} />:<></>
     }
    </div>
  );
};

export default Sport;
