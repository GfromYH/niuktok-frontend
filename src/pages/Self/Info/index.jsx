import { useState } from 'react';
import { useModel } from '@umijs/max';
import {Flex,Space,Button} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/FollowButton'
import PropTypes from 'prop-types'
import {
  CheckOutlined,
  PlusOutlined
} from '@ant-design/icons';

const Info = () => {
  const { name } = useModel('global');
  const [ isFollow, setIsFollow] = useState(false)
  const handleFollow=()=>{
    setIsFollow(!isFollow)
  }
  return (
    <Flex align='center'>
      <Avatar 
        size={100}
      />
      <Flex vertical align='start'style={{marginLeft: 20, fontSize: 20}}>
        <Space>
          <span>未登录</span>
          <FollowButton isFollow={isFollow} toggleFollow={handleFollow}></FollowButton>
        </Space>
        <Space size={20} style={{fontSize: 16, marginTop: 20}}>
          <span>关注 -</span>
          <span>粉丝 -</span>
          <span>获赞 -</span>
        </Space>
      </Flex>
    </Flex>
  );
};

Info.propTypes={

}

export default Info;
