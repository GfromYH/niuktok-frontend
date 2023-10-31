import {useRef,useEffect,useState} from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';
import PlyrVideoSwipper from '@/components/PlyrVideoSwipper'


const Hot = () => {
  const { name } = useModel('global');

  useEffect(()=>{

  },[])
 
  return (
    <div className={styles.container}>
      <PlyrVideoSwipper></PlyrVideoSwipper>
    </div>
  );
};

export default Hot;
