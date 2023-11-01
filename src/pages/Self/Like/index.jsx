import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import {Flex,Space,Button} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Empty from '@/components/Empty'


const Like = () => {
  return (
    <div className={styles.container}>
      <Empty des='暂无数据'></Empty>
    </div>
  );
};

export default Like;
