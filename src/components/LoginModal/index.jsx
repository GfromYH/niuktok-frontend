import React, { useState } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd'

const BLOCK_TYPE={
  LOGIN: 0,
  REGISTER: 1,
  FORGET: 2
}
const TITLE = ["登录",'注册','忘记密码']

// 用户登录注册组件
const LoginModal = (props) => {
  const { open, onFinish, onClose } = props
  const [loginForm] = Form.useForm();
  const [regesterForm] = Form.useForm();
  const [type, setType] = useState(BLOCK_TYPE.LOGIN)
  const [passwordVisible, setPasswordVisible] = useState(false)


  /**
   * 
   * @param {number} key BLOCK_TYPE
   */
  const getBlock=(key)=>{
    switch (key) {
      case BLOCK_TYPE.LOGIN:
        return LoginBlock;
      case BLOCK_TYPE.REGISTER:
        return RegesterBlock;
      default:
        return LoginBlock;
    }
  }
  const LoginBlock=(
    <Form
      form={loginForm}
      name="loginForm"
      onFinish={onFinish}
      style={{ maxWidth: 480 }}
    >
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder='用户名' />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} placeholder='密码'   />
      </Form.Item>
      <Form.Item style={{marginBottom: 12}}>
        <Button type="primary" >登录 </Button>
      </Form.Item>
      <Form.Item style={{marginBottom: 0}}>
        <Button type="link" onClick={()=>setType(BLOCK_TYPE.REGISTER)}>快速注册 </Button>
      </Form.Item>
    </Form>
  )
  const RegesterBlock=(
    <Form
      form={regesterForm}
      name="regesterForm"
      onFinish={onFinish}
      style={{ maxWidth: 480 }}
    >
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder='用户名' />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} placeholder='密码' />
      </Form.Item>
      <Form.Item style={{marginBottom: 12}}>
        <Button type="primary" >注册 </Button>
      </Form.Item>
      <Form.Item style={{marginBottom: 0}}>
        <Button type="link" onClick={()=>setType(BLOCK_TYPE.LOGIN)}>返回登录 </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Modal
      open={open}
      footer={null}
      title={TITLE[type]}
      onCancel={onClose}
    >
      <div className={styles.form}>
        {getBlock(type)}
      </div>
    </Modal>
  );
};

LoginModal.propTypes={
  open: PropTypes.bool.isRequired,
  onFinish: PropTypes.func,
  onClose: PropTypes.func
}

LoginModal.defaultProps = {
  open: true,
  onFinish: (data)=> console.log(data) ,
  onClose: ()=> console.log("关闭") 
};



export default LoginModal;
