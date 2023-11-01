import React,{useState} from 'react'
import { useModel } from '@umijs/max';
import {Button, Flex,Space,Modal,Form,message} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Empty from '@/components/Empty'
import PlyrVideoFall from '@/components/PlyrVideoFall'
import AddWorkModal from '../components/AddWorkModal'

const MODAL_TYPE={
  ADD:0, //新建
  EDIT:1 // 修改
}

const Work = () => {
  // const { name } = useModel('global');
  const [form] = Form.useForm()
  const [workForm] = Form.useForm()
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [title,setTitile] = useState('');
  const [modalType,setModalType] = useState(MODAL_TYPE.ADD); 
  const [modal,contextHolder]=Modal.useModal()
  const config = {
    title: '删除视频',
    content: "该操作不可逆，确定要删除该视频吗？",
  };
  const handleAddWork=()=>{
    setTitile('新建作品')
    setModalType(MODAL_TYPE.ADD);
    setIsModalOpen(true)
  }
  const handleOk=()=>{
    setIsModalOpen(false)
  }
  const handleCancel=()=>{
    setIsModalOpen(false)
  }
  const hadleUploadWork=()=>{
    message.success("上传成功！");
    setIsModalOpen(false)
  }
  const handleEditVisible=()=>{
    setTitile('修改作品')
    setModalType(MODAL_TYPE.EDIT)
    setIsModalOpen(true)
  }
  const handleDelete=async()=>{
    const confirm=await modal.confirm(config)
    console.log(confirm)
    if(confirm) message.success("删除成功！")
  }
  return (
    <>
      <div className={styles.container}>
      <Space style={{marginBottom:20}}>
        <Button type='primary' onClick={handleAddWork}>新建作品</Button>
      </Space>
      {/* <Empty des='暂无数据'></Empty> */}
      <PlyrVideoFall isWork={true} onEdit={handleEditVisible} onDelete={handleDelete} />
      </div>
      {contextHolder}
      <AddWorkModal title={title} form={workForm} open={isModalOpen} onCancel={()=>setIsModalOpen(false)} onOk={hadleUploadWork}></AddWorkModal>
    </>
  );
};

export default Work;
