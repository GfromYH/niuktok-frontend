import {useRef,useEffect,useState} from 'react';
import { useModel, useSearchParams } from '@umijs/max';
import PlyrVideoFall from '@/components/PlyrVideoFall';
import PlyrVideoSwipper from '@/components/PlyrVideoSwipper';
import styles from './index.less';


const Game = () => {
  const { name } = useModel('global');
  const [videos,setVideos] = useState([])
  const [searchParams,setSearchParams]=useSearchParams();
  const [fullFlag,setFullFlag] = useState(false)
  useEffect(()=>{
    if(searchParams.get('model_id')) setFullFlag(true);
    else setFullFlag(false)
  },[searchParams.get('model_id')])
  // 点击视频进去页全屏幕模式
  const enterIntoScreen=(id)=>{
    console.log(id)
    setSearchParams({model_id:id})
  }
  const exitScreen =()=>{
    setSearchParams({});
    setFullFlag(false)
  }
  return (
    <div className={styles.container}>
      <PlyrVideoFall
        enter={enterIntoScreen}
      />
     {
      fullFlag? <PlyrVideoSwipper exit={exitScreen} fixed={fullFlag} />:<></>
     }
    </div>
  );
};

export default Game;
