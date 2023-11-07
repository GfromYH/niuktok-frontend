import React, { useState } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import {login, register} from '@/services/user'
import { Modal, Form, Input, Button,message } from 'antd'
import {userStore} from '@/store'

const BLOCK_TYPE={
  LOGIN: 0,
  REGISTER: 1,
  FORGET: 2
}

const IDENTITY_TYPE={
  IDENTIDFIER: 0, // 用户名
  PHONE: 1, // 手机
  EMAIL: 2 // 邮箱
}
const TITLE = ["登录",'注册','忘记密码']

// 用户登录注册组件
const LoginModal = (props) => {
  const { open, onClose } = props
  const [form] = Form.useForm();
  const [type, setType] = useState(BLOCK_TYPE.LOGIN)
  const [identityType, setIdentityType] = useState(IDENTITY_TYPE.IDENTIDFIER)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const {getInfo} = userStore()

  const onFinish=async(data,type,cb)=>{
    console.log(data)
    const requestFunc=[login,register][type]
    const params=[data,{...data,username:data.identifier}][type]
    const infoMessage=['登录成功！','注册成功！'][type];
    setLoading(true)

    const result=await requestFunc(params,async()=>{
      message.success(infoMessage);
      cb();
      await getInfo()
      onClose()
    });
    setLoading(false);
  }
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
  const handleSumbmit=async()=>{
    const data = await form.validateFields();
    onFinish({...data,identityType},type,()=>{
      form.resetFields()
    })
  }
  const LoginBlock=(
    <>
      <Form.Item name="identifier" rules={[{ required: true, message:'用户名不能为空' }]}>
        <Input placeholder='用户名' />
      </Form.Item>
      <Form.Item name="credential" rules={[{ required: true, message:'密码不能为空' }]}>
        <Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} placeholder='密码'   />
      </Form.Item>
      <Form.Item style={{marginBottom: 12}}>
        <Button type="primary"  onClick={handleSumbmit} loading={loading} >登录 </Button>
      </Form.Item>
      <Form.Item style={{marginBottom: 0}}>
        <Button type="link" onClick={()=>setType(BLOCK_TYPE.REGISTER)}>快速注册 </Button>
      </Form.Item>
    </>
  )
  const RegesterBlock=(
    <>
      <Form.Item name="identifier" rules={[{ required: true, message:'用户名不能为空' }]}>
        <Input placeholder='用户名' />
      </Form.Item>
      <Form.Item name="credential" rules={[{ required: true, message:'密码不能为空'  }]}>
        <Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} placeholder='密码' />
      </Form.Item>
      <Form.Item style={{marginBottom: 12}}>
        <Button type="primary" onClick={handleSumbmit} loading={loading} >注册 </Button>
      </Form.Item>
      <Form.Item style={{marginBottom: 0}}>
        <Button type="link" onClick={()=>setType(BLOCK_TYPE.LOGIN)}>返回登录 </Button>
      </Form.Item>
    </>
  )

  return (
    <Modal
      open={open}
      footer={null}
      title={TITLE[type]}
      onCancel={onClose}
    >
      <div className={styles.form}>
      <Form
        form={form}
        name="form"
        style={{ maxWidth: 480 }}
      >
        {getBlock(type)}
      </Form>
      </div>
    </Modal>
  );
};

LoginModal.propTypes={
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

LoginModal.defaultProps = {
  open: true,
  onClose: ()=> console.log("关闭"),
};



export default LoginModal;
