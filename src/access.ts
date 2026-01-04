/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  console.log("数据",currentUser);
  
  return {
    canUser: currentUser,
    canAdmin: currentUser && currentUser.userRole === 'admin',
  };
}
