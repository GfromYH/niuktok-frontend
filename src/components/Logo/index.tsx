import React from 'react';
import styles from './index.less';

interface Props {
  url: string;
}

// 脚手架示例组件
const Logo: React.FC<Props> = (props) => {
  const { url } = props;
  return (
    <img alt="niuktok 图标" src={url} className={styles.logo}></img>
  );
};

export default Logo;
