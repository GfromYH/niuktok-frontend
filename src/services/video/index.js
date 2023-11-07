/* eslint-disable */
import { request } from '@umijs/max';
import {
  uploadAPI,
  getQiniuTokenAPI,
  pullVideoAPI,
  exitVideoAPI,
  getVideoPathAPI,
  favoriteAPI,
  selfLikeAPI,
  selfShareAPI,
  mimeAPI,
  viewsAPI,
  likeAPI
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

// 个人收藏的作品
export async function selfFavorite(
  params
) {
  const res = await request(favoriteAPI.url,{
    ...favoriteAPI,
    params:{
      ...params
    }
  });
  if(res.status===0){
    return res.data;
  }
}

// 个人喜欢的作品
export async function selfLikes(
  params
) {
  const res = await request(selfLikeAPI.url,{
    ...selfLikeAPI,
    params:{
      ...params
    }
  });
  if(res.status===0){
    return res.data;
  }
}

// 个人分享的作品
export async function selfShare(
  params
) {
  const res = await request(selfShare.url,{
    ...selfShare,
    params:{
      ...params
    }
  });
  if(res.status===0){
    return res.data;
  }
}

// 个人历史观看的作品
export async function selfViews(
  params
) {
  const res = await request(viewsAPI.url,{
    ...viewsAPI,
    params:{
      ...params
    }
  });
  if(res.status===0){
    return res.data;
  }
}

// 个人喜欢的作品
export async function mime(
  params
) {
  const res = await request(mimeAPI.url,{
    ...mimeAPI,
    params:{
      ...params
    }
  });
  if(res.status===0){
    return res.data;
  }
}

