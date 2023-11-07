/* eslint-disable */
import { request } from '@umijs/max';
import {
  shareAPI,
  storageAPI,
  likeAPI,
  cancelLikeAPI,
  cancelShareAPI,
  cancelStorageAPI
} from '../api'


// 登录
export async function login(
  params,
  cb=()=>{}
) {
  const data = await request(loginAPI.url,{
    ...loginAPI,
    data: {
      ...params,
    },
  });
  if(data.status===0){
    cb();
  }
}

// 注册
export async function register(
  params,
  cb=()=>{}
) {
  const data = await request(registerAPI.url,{
    ...registerAPI,
    data: {
      ...params,
    },
  });
  if(data.status===0){
    cb();
  }
}

// 个人信息
export async function info(
) {
  const res = await request(infoAPI.url,{
    ...infoAPI,
  });
  if(data.status===0){
    return res.data;
  }
}
