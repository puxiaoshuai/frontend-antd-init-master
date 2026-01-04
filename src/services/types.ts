// ========== 通用响应结构 ==========
export interface BaseResponse<T> {
  code?: number;
  data?: T;
  message?: string;
}

// ========== 分页相关 ==========
export interface PageInfo<T> {
  list: T[];
  total: number;
}

// ========== 用户相关 ==========
export interface LoginUserVO {
  id?: number;
  userName?: string;
  userAvatar?: string;
  userProfile?: string;
  userRole?: string;
  createTime?: string;
  updateTime?: string;
}

export interface UserVO {
  id?: number;
  userName?: string;
  userAvatar?: string;
  userProfile?: string;
  userRole?: string;
  createTime?: string;
}

export interface UserLoginAO {
  userAccount?: string;
  userPassword?: string;
}

export interface UserRegisterAO {
  userAccount?: string;
  userPassword?: string;
  checkPassword?: string;
}

export interface UserAddAO {
  userAccount?: string;
  userPassword?: string;
  userName?: string;
  userAvatar?: string;
  userRole?: string;
}

export interface UserUpdateAO {
  id?: number;
  userName?: string;
  userAvatar?: string;
  userProfile?: string;
  userRole?: string;
}

export interface UserQueryAO {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
  userAccount?: string;
  userName?: string;
  userRole?: string;
}

// ========== 文件相关 ==========
export interface FileUploadVo {
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  fileUrl?: string;
  uploadTime?: string;
}
