import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import {theme,Flex,Space} from 'antd'
import Popover from '@/components/Popover'
import Avatar from '@/components/Avatar'

const Header = () => {
  const { name } = useModel('global');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className={styles.header} style={{backgroundColor:colorBgContainer}}>
      <Flex justify='flex-end' align='center'>
        <Space size={20}>
          <Popover text='消息' description='这是一条测试消息' buttonFuc={()=>console.log("aaa")} buttonText="立即登陆"></Popover>
          <Avatar name='登录' url="" ></Avatar>
        </Space>
      </Flex>
    </div>
  );
};

export default Header;
