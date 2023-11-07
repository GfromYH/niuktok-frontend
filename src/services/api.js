import {backEndUrl} from './base'

// auth-service
// 登录
export const loginAPI={
  url: `${backEndUrl}/auth-service/login`,
  method:'POST',
  headers: { 'Content-Type': 'application/json' },
}

// 注册
export const registerAPI={
  url: `${backEndUrl}/auth-service/register`,
  method:'POST',
  headers: { 'Content-Type': 'application/json' },
}

//user-service
// 个人信息
export const infoAPI={
  url: `${backEndUrl}/user-service/info`,
  method:'GET',
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
}


// interactive-service
// 收藏
export const storageAPI={
  url: `${backEndUrl}/interactive-service/op/favorite`,
  method:'POST',
  headers: { 'Content-Type': 'application/json' },
}

// 取消收藏
export const cancelStorageAPI={
  url: `${backEndUrl}/interactive-service/op/cancel/favorite`,
  method:'DELETE',
  headers: { 'Content-Type': 'application/json' },
}
// 点赞
export const likeAPI={
  url: `${backEndUrl}/interactive-service/op/like`,
  method:'POST',
  headers: { 'Content-Type': 'application/json' },
}
// 取消点赞
export const cancelLikeAPI={
  url: `${backEndUrl}/interactive-service/op/cancel/like`,
  method:'DELETE',
  headers: { 'Content-Type': 'application/json' },
}

// 分享视频
export const shareAPI={
  url: `${backEndUrl}/interactive-service/op/share`,
  method:'PUT',
  headers: { 'Content-Type': 'application/json' },
}

// 观看视频
export const cancelShareAPI={
  url: `${backEndUrl}/interactive-service/op/view`,
  method:'PUT',
  headers: { 'Content-Type': 'application/json' },
}

// video-service

//上传视频
export const uploadAPI={
  url: `${backEndUrl}/video-service/upload`,
  method:'POST',
  headers: { 'Content-Type': 'application/json' },
}

// 获取七牛token
export const getQiniuTokenAPI={
  url: `${backEndUrl}/video-service/upload/token`,
  method:'GET',
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
}


// 查询视频是否存在
export const exitVideoAPI={
  url: `${backEndUrl}/video-service/ua/exist`,
  method:'GET',
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
}

// 获取视频路径
export const getVideoPathAPI={
  url: `${backEndUrl}/video-service/ua/path`,
  method:'GET',
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
}

// 拉取视频
export const pullVideoAPI={
  url: `${backEndUrl}/video-service/ua/pull`,
  method:'GET',
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
}