import {useState} from 'react'
import styles from './index.less';
import Popover from '../Popover';
import PropTypes from 'prop-types';
import {Avatar as AntdAvatar} from 'antd'
import LoginModal from '../LoginModal'

const Avatar = (props) => {
  const {name} = props
  const [open, setOpen] = useState(false)

  

  /**
   * 
   */
  const handleVisibleLogin=()=>{
    // 未登录
    console.log("点击")
    setOpen(true)
    // TODO 已登录情况下
  }
  const handleSubmit=(data)=>{
    console.log(data)
    setOpen(false)
  }
  const AvatarContent =      
    <AntdAvatar 
    {...props}
    style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', cursor:'pointer' }} 
    size="large" 
    onClick={handleVisibleLogin}
  >
    {name}
  </AntdAvatar>
  return (
    <>
      <Popover text={AvatarContent} description={"享受高清资源"}></Popover>
      <LoginModal
        open={open}
        onFinish={handleSubmit}
        onClose={()=>setOpen(false)}
      />
    </>
  );
};

Avatar.propTypes={
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

Avatar.defaultProps = {
  url: '',
  name: '登录',
};

export default Avatar;
