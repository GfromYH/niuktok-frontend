import { useState } from 'react';
import { useModel, useSearchParams } from '@umijs/max';
import {Flex,Space,Button} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/FollowButton'
import PropTypes from 'prop-types'
import {userStore} from '@/store'
import {
  CheckOutlined,
  PlusOutlined
} from '@ant-design/icons';
import LoginModal from '@/components/LoginModal';


const Info = () => {
  const { name } = useModel('global');
  const [ isFollow, setIsFollow] = useState(false)
  const [ open, setOpen] = useState(false)
  const {user,isLogin} = userStore();
  const [searchParams,setSearchParams] = useSearchParams()
  const handleFollow=()=>{
    setIsFollow(!isFollow)
  }
  return (
    <>
      <Flex align='center'>
        <Avatar 
          size={100}
        />
        <Flex vertical align='start'style={{marginLeft: 20, fontSize: 20}}>
          <Space align='center'>
            {
              isLogin? user.username :<span>未登录，<Button type='link' onClick={()=>setOpen(true)}>立即登录</Button></span>
            }
           {
            !searchParams.get('username')?
            <></>: 
            <FollowButton isFollow={isFollow} toggleFollow={handleFollow}></FollowButton>
           }
          </Space>
          <Space size={20} style={{fontSize: 16, marginTop: 20}}>
            <span>关注 -</span>
            <span>粉丝 -</span>
            <span>获赞 -</span>
          </Space>
        </Flex>
      </Flex>
      <LoginModal
        open={open}
        onClose={()=>setOpen(false)}
      />
    </>
  );
};

Info.propTypes={

}

export default Info;
