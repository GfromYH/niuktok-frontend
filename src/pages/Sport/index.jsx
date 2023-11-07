import {useRef,useEffect,useState} from 'react';
import { useModel, useSearchParams } from '@umijs/max';
import PlyrVideoFall from '@/components/PlyrVideoFall';
import PlyrVideoSwipper from '@/components/PlyrVideoSwipper';
import {pullVideo} from '@/services/video'
import styles from './index.less';



const Sport = () => {
  const { name } = useModel('global');
  const [videos,setVideos] = useState([])
  const [searchParams,setSearchParams]=useSearchParams();
  const [fullFlag,setFullFlag] = useState(false)
  const getVideos=async(size=10)=>{
    const data = await pullVideo({size});
    setVideos(data.videos)
    console.log(data.videos);
  }

  // 点击视频进去页全屏幕模式
  const enterIntoScreen=(id)=>{
    console.log(id)
    setSearchParams({model_id:id})
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
      />
     {
      fullFlag? <PlyrVideoSwipper videos={videos}  exit={exitScreen} fixed={fullFlag} />:<></>
     }
    </div>
  );
};

export default Sport;
