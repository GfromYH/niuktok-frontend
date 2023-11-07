/* eslint-disable */
import { request } from '@umijs/max';
import {
  shareAPI,
  storageAPI,
  likeAPI,
  cancelLikeAPI,
  cancelShareAPI,
  cancelStorageAPI,
  viewAPI,
  videoDetailAPI
} from '../api'


// 点赞
export async function like(
  params,
  cb=()=>{}
) {
  const res = await request(`${likeAPI.url}/${params.videoID}`,{
    method:likeAPI.method,
    headers:likeAPI.headers,
    data: {
      ...params,
    },
  });
  if(res.status===0){
    cb();
  }
}

// 收藏
export async function storage(
  params,
  cb=()=>{}
) {
  const res = await request(`${storageAPI.url}/${params.videoID}`,{
    method:storageAPI.method,
    headers:storageAPI.headers,
    data: {
      ...params,
    },
  });
  if(res.status===0){
    cb();
  }
}
// 取消收藏
export async function cancelStorage(
  params,
  cb=()=>{}
) {
  const res = await request(`${cancelStorageAPI.url}/${params.videoID}`,{
    method:cancelStorageAPI.method,
    headers:cancelStorageAPI.headers,
    data: {
      ...params,
    },
  });
  if(res.status===0){
    cb();
  }
}

// 取消点赞
export async function cancelLike(
  params,
  cb=()=>{}
) {
  const res = await request(`${cancelLikeAPI.url}/${params.videoID}`,{
    method:cancelLikeAPI.method,
    headers:cancelLikeAPI.headers,
    data: {
      ...params,
    },
  });
  if(res.status===0){
    cb();
  }
}

// 观看视频
export async function view(
  params,
  cb=()=>{}
) {
  const videoID=params.videoID
  delete params.videoID
  const res = await request(`${viewAPI.url}/${videoID}`,{
    method:viewAPI.method,
    headers:viewAPI.headers,
    data:{
      ...params
    }
  });
  if(res.status===0){
    cb();
  }
}

// 视频详情
export async function videoDetail(
  params,
  cb=()=>{}
) {
  const res = await request(`${videoDetailAPI.url}/${params.videoID}`,{
    method:videoDetailAPI.method,
    headers:videoDetailAPI.headers,
  });
  if(res.status===0){
    cb();
  }
}

