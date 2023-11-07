import {useState} from 'react'
import styles from './index.less';
import Popover from '../Popover';
import PropTypes from 'prop-types';
import {history} from '@umijs/max'
import {Avatar as AntdAvatar, Spin, message} from 'antd'
import LoginModal from '../LoginModal'
import {login, register} from '@/services/user'
import {userStore} from '@/store';

const Avatar = (props) => {
  const {name,size,url} = props
  const [open, setOpen] = useState(false)
  const {user,isLogin} = userStore()
  

  /**
   * 
   */
  const handleVisibleLogin=()=>{
    // 未登录
    console.log("点击")
    setOpen(true)
    // TODO 已登录情况下
  }
 
  const AvatarContent =      
  <AntdAvatar 
    {...props}
    style={{  verticalAlign: 'middle', cursor:"pointer" }} 
    size={size}
    onClick={isLogin?()=>{history.push(`/self`)}:handleVisibleLogin}
    src={url}
  >
    {name}
  </AntdAvatar>
  return (
    <>
      {!isLogin?<Popover text={AvatarContent} description={"享受高清资源"}></Popover>:
        AvatarContent
      }
      <LoginModal
        open={open}
        onClose={()=>setOpen(false)}
      />
    </>
  );
};

Avatar.propTypes={
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

Avatar.defaultProps = {
  url: '',
  name: '登录',
  size: 40
};

export default Avatar;
