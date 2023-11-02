import React,{useEffect, useState} from 'react'
import { useModel } from '@umijs/max';
import {Button, Flex,Space,Card,Skeleton,message,Avatar} from 'antd';
import styles from './index.less';
import Empty from '@/components/Empty'
import FollowButton from '@/components/FollowButton';

const { Meta } = Card;

const AccountCard=({loading,isFollow,toggleFollow})=>{
  return (
    <Card
      className={styles.accountCard}
    >
      <Skeleton loading={loading} avatar active>
        <Space style={{width:'100%'}} direction='vertical' size={20}>
            <Flex justify='space-between'>
              <Space size={10} align='center'>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" size={36} />
                <span className={styles.name}>Gjh</span>
              </Space>
              <FollowButton isFollow={isFollow} toggleFollow={toggleFollow} />
            </Flex>
            <Space size={10} direction='vertical' >
              <Space size={10}>
                <span>id：111111</span>
                <span>关注数：121.3万</span>
                <span>获赞数：121.3万</span>
              </Space>
               <p name="aaaaaaaaaaaaaaaaaa" className={styles.description}>aaaaaaaaaaaaaaaaaa</p>
            </Space>

        </Space>
      </Skeleton>
    </Card>
  )
}

const Account = () => {
  // const { name } = useModel('global');
  const [loading,setLoading] = useState(false)
  const [list,setList] = useState([])
  const toggleFollow=(id)=>{
    message.success(`${id} 关注成功`);
  }
  useEffect(()=>{
    const array=new Array(14);
    for(let i=0;i<array.length;i++){
      array[i]= <AccountCard 
      id={i} 
      loading={i%2?loading:!loading} 
      isFollow={false} 
      toggleFollow={()=>toggleFollow(i)} 
      />
    }
    setList(array)
  },[])
  return (
    <>
      <div className={styles.container}>
        <Flex wrap='wrap' gap={20} className={styles.accountContainer} >
          {
            list.map((item)=>item)
          }
        </Flex>
       
        {/* <Empty des='暂无数据'></Empty> */}
      </div>
    </>
  );
};

export default Account;
