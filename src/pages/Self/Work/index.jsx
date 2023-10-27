import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import {Flex,Space} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';

const Work = () => {
  const { name } = useModel('global');
  return (
    <div>
      <Flex align='center'>
        <Avatar 
          size={100}
        />
        <Flex vertical align='start'style={{marginLeft: 20, fontSize: 20}}>
          <span>未登录</span>
          <Space size={20} style={{fontSize: 16, marginTop: 20}}>
            <span>关注 -</span>
            <span>粉丝 -</span>
            <span>获赞 -</span>
          </Space>
        </Flex>
      </Flex>
    </div>
  );
};

export default Work;
