declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

/**
 * 分页信息
 */
interface PageInfo<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

/**
 * 分页请求
 */
interface PageRequest {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
}

/**
 * 删除请求
 */
interface DeleteRequest {
  id: number;
}

/**
 * 返回封装
 */
interface BaseResponse<T> {
  code: number;
  data: T;
  message?: string;
}

/**
 * 登录用户信息
 */
interface LoginUserVO {
  id?: number;
  userName?: string;
  userAvatar?: string;
  userProfile?: string;
  userRole?: string;
  createTime?: string;
  updateTime?: string;
}

/**
 * 用户信息
 */
type User = LoginUserVO;

/**
 * 用户登录请求
 */
interface UserLoginRequest {
  userAccount?: string;
  userPassword?: string;
}

/**
 * 用户注册请求
 */
interface UserRegisterRequest {
  userAccount?: string;
  userPassword?: string;
  checkPassword?: string;
}

/**
 * 用户添加请求
 */
interface UserAddRequest {
  userAccount?: string;
  userPassword?: string;
  userName?: string;
  userAvatar?: string;
  userRole?: string;
}

/**
 * 用户更新请求
 */
interface UserUpdateRequest {
  id?: number;
  userName?: string;
  userAvatar?: string;
  userProfile?: string;
  userRole?: string;
}

/**
 * 用户查询请求
 */
interface UserQueryRequest {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
  userAccount?: string;
  userName?: string;
  userRole?: string;
}

/**
 * 全局初始化状态
 */
interface InitialState {
  currentUser?: LoginUserVO;
}
