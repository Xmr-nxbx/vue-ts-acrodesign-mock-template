import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import { Message } from '@arco-design/web-vue';
import lang from './lang/zh-cn.json';

const baseURL = import.meta.env.VITE_API_BASEURL;

enum RequestEnums {
  TIMEOUT = 10000,
  OVERDUE = 401, // 登录失效
  FAIL = 400, // 请求失败
  SUCCESS = 200 // 请求成功
}

const config = {
  // 默认地址
  baseURL,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: false
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token') || ''
        if (token && config.headers) {
          typeof config.headers.set === 'function' && config.headers.set('Authorization', token)
        }
        return {
          ...config,
          headers: {
            Authorization: token // 请求头中携带token信息
          }
        }
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response // 解构
        
        if (data.code && data.code === RequestEnums.OVERDUE) {
          Message.error(data.message);
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          // localStorage.setItem('token', '')
          // router.replace({
          //   path: '/login'
          // })
          return Promise.reject(data.data);
        }

        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          Message.error(data.message);
          return Promise.reject(data.data);
        }
        return data.data;
      },
      (error: AxiosError) => {
        const { response } = error
        console.log(response?.status);
        Message.error(lang.requestFail);
        if (!window.navigator.onLine) {
          Message.error(lang.connectionError)
          // 可以跳转到错误页面，也可以不做操作
          // return router.replace({
          //   path: '/404'
          // });
        }
      }
    )
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<T> {
    return this.service.get(url, { params })
  }
  post<T>(url: string, params?: object): Promise<T> {
    return this.service.post(url, params)
  }
  put<T>(url: string, params?: object): Promise<T> {
    return this.service.put(url, params)
  }
  delete<T>(url: string, params?: object): Promise<T> {
    return this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export default new RequestHttp(config)