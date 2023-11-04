import React,{useState,useEffect} from 'react'
import { theme,Button } from 'antd';
import PropTypes from 'prop-types';
import {
  CheckOutlined,
  PlusOutlined
} from '@ant-design/icons';
import styles from './index.less';



const FollowButton = (props)=>{
  const { isFollow, toggleFollow,dark } = props
  const {
    token: { 
      colorBgContainerDisabled,
      colorBorder,
      colorTextDisabled
    },
  } = theme.useToken();
  const btnStyle= isFollow ? {
    backgroundColor:colorBgContainerDisabled,
    borderColor:colorBorder,
    color:dark?'#fff':colorTextDisabled,
  } : {};
  const btnText= isFollow ? (
    <><CheckOutlined style={{marginRight:8}} />已关注</>
  ) : (
    <><PlusOutlined style={{marginRight:8}} />关注</>
  )
  return (
      <Button  type='primary' style={btnStyle} onClick={toggleFollow}>{btnText}</Button>
  )

}

FollowButton.propTypes={
  isFollow: PropTypes.bool.isRequired,
  toggleFollow: PropTypes.func.isRequired,
  dark:PropTypes.bool
}

FollowButton.defaultProps={
  isFollow: true,
  dark:false
}


export default FollowButton;