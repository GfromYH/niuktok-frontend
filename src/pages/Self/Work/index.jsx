import React,{useState} from 'react'
import { useModel } from '@umijs/max';
import {Button, Flex,Space,Modal,Form,message} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Empty from '@/components/Empty'
import PlyrVideoFall from '@/components/PlyrVideoFall'
import AddWorkModal from '../components/AddWorkModal'
import {getQiniuToken} from '@/services/video'
import PropTypes from 'prop-types'


const MODAL_TYPE={
  ADD:0, //新建
  EDIT:1 // 修改
}

const Work = ({videos,fetchVideos,loading}) => {
  // const { name } = useModel('global');
  const [form] = Form.useForm()
  const [workForm] = Form.useForm()
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [title,setTitile] = useState('');
  const [modalType,setModalType] = useState(MODAL_TYPE.ADD); 
  const [modal,contextHolder]=Modal.useModal()
  const [token,setToken]  = useState('')
  const [limitSize,setLimitSize] = useState(9);

  const config = {
    title: '删除视频',
    content: "该操作不可逆，确定要删除该视频吗？",
  };
  const handleAddWork=async()=>{
    const token = await getQiniuToken();
    setTitile('新建作品')
    setToken(token);
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
  const handleFetchDate=(size)=>{
    if(videos.length<limitSize){
      message.info("目前只有该部分数据");
    }else{
      setLimitSize(limitSize+9);
      fetchVideos(limitSize+size);
    }
  }
  return (
    <>
      <div className={styles.container}>
      <Space style={{marginBottom:20}}>
        <Button type='primary' onClick={handleAddWork}>新建作品</Button>
      </Space>
    
      {
        videos?.length?<PlyrVideoFall videos={videos} fetchVideos={handleFetchDate} loading={loading} isWork={true} onEdit={handleEditVisible} onDelete={handleDelete} />:
        <Empty des='暂无数据'></Empty>
      }
      </div>
      {contextHolder}
      <AddWorkModal form={workForm} token={token} title={title} open={isModalOpen} onCancel={()=>setIsModalOpen(false)} ></AddWorkModal>
    </>
  );
};

Work.propTypes={
  videos: PropTypes.array.isRequired,
  fetchVideos:PropTypes.func,
  loading:PropTypes.bool,
}

Work.defaultProps={
  videos: [],
  fetchVideos:()=>{},
  loading:false,
}


export default Work;
