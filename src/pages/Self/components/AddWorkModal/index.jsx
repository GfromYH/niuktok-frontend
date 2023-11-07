import React,{useState} from 'react'
import { useModel } from '@umijs/max';
import {Button, Flex,Space,Modal,Form,Input,Upload,Select, message,Spin} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Empty from '@/components/Empty'
import Proptypes from 'prop-types'
import {
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import * as qiniu from 'qiniu-js'
import {upload} from '@/services/video'


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const options=[]

const AddWorkModal = ({
  open,
  onCancel,
  title,
  token,
  form
}) => {
  const [loading,setLoading] = useState(false)
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

  const handleRequest=(data)=>{
    
  }
  const beforeUpload=(file)=>{
    const config = {
      useCdnDomain: true,
    };
    const observable = qiniu.upload(file, null, token, {}, config)
    const observer = {
      next(res) {
        console.log('Upload progress:', res.total.percent);
      },
      error(err) {
        console.log('Upload error:', err);
      },
      complete(res) {
        console.log('Upload complete:', res);
        file.key=res.key;
        file.status='done'
        file.percent=100
        // form.setFieldValue("file",file)
        // return true;
        return true
      },
    };
    const subscription = observable.subscribe(observer) // 上传开始
    return true;
  }
  
  const handleSubmit=async()=>{
    const data =await form.validateFields();
    const {file,title,description,tags,videoPartitionId} = data;
    const key = file?.file?.originFileObj?.key;
    const uploadVideoDTO={
      title,
      key,
      description,
      tags,
      videoPartitionId
    }
    setLoading(true)
    await upload(uploadVideoDTO,()=>{
      message.success("新作品创建成功！")
      setLoading(false)
      onCancel()
      form.resetFields();
    })
    // console.log(data)
    setLoading(false);
  
  }

  return (
  <Modal title={title} open={open} onOk={handleSubmit} onCancel={onCancel}>
    <Spin style={{width:'100%'}} spinning={loading}>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      style={{ maxWidth: 600,padding:20 }}
      labelAlign='left'
      okText="创建"
      cancelText="取消"
    >
      <Form.Item name="title" label="作品名称" rules={[{ required: true,message:'作品名称不能为空' }]}>
        <Input placeholder='请填写作品名称' />
      </Form.Item>
      <Form.Item name="videoPartitionId" label="作品分区" rules={[{ required: true,message:'作品分区不能为空' }]}>
        <Select
          placeholder="请选择作品分区"
          options={[{ value: 1, label: "体育" }]}
        />
      </Form.Item>
      <Form.Item name="description" label="作品描述" >
        <Input.TextArea  placeholder='请填写作品描述'  />
      </Form.Item>
      <Form.Item name="tags" label="作品类型" >
      <Select
          placeholder="请填写作品类型"
          mode="tags"
          style={{
            width: '100%',
          }}
          tokenSeparators={[',']}
          options={options}
        />
      </Form.Item>
      {/* <Form.Item label="上传封面" rules={[{ required: true }]} valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do"  listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
      <Form.Item name="file" label="上传作品" rules={[{ required: true }]}>
        <Upload
            beforeUpload={beforeUpload}
            // customRequest={handleRequest}
            maxCount={1}
          >
        <Button icon={<UploadOutlined />}>上传视频</Button>
    </Upload>
      </Form.Item>
    </Form>
    </Spin>
  </Modal>
  );
};

AddWorkModal.propTypes ={
  open: Proptypes.bool.isRequired,
  onCancel:Proptypes.func.isRequired,
  title:Proptypes.string.isRequired,
  token: Proptypes.string.isRequired,
  form:Proptypes.object.isRequired
}

AddWorkModal.defaultProps ={
  open: true,
  onCancel:()=>{},
  title:"新建作品",
  form:{},
  token:''
}


export default AddWorkModal;
