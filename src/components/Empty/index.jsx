import React from 'react';
import { Button, Empty as AntdEmpty } from 'antd';
import PropTypes from 'prop-types'
const Empty = ({action,actionFunc,des,buttonText}) => (
  <AntdEmpty 
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    style={{minHeight:400,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}

    description={
      <span>
        {des}
      </span>
    }
  >
    {action?<Button type="primary" onClick={actionFunc}>{buttonText}</Button>:<></>}
  </AntdEmpty>
);

Empty.propTypes={
  des:PropTypes.string.isRequired,
  action: PropTypes.bool,
  actionFunc: PropTypes.func,
  buttonText:PropTypes.string
}

Empty.defaultProps={
  des:'测试',
  action: false,
  actionFunc: ()=>{},
}

export default Empty;