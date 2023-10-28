import React from 'react';
import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import styles from './index.less';

const Sport = () => {
  const { name } = useModel('global');
  return (
    <div>{name}</div>
  );
};

export default Sport;
