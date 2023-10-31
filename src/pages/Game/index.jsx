import {useRef,useEffect,useState} from 'react';
import { useModel } from '@umijs/max';
import PlyrVideoFall from '@/components/PlyrVideoFall';
import styles from './index.less';


const Game = () => {
  const { name } = useModel('global');
  const [videos,setVideos] = useState([])

  useEffect(()=>{

  },[])
 
  return (
    <div className={styles.container}>
      <PlyrVideoFall></PlyrVideoFall>
    </div>
  );
};

export default Game;
