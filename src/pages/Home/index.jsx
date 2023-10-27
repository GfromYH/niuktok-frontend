import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage = () => {
  const { name } = useModel('global');
  return (
    <div>{name}</div>
  );
};

export default HomePage;
