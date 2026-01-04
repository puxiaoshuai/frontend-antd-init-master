/**
 * 统一导出所有 API
 */

// 命名空间导出
export * as userApi from './user';
export * as fileApi from './file';

// 直接导出（更便捷）
export {
  login,
  register,
  getLoginUser,
  logout,
  addUser,
  deleteUser,
  updateUser,
  listUserByPage,
  getUserById,
} from './user';

export { uploadFile, uploadAvatar } from './file';
