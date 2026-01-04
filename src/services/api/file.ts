import { request } from '@umijs/max';
import type { FileUploadVo } from '../types';

/**
 * 上传文件
 * @param file 文件对象
 * @returns 上传结果
 */
export async function uploadFile(file: File): Promise<FileUploadVo> {
  const formData = new FormData();
  formData.append('file', file);

  return request<FileUploadVo>('/api/file/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
}

/**
 * 上传头像
 * @param file 文件对象
 * @returns 上传结果
 */
export async function uploadAvatar(file: File): Promise<FileUploadVo> {
  const formData = new FormData();
  formData.append('file', file);

  return request<FileUploadVo>('/api/file/upload/avatar', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
}
