import { request } from '@umijs/max';
import type {
  LoginUserVO,
  UserVO,
  UserLoginAO,
  UserRegisterAO,
  UserAddAO,
  UserUpdateAO,
  UserQueryAO,
  PageInfo,
} from '../types';

/**
 * 用户登录
 * @param data 登录信息
 * @returns 登录用户信息
 */
export async function login(data: UserLoginAO): Promise<LoginUserVO> {
  return request<LoginUserVO>('/api/user/login', {
    method: 'POST',
    data,
  });
}

/**
 * 用户注册
 * @param data 注册信息
 * @returns 用户 ID
 */
export async function register(data: UserRegisterAO): Promise<number> {
  return request<number>('/api/user/register', {
    method: 'POST',
    data,
  });
}

/**
 * 获取当前登录用户
 * @returns 登录用户信息
 */
export async function getLoginUser(): Promise<LoginUserVO> {
  return request<LoginUserVO>('/api/user/get/login', {
    method: 'GET',
  });
}

/**
 * 用户登出
 * @returns 是否成功
 */
export async function logout(): Promise<boolean> {
  return request<boolean>('/api/user/logout', {
    method: 'POST',
  });
}

/**
 * 添加用户
 * @param data 用户信息
 * @returns 是否成功
 */
export async function addUser(data: UserAddAO): Promise<boolean> {
  return request<boolean>('/api/user/add', {
    method: 'POST',
    data,
  });
}

/**
 * 删除用户
 * @param id 用户 ID
 * @returns 是否成功
 */
export async function deleteUser(id: number): Promise<boolean> {
  return request<boolean>('/api/user/delete', {
    method: 'POST',
    data: { id },
  });
}

/**
 * 更新用户
 * @param data 用户信息
 * @returns 是否成功
 */
export async function updateUser(data: UserUpdateAO): Promise<boolean> {
  return request<boolean>('/api/user/update', {
    method: 'POST',
    data,
  });
}

/**
 * 获取用户列表（分页）
 * @param data 查询条件
 * @returns 分页结果
 */
export async function listUserByPage(data: UserQueryAO): Promise<PageInfo<UserVO>> {
  return request<PageInfo<UserVO>>('/api/user/list', {
    method: 'POST',
    data,
  });
}

/**
 * 根据 ID 获取用户
 * @param id 用户 ID
 * @returns 用户信息
 */
export async function getUserById(id: number): Promise<UserVO> {
  return request<UserVO>('/api/user/get/vo', {
    method: 'GET',
    params: { id },
  });
}
