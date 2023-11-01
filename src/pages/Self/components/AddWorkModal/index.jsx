import React,{useState} from 'react'
import { useModel } from '@umijs/max';
import {Button, Flex,Space,Modal,Form,Input,Upload} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Empty from '@/components/Empty'
import Proptypes from 'prop-types'
import {
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const AddWorkModal = ({
  open,
  onOk,
  onCancel,
  form,
  title
}) => {
  // const { name } = useModel('global');
  const handleOk=()=>{
    setIsModalOpen(false)
  }
  const handleCancel=()=>{
    setIsModalOpen(false)
  }
  const onFinish=()=>{

  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
  return (
  <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600,padding:20 }}
      labelAlign='left'
    >
      <Form.Item name="name" label="作品名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="作品描述" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="上传封面" rules={[{ required: true }]} valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do"  listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      <Form.Item name="work" label="上传作品" rules={[{ required: true }]}>
      <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture"
          maxCount={1}
        >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
      </Form.Item>
    </Form>
  </Modal>
  );
};

AddWorkModal.propTypes ={
  open: Proptypes.bool.isRequired,
  onOk:Proptypes.func.isRequired,
  onCancel:Proptypes.func.isRequired,
  form:Proptypes.object.isRequired,
  title:Proptypes.string.isRequired
}

AddWorkModal.defaultProps ={
  open: true,
  onOk:()=>{},
  onCancel:()=>{},
  form:{},
  title:"新建作品"
}


export default AddWorkModal;
