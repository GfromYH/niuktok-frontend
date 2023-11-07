import {useRef,useEffect,useState} from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';
import PlyrVideoSwipper from '@/components/PlyrVideoSwipper'
import {pullVideo} from '@/services/video'

const Hot = () => {
  const { name } = useModel('global');
  const [videos,setVideos] = useState([])
  const getVideos=async(size=10)=>{
    (async function(){
      const data = await pullVideo({size});
      setVideos(data.videos)
      console.log(data.videos);
    })()
  }
  useEffect(()=>{
    getVideos()
  },[])
 
  return (
    <div className={styles.container}>
      <PlyrVideoSwipper fetchVideos={getVideos} videos={videos}></PlyrVideoSwipper>
    </div>
  );
};

export default Hot;
