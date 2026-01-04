import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from '@/constants';
import type { RequestOptions, AxiosError, AxiosResponse } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

// 与后端约定的响应数据格式
interface ResponseStructure {
  code?: number;
  data?: any;
  message?: string;
}

const isDev = process.env.NODE_ENV === 'development';

/**
 * 自定义业务错误类
 */
class BizError extends Error {
  info: ResponseStructure;

  constructor(info: ResponseStructure) {
    super(info.message || '服务器错误');
    this.info = info;
    this.name = 'BizError';
  }
}

/**
 * @name 网络请求配置
 * @description 响应拦截器直接返回 data 字段（Umi 默认行为），统一处理业务错误码和 HTTP 错误
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: isDev ? BACKEND_HOST_LOCAL : BACKEND_HOST_PROD,
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 预留：后续可添加 token 认证
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers = {
      //     ...config.headers,
      //     Authorization: `Bearer ${token}`,
      //   };
      // }
      return config;
    },
  ],

  // 响应拦截器 - 检查业务错误码
  responseInterceptors: [
    (response: AxiosResponse) => {
      const requestPath: string = response.config.url ?? '';
      const res: ResponseStructure = response.data;

      // 处理业务错误码
      if (res.code !== 0) {
        // 401 未登录处理
        if (res.code === 40100 && !requestPath.includes('user/get/login')) {
          message.error('请先登录');
          window.location.href = `/user/login?redirect=${window.location.href}`;
        }
        // 抛出业务错误，由 errorHandler 处理
        throw new BizError(res);
      }
      return response?.data;
    },
  ],

  // 统一错误处理
  errorConfig: {
    // 业务错误抛出器
    errorThrower: (res: ResponseStructure) => {
      throw new BizError(res);
    },

    // 统一错误处理器
    errorHandler: (error: Error | AxiosError, opts: RequestOptions) => {
      // 跳过 skipErrorHandler 的请求
      if (opts?.skipErrorHandler) {
        throw error;
      }

      // 处理业务错误
      if (error instanceof BizError) {
        const { message: errorMessage } = error.info;
        // 401 已在响应拦截器中处理，这里只提示其他错误
        if (error.info.code !== 40100) {
          message.error(errorMessage || '服务器错误');
        }
        throw error;
      }

      // 处理 HTTP 错误
      if ('response' in error) {
        const axiosError = error as AxiosError;
        const { response } = axiosError;

        if (!response) {
          message.error('网络异常，请检查网络连接');
          throw error;
        }

        const status = response.status;
        if (status === 401) {
          message.error('未授权，请重新登录');
          window.location.href = '/user/login';
        } else if (status === 403) {
          message.error('拒绝访问');
        } else if (status === 404) {
          message.error('请求地址不存在');
        } else if (status === 500) {
          message.error('服务器错误');
        } else {
          message.error(`请求错误 ${status}`);
        }
        throw error;
      }

      // 其他错误
      message.error(error.message || '请求失败');
      throw error;
    },
  },
};
