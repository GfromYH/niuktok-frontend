import type { RequestConfig } from 'umi';
import {message as antdMessage} from 'antd'
import {setLocalStorage,getLocalStorage,removeLocalStorage} from '@/utils/storage'

// 错误处理方案： 错误类型
enum ErrorShowType {
  REGISTERED = 1000, // 用户已注册
  EXPIRED_TOKEN = 8, // token过期
  // EXPIRED_TOKEN = 8, // token过期
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  status: number;
  data: any;
  message:string;
}



export const request: RequestConfig = {
  timeout: 10000,
  // other axios options you want
  errorConfig: {
    // errorHandler:(error: any, opts: any) => {
    //   if (opts?.skipErrorHandler) throw error;
    //   // 我们的 errorThrower 抛出的错误。
    //   if (error.name === 'BizError') {
    //     const errorInfo: ResponseStructure | undefined = error.info;
    //     if (errorInfo) {
    //       const { message, status } = errorInfo;
    //       switch (status) {
         
    //         case ErrorShowType.REGISTERED:
    //           antdMessage.error(message);
    //           break;
           
    //         default:
    //           antdMessage.error(message);
    //       }
    //     }
    //   } else if (error.response) {
    //     // Axios 的错误
    //     // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    //     antdMessage.error(`Response status:${error.response.status}`);
    //   } else if (error.request) {
    //     // 请求已经成功发起，但没有收到响应
    //     // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
    //     // 而在node.js中是 http.ClientRequest 的实例
    //     antdMessage.error('None response! Please retry.');
    //   } else {
    //     // 发送请求时出了点问题
    //     antdMessage.error('Request error, please retry.');
    //   }
    // },
    // errorThrower: (res: ResponseStructure) => {
    //   const { status, data, message } = res;
    //   console.log(res)
    //   if (status!==0) {
    //     const error: any = new Error(message);
    //     error.name = 'BizError';
    //     error.info = { status,message, data };
    //     throw error; // 抛出自制的错误
    //   }
    // },
  },
  requestInterceptors: [
    (config) => {
      // 拦截请求配置，进行个性化处理。
        console.log("config",config)
        const {headers,url} = config;
        if(url.includes("/auth-service/login")||url.includes("/auth-service/register")){
          removeLocalStorage("Authorization")
        }else{
          headers["Authorization"]=getLocalStorage("Authorization")
        }
        return { ...config};
      }
  ],
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data,config } = response;
      console.log(data)
      if(data.status!==0){
        switch (data.status) {
         
          case ErrorShowType.REGISTERED:
            antdMessage.error(data.message);
            break;
          case ErrorShowType.EXPIRED_TOKEN:
            antdMessage.error("token已过期，请重新登录！");
            removeLocalStorage("Authorization")
            break;
          default:
            antdMessage.error(data.message);
        }
      }
      if(config.url?.includes('/auth-service/login')){
        const authorization = response.headers['authorization'];
        setLocalStorage("Authorization",authorization)
      }
      return response;
   }
  ]
};
