/* eslint-disable */
import { request } from '@umijs/max';
import {
  uploadAPI,
  getQiniuTokenAPI,
  pullVideoAPI,
  exitVideoAPI,
  getVideoPathAPI
} from '../api'


// 上传视频
export async function upload(
  params,
  cb=()=>{}
) {
  const data = await request(uploadAPI.url,{
    ...uploadAPI,
    data: {
      ...params,
    },
  });
  if(data.status===0){
    cb();
  }
}

// 获取qiniu token
export async function getQiniuToken() {
  const res = await request(getQiniuTokenAPI.url,{
    ...getQiniuTokenAPI,
  });
  if(res.status===0){
    // cb();
    return res?.data?.token
  }
}

// 拉取视频
export async function pullVideo(
  params
) {
  const res = await request(pullVideoAPI.url,{
    ...pullVideoAPI,
    params:{
      ...params
    }
  });
  if(res.status===0){
    return res.data;
  }
}
