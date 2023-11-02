import React,{useState} from 'react'
import { useModel } from '@umijs/max';
import {Button, Flex,Space,Modal,Form,message} from 'antd';
import styles from './index.less';
import Empty from '@/components/Empty'
import PlyrVideoFall from '@/components/PlyrVideoFall'



const Media = () => {
  // const { name } = useModel('global');
  
  return (
    <>
      <div className={styles.container}>

        {/* <Empty des='暂无数据'></Empty> */}
        <PlyrVideoFall />
      </div>
    </>
  );
};

export default Media;
