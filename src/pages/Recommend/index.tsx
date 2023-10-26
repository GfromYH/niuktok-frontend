import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const Recommend: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div>{name}</div>
  );
};

export default Recommend;
