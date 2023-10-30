import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import PlyrVideo from '@/components/PlyrVideo'
import styles from './index.less';
import { Space,Flex } from 'antd';
import {
  LikeFilled,
  MessageFilled,
  StarFilled,
  ShareAltOutlined,
  UpCircleFilled,
  DownCircleFilled
} from '@ant-design/icons';

const Hot = () => {
  const { name } = useModel('global');
  return (
    <div className={styles.container}>
      <div className={styles.video} style={{height:'100%'}}>
        <PlyrVideo></PlyrVideo>
        <PlyrVideo style={{marginTop:12}}></PlyrVideo>
        <PlyrVideo style={{marginTop:12}}></PlyrVideo>
      </div>
      <Space className={styles.switchBar} direction='vertical' size={10} >
          <UpCircleFilled name='上一个'/>
          <DownCircleFilled name='下一个'/>
      </Space>
    </div>
  );
};

export default Hot;
