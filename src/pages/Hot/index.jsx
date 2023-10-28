import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import PlyrVideo from '@/components/PlyrVideo'
import styles from './index.less';

const Hot = () => {
  const { name } = useModel('global');
  return (
    <div>
      <PlyrVideo></PlyrVideo>
    </div>
  );
};

export default Hot;
