import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import {Flex,Space,Button} from 'antd';
import styles from './index.less';
import Avatar from '@/components/Avatar';
import Empty from '@/components/Empty'
import PlyrVideoFall from '@/components/PlyrVideoFall'
import PropTypes from 'prop-types'


const Like = ({videos,fetchVideos,loading}) => {
  const handleFetchDate=(size)=>{
    if(videos.length<limitSize){
      message.info("目前只有该部分数据");
    }else{
      setLimitSize(limitSize+9);
      fetchVideos(limitSize+size);
    }
  }
  return (
    <div className={styles.container}>
         
      {
        videos?.length?<PlyrVideoFall videos={videos} fetchVideos={handleFetchDate} loading={loading} isWork={false} />:
        <Empty des='暂无数据'></Empty>
      }
    </div>
  );
};

Like.propTypes={
  videos: PropTypes.array.isRequired,
  fetchVideos:PropTypes.func,
  loading:PropTypes.bool,
}

Like.defaultProps={
  videos: [],
  fetchVideos:()=>{},
  loading:false,
}


export default Like;
