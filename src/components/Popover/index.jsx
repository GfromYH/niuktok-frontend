import React from 'react'
import {Popover as AntdPopover,Button} from 'antd'
import styles from './index.less';
import PropTypes, { string } from 'prop-types'

const Popover = (props) => {
  const {text,description,buttonText,buttonFuc} = props
  const content=(
    <div style={{width: 200, padding: 20, textAlign: 'center'}}>
      <p>{description}</p>
      {buttonText ? <Button type='primary' style={{width:'100%'}} onClick={buttonFuc}>{buttonText}</Button> : <></>}
    </div>
  )
  return (
    <AntdPopover placement='bottom' content={content}>{text}</AntdPopover>
  );
};

Popover.propTypes={
  text: PropTypes.oneOfType([PropTypes.string,PropTypes.element]).isRequired,
  description: PropTypes.oneOfType([PropTypes.string,PropTypes.element]).isRequired,
  buttonText: PropTypes.string,
  buttonFuc:PropTypes.func
}

export default Popover;
